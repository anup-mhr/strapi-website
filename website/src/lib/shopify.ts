import {
  ShopifyProduct,
  ShopifyProductPreview,
  ShopifyVariant,
} from "@/types/shopify";
import { GraphQLClient } from "graphql-request";
import { productMapper } from "./helper";
import { GET_PRODUCT_BY_HANDLE } from "./shopifyQueries";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const adminToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2025-10/graphql.json`;

const client = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
  },
});

export async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {}
): Promise<T> {
  return client.request<T>(query, variables);
}

export async function getInventoryQuantityByVariantId(
  variantId: string
): Promise<number> {
  try {
    //extracting the numeric id that is present in the end
    const numericId = variantId.split("/").pop();
    if (!numericId) throw new Error("Invalid variant ID format");

    const variantRes = await fetch(
      `https://${domain}/admin/api/2025-10/variants/${numericId}.json`,
      {
        headers: {
          "X-Shopify-Access-Token": adminToken,
          "Content-Type": "application/json",
        },
      }
    );

    const variantData = await variantRes.json();

    if (!variantData.variant) {
      console.error("Variant not found:", variantData);
      return 0;
    }

    const inventoryItemId = variantData.variant.inventory_item_id;
    if (!inventoryItemId) {
      console.error("No inventory_item_id found for variant:", variantData);
      return 0;
    }

    const inventoryRes = await fetch(
      `https://${domain}/admin/api/2025-10/inventory_levels.json?inventory_item_ids=${inventoryItemId}`,
      {
        headers: {
          "X-Shopify-Access-Token": adminToken,
          "Content-Type": "application/json",
        },
      }
    );

    const inventoryData = await inventoryRes.json();
    return inventoryData.inventory_levels?.[0]?.available ?? 0;
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    return 0;
  }
}

export async function getTotalProductCount(): Promise<number> {
  try {
    const response = await fetch(
      `https://${domain}/admin/api/2025-10/products/count.json?status=active`,
      {
        headers: {
          "X-Shopify-Access-Token": adminToken,
          "Content-Type": "application/json",
        },
        cache: "no-store", // optional: always fetch fresh
      }
    );

    if (!response.ok) {
      console.error("Failed to fetch product count:", response.statusText);
      return 0;
    }

    const data = await response.json();
    return data.count ?? 0;
  } catch (error) {
    console.error("Error fetching total product count:", error);
    return 0;
  }
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    productByHandle: {
      id: string;
      title: string;
      handle: string;
      descriptionHtml: string;
      images: { edges: { node: { src: string } }[] };
      variants: {
        edges: {
          node: {
            id: string;
            title: string;
            availableForSale: boolean;
            selectedOptions: { name: string; value: string }[];
            metafield: { value: string | null } | null;
            price: { amount: string; currencyCode: string };
          };
        }[];
      };
    } | null;
  }>(GET_PRODUCT_BY_HANDLE, { handle });

  const product = data.productByHandle;
  if (!product) return null;

  // Fetch inventory in parallel
  const variantsWithStock: ShopifyVariant[] = await Promise.all(
    product.variants.edges.map(async ({ node }) => {
      const stock = await getInventoryQuantityByVariantId(node.id);

      return {
        title: node.title,
        availableForSale: node.availableForSale,
        selectedOptions: node.selectedOptions,
        note: node.metafield?.value ?? null,
        price: {
          amount: node.price.amount,
          currencyCode: node.price.currencyCode,
        },
        inventoryQuantity: stock,
      };
    })
  );

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    descriptionHtml: product.descriptionHtml,
    images: product.images.edges.map((img) => ({ src: img.node.src })),
    variants: variantsWithStock,
  };
}

export interface CategoryItem {
  title: string;
  handle: string;
  subItems: {
    title: string;
    handle: string;
  }[];
}

