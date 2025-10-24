import { createStorefrontApiClient } from "@shopify/storefront-api-client";

const client = createStorefrontApiClient({
  storeDomain: process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!,
  apiVersion: "2024-10",
  publicAccessToken: process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN!,
});

// ----------------- GraphQL Fragments & Queries -----------------
export const CART_FRAGMENT = `
  fragment CartFragment on Cart {
    id
    checkoutUrl
    totalQuantity
    cost {
      subtotalAmount {
        amount
        currencyCode
      }
      totalAmount {
        amount
        currencyCode
      }
      totalTaxAmount {
        amount
        currencyCode
      }
    }
    lines(first: 100) {
      edges {
        node {
          id
          quantity
          merchandise {
            ... on ProductVariant {
              id
              title
              priceV2 {
                amount
                currencyCode
              }
              selectedOptions {    
                name
                value
              }
              product {
                title
                featuredImage {
                  url
                  altText
                }
              }
            }
          }
        }
      }
    }
  }
`;

export const CREATE_CART_MUTATION = `
  mutation createCart($input: CartInput!) {
    cartCreate(input: $input) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const ADD_TO_CART_MUTATION = `
  mutation addToCart($cartId: ID!, $lines: [CartLineInput!]!) {
    cartLinesAdd(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const UPDATE_CART_MUTATION = `
  mutation updateCart($cartId: ID!, $lines: [CartLineUpdateInput!]!) {
    cartLinesUpdate(cartId: $cartId, lines: $lines) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const REMOVE_FROM_CART_MUTATION = `
  mutation removeFromCart($cartId: ID!, $lineIds: [ID!]!) {
    cartLinesRemove(cartId: $cartId, lineIds: $lineIds) {
      cart {
        ...CartFragment
      }
      userErrors {
        field
        message
      }
    }
  }
  ${CART_FRAGMENT}
`;

export const GET_CART_QUERY = `
  query getCart($cartId: ID!) {
    cart(id: $cartId) {
      ...CartFragment
    }
  }
  ${CART_FRAGMENT}
`;

export const CREATE_CHECKOUT_MUTATION = `
    mutation cartCreate($lines: [CartLineInput!]) {
    cartCreate(input: { lines: $lines }) {
      cart {
        id
        checkoutUrl
        lines(first: 10) {
          edges {
            node {
              id
              merchandise {
                ... on ProductVariant {
                  id
                  title
                }
              }
              quantity
            }
          }
        }
      }
      userErrors {
        field
        message
      }
    }
  }
`;

// ----------------- Type Definitions -----------------

interface ShopifyError {
  field?: string[];
  message: string;
}

interface ShopifyFetchParams {
  query: string;
  variables?: Record<string, any>;
}

// You can make this more specific with GraphQL response typing later
interface ShopifyResponse<T> {
  data: T;
  errors?: ShopifyError[];
}

// ----------------- Helper Function -----------------

export async function shopifyFetch<T = any>({
  query,
  variables,
}: ShopifyFetchParams): Promise<T> {
  try {
    const { data, errors } = (await client.request(query, {
      variables,
    })) as ShopifyResponse<T>;

    console.log("data,errros",data,errors);
    if (errors && errors.length > 0) {
      console.error("Shopify API errors:", errors);
      throw new Error(errors[0].message || "Shopify API error");
    }

    return data;
  } catch (error) {
    console.error("Shopify fetch error:", error);
    throw error;
  }
}
