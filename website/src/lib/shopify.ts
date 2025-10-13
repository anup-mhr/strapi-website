import {
  ShopifyProduct,
  ShopifyProductPreview,
  ShopifyVariant,
  ShopifyVariantPreview,
} from "@/types/shopify";
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

export async function getProducts(): Promise<ShopifyProductPreview[]> {
  const query = `
    query GetProducts($first: Int!) {
      products(first: $first) {
        edges {
          node {
            id
            handle
            title
            description
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
                }
              }
            }
          }
        }
      }
    }
  `;

  const data = await shopifyFetch<{
    products: {
      edges: {
        node: {
          id: string;
          handle: string;
          title: string;
          description: string;
          images: { edges: { node: { src: string } }[] };
          variants: {
            edges: {
              node: {
                price: {
                  amount: string;
                  currencyCode: string;
                };
              };
            }[];
          };
        };
      }[];
    };
  }>(query, { first: 9 });

  return data.products.edges.map(({ node }) => ({
    id: node.id,
    handle: node.handle,
    title: node.title,
    description: node.description,
    images: node.images.edges.map((img) => ({ src: img.node.src })),
    variants: node.variants.edges.map(
      (v): ShopifyVariantPreview => ({
        price: {
          amount: v.node.price.amount,
          currencyCode: v.node.price.currencyCode,
        },
      })
    ),
  }));
}

export async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
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