export async function getCategories(
  menuHandle: string = "shop"
): Promise<CategoryItem[]> {
  const query = `
    query getMenu($handle: String!) {
      menu(handle: $handle) {
        items {
          title
          url
          items {
            title
            url
          }
        }
      }
    }
  `;

  try {
    const data = await shopifyFetch<{ menu: { items: any[] } }>(query, {
      handle: menuHandle,
    });
    if (!data.menu?.items) return [];

    const categories: CategoryItem[] = data.menu.items.map((item) => ({
      title: item.title,
      handle: item.url?.split("/").pop(),
      subItems: (item.items || []).map((sub: any) => ({
        title: sub.title,
        handle: sub.url,
      })),
    }));

    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

export async function getRecommendedProducts(
  productId: string
): Promise<ShopifyProductPreview[]> {
  const query = `
    query getRecommendedProducts($productId: ID!) {
      productRecommendations(productId: $productId) {
        id
        handle
        title
        descriptionHtml
        images(first: 1) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 1) {
          edges {
            node {
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const variables = {
    productId,
  };

  try {
    const data = await shopifyFetch<{ productRecommendations: any[] }>(
      query,
      variables
    );

    if (!data.productRecommendations) return [];

    const recommendedProducts: ShopifyProductPreview[] =
      data.productRecommendations.map((node) => {
        return productMapper(node);
      });

    return recommendedProducts;
  } catch (error) {
    console.error("Failed to fetch recommended products:", error);
    return [];
  }
}

export async function getProducts({
  first = 9,
  after = null,
  collection,
  subcategory,
  minPrice,
  maxPrice,
}: {
  first?: number;
  after?: string | null;
  collection?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
}): Promise<{
  products: ShopifyProductPreview[];
  pageInfo: any;
}> {
  const variables: Record<string, any> = { first, after };
  let query: string;

  let priceFilter = "";

  if (minPrice !== undefined && maxPrice !== undefined) {
    priceFilter = `variants.price:>=${minPrice} AND variants.price:<=${maxPrice}`;
  }

  const hasFilters = !!subcategory || !!priceFilter;

  if (collection && hasFilters) {
    console.log("collection and filters applied");
    query = `
      query getCollectionFilteredProducts(
        $handle: String!,
        $first: Int!,
        $after: String,
        $subcategory: String,
        $minPrice: Float,
        $maxPrice: Float
      ) {
        collection(handle: $handle) {
          products(
            first: $first,
            after: $after,
            filters: [
              { price: { min: $minPrice, max: $maxPrice } }
              { tag: $subcategory }
            ]
          ) {
            edges {
              node {
                id
                handle
                title
                descriptionHtml
                tags
                images(first: 1) {
                  edges {
                    node {
                      src: url
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      }
    `;

    variables.handle = collection;
    variables.subcategory = subcategory || null;
    variables.minPrice = minPrice;
    variables.maxPrice = maxPrice;
  } else if (collection) {
    console.log("only collection, no filters");
    query = `
      query getCollectionProducts($handle: String!, $first: Int!, $after: String) {
        collectionByHandle(handle: $handle) {
          products(first: $first, after: $after) {
            edges {
              node {
                id
                handle
                title
                descriptionHtml
                tags
                images(first: 1) {
                  edges {
                    node {
                      src: url
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      price {
                        amount
                        currencyCode
                      }
                      compareAtPrice {
                        amount
                        currencyCode
                      }
                    }
                  }
                }
                priceRange {
                  minVariantPrice {
                    amount
                    currencyCode
                  }
                  maxVariantPrice {
                    amount
                    currencyCode
                  }
                }
              }
            }
            pageInfo {
              hasNextPage
              hasPreviousPage
              startCursor
              endCursor
            }
          }
        }
      }
    `;
    variables.handle = collection;
  } else if (hasFilters) {
    console.log("no collection, but filters applied");
    query = `
      query getFilteredProducts($first: Int!, $after: String, $query: String!) {
        products(first: $first, after: $after, query: $query) {
          edges {
            node {
              id
              handle
              title
              descriptionHtml
              tags
              images(first: 1) {
                edges {
                  node {
                    src: url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `;

    const filters: string[] = [];
    if (subcategory) filters.push(`tag:'${subcategory}'`);
    if (priceFilter) filters.push(priceFilter);
    variables.query = filters.join(" AND ");
  } else {
    console.log("no collection, no filters");
    query = `
      query getAllProducts($first: Int!, $after: String) {
        products(first: $first, after: $after) {
          edges {
            node {
              id
              handle
              title
              descriptionHtml
              tags
              images(first: 1) {
                edges {
                  node {
                    src: url
                  }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price {
                      amount
                      currencyCode
                    }
                    compareAtPrice {
                      amount
                      currencyCode
                    }
                  }
                }
              }
              priceRange {
                minVariantPrice {
                  amount
                  currencyCode
                }
                maxVariantPrice {
                  amount
                  currencyCode
                }
              }
            }
          }
          pageInfo {
            hasNextPage
            hasPreviousPage
            startCursor
            endCursor
          }
        }
      }
    `;
  }

  const data = await shopifyFetch<any>(query, variables);

  const productEdges =
    data.collection?.products?.edges ||
    data.collectionByHandle?.products?.edges ||
    data.products?.edges ||
    [];

  const pageInfo = data.collection?.products?.pageInfo ||
    data.collectionByHandle?.products?.pageInfo ||
    data.products?.pageInfo || {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: null,
      startCursor: null,
    };

  // Map product nodes
  const products: ShopifyProductPreview[] = productEdges.map(
    ({ node }: { node: ShopifyProductPreview }) => productMapper(node)
  );

  return { products, pageInfo };
}
