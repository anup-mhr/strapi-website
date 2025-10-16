export const GET_PRODUCTS = `
  query GetProducts($first: Int!, $after: String, $priceFilter: String) {
    products(first: $first, after: $after, query: $priceFilter) {
      pageInfo {
        hasNextPage
        hasPreviousPage
        endCursor
        startCursor
      }
      edges {
        cursor
        node {
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
    }
  }
`;


export const GET_SALES = `
    query GetSaleProducts($handle: String!, $first: Int!, $after: String) {
      collectionByHandle(handle: $handle) {
        id
        title
        products(first: $first, after: $after) {
          pageInfo {
            hasNextPage
            hasPreviousPage
            endCursor
            startCursor
          }
          edges {
            cursor
            node {
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
        }
      }
    }
  `;


export const GET_PRODUCT_BY_HANDLE = `
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        descriptionHtml
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
