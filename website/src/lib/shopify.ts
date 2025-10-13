import { ShopifyProduct, ShopifyProductPreview, ShopifyVariant, ShopifyVariantPreview } from "@/types/shopify";
import { GraphQLClient } from "graphql-request";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const adminToken = process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN!;

const endpoint = `https://${domain}/api/2025-10/graphql.json`;

const client = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": token,
  },
});

export async function shopifyFetch<T>(query: string, variables: Record<string, any> = {}): Promise<T> {
  return client.request<T>(query, variables);
}


export async function getInventoryQuantityByVariantId(variantId: string): Promise<number> {
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

export async function getProducts({
  first = 9,
  after,
  query,
  variables,
}: {
  first?: number;
  after?: string | null;
  query: string;
  variables?: Record<string, any>;
}) {

  const vars = { first, after, ...variables };

  const data = await shopifyFetch<any>(query, vars);


  const productEdges =
    data.products?.edges ||
    data.collectionByHandle?.products?.edges ||
    [];

  const pageInfo =
    data.products?.pageInfo || data.collectionByHandle?.products?.pageInfo || {
      hasNextPage: false,
      hasPreviousPage: false,
      endCursor: null,
      startCursor: null,
    };

  const products: ShopifyProductPreview[] = productEdges.map(({ node }: any) => {
    return {
      id: node.id,
      handle: node.handle,
      title: node.title,
      description: node.description,
      images: node.images.edges.map((img: any) => ({ src: img.node.src })),
      variants: node.variants.edges.map((v: any) => ({
        price: {
          amount: v.node.price?.amount,
          currencyCode: v.node.price?.currencyCode,
        },
        compareAtPrice: {
          amount: v.node.compareAtPrice?.amount || v.node.price?.amount,
          currencyCode: v.node.compareAtPrice?.currencyCode || v.node.price?.currencyCode,
        },
      })),
    };
  });

  return {
    products,
    pageInfo,
  };
}

export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const query = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        images(first: 10) {
          edges {
            node {
              src
            }
          }
        }
        variants(first: 10) {
          edges {
            node {
              id
              title
              availableForSale
              selectedOptions {
                name
                value
              }
              metafield(namespace: "custom", key: "note") {
                value
              }
              price {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    productByHandle: {
      id: string;
      title: string;
      handle: string;
      description: string;
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
  }>(query, { handle });

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
    description: product.description,
    images: product.images.edges.map((img) => ({ src: img.node.src })),
    variants: variantsWithStock,
  };
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
