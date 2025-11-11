import { ITEMS_PER_PAGE } from "@/components/ShopPage";
import { ShopifyProduct, ShopifyProductPreview } from "@/types/shopify";
import { productMapper } from "./helper";
import { GET_PRODUCT_BY_HANDLE } from "./shopifyQueries";
import { CategoryItem } from "@/types/shopify";

const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN!;
const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN!;
const endpoint = `https://${domain}/api/2025-10/graphql.json`;

async function shopifyFetch<T>(
  query: string,
  variables: Record<string, any> = {},
  revalidate?: number // optional
): Promise<T> {
  const options: RequestInit & { next?: { revalidate?: number } } = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": token,
    },
    body: JSON.stringify({ query, variables }),
  };

  if (revalidate) {
    options.next = { revalidate };
  }
  // else {
  //   options.cache = "no-store";
  // }

  const response = await fetch(endpoint, options);

  if (!response.ok) {
    throw new Error(`Shopify fetch failed: ${response.statusText}`);
  }

  const { data, errors } = await response.json();

  if (errors) {
    console.error(errors);
    throw new Error("Shopify GraphQL errors occurred");
  }

  return data;
}

async function getProductByHandle(
  handle: string
): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<{
    productByHandle: {
      id: string;
      title: string;
      handle: string;
      tags: string[];
      descriptionHtml: string;
      images: { edges: { node: { src: string } }[] };
      variants: {
        edges: {
          node: {
            id: string;
            title: string;
            availableForSale: boolean;
            quantityAvailable: number;
            selectedOptions: { name: string; value: string }[];
            metafield: { value: string | null } | null;
            price: { amount: string; currencyCode: string };
            compareAtPrice?: { amount: string; currencyCode: string } | null;
          };
        }[];
      };
    } | null;
  }>(GET_PRODUCT_BY_HANDLE, { handle }, 60 * 1 * 0); //revalidate

  const product = data.productByHandle;
  if (!product) return null;

  return {
    id: product.id,
    handle: product.handle,
    title: product.title,
    tags: product.tags,
    descriptionHtml: product.descriptionHtml,
    images: product.images.edges.map((img) => ({
      src: img.node.src,
    })),
    variants: product.variants.edges.map(({ node }) => ({
      id: node.id,
      title: node.title,
      availableForSale: node.availableForSale,
      selectedOptions: node.selectedOptions,
      note: node.metafield?.value ?? null,
      price: {
        amount: node.price.amount,
        currencyCode: node.price.currencyCode,
      },
      compareAtPrice: node.compareAtPrice
        ? {
          amount: node.compareAtPrice.amount,
          currencyCode: node.compareAtPrice.currencyCode,
        }
        : undefined,
      quantityAvailable: node.quantityAvailable ?? 0,
    })),
  };
}

async function getCategories(
  menuHandle: string = "shop"
): Promise<CategoryItem[]> {
  const menuQuery = `
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

  const collectionQuery = `
    query getCollectionId($handle: String!) {
      collection(handle: $handle) {
        id
      }
    }
  `;

  try {
    const menuData = await shopifyFetch<{ menu: { items: any[] } }>(
      menuQuery,
      {
        handle: menuHandle,
      },
      60 * 1 * 0 //revalidate
    );
    if (!menuData.menu?.items) return [];

    const categories: CategoryItem[] = await Promise.all(
      menuData.menu.items.map(async (item) => {
        const handle = item.url?.split("/").pop(); // extract handle from URL present at last of the handle
        let collectionId: string = "";

        if (handle) {
          try {
            const collectionData = await shopifyFetch<{
              collection: { id: string } | null;
            }>(collectionQuery, { handle });
            collectionId = collectionData.collection?.id.split("/").pop() || "";
          } catch (err) {
            console.warn(
              `Failed to fetch collection ID for handle: ${handle}`,
              err
            );
          }
        }

        return {
          id: collectionId,
          title: item.title,
          handle,

          subItems: (item.items || []).map((sub: any) => ({
            title: sub.title,
            handle: sub.url?.split("/").pop(),
          })),
        };
      })
    );

    return categories;
  } catch (error) {
    console.error("Failed to fetch categories:", error);
    return [];
  }
}

async function getRecommendedProducts(
  currentProductHandle: string,
  tags: string[]
): Promise<ShopifyProductPreview[]> {
  if (!tags.length) return [];

  async function fetchByQuery(queryString: string): Promise<ShopifyProductPreview[]> {
    const query = `
      query getProductsByTags($queryString: String!, $limit: Int!) {
        products(first: $limit, query: $queryString) {
          edges {
            node {
              id
              handle
              title
              descriptionHtml
              tags
              images(first: 1) {
                edges {
                  node { src }
                }
              }
              variants(first: 1) {
                edges {
                  node {
                    price { amount currencyCode }
                    compareAtPrice { amount currencyCode }
                  }
                }
              }
            }
          }
        }
      }
    `;

    const variables = {
      queryString,
      limit: 6,
    };

    const data = await shopifyFetch<{ products: { edges: any[] } }>(query, variables, 60 * 1 * 0); //revalidate

    if (!data.products?.edges) return [];

    return data.products.edges
      .map(edge => edge.node)
      .filter(node => node.handle !== currentProductHandle)
      .map(node => productMapper(node));
  }

  try {
    const andQuery = tags.map(tag => `tag:${tag}`).join(' AND ');
    let products = await fetchByQuery(andQuery);

    if (products.length < 4 && tags.length > 1) {
      const orQuery = tags.map(tag => `tag:${tag}`).join(' OR ');
      const orProducts = await fetchByQuery(orQuery);

      const existingHandles = new Set(products.map(p => p.handle));
      const merged = [
        ...products,
        ...orProducts.filter(p => !existingHandles.has(p.handle)),
      ];

      products = merged;
    }

    return products.slice(0, 4);
  } catch (error) {
    console.error("Failed to fetch related products:", error);
    return [];
  }
}

async function getProductsTotalCountAndCursors({
  collection,
  subcategory,
  minPrice,
  maxPrice,
  sortBy = { sortKey: "PRICE", reverse: false },
}: {
  collection?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: { sortKey: string; reverse: boolean };
}): Promise<{
  totalCount: number;
  priceRange: {
    min: number;
    max: number;
  };
  pageCursors: (string | null)[];
}> {
  const hasValidSubcategory = subcategory !== undefined && subcategory !== "";
  const hasPriceFilter = minPrice !== undefined && maxPrice !== undefined;

  const useCollection = collection && !hasValidSubcategory;
  const useProductSearch = hasValidSubcategory || !collection;

  const effectiveSortBy =
    useCollection && sortBy.sortKey === "CREATED_AT"
      ? { ...sortBy, sortKey: "CREATED" }
      : sortBy;

  const buildFilterQuery = () => {
    const filters: string[] = [];
    if (hasValidSubcategory) filters.push(`tag:${subcategory}`);
    if (hasPriceFilter && useProductSearch) {
      filters.push(
        `variants.price:>=${minPrice} AND variants.price:<=${maxPrice}`
      );
    }
    return filters.join(" AND ");
  };

  const buildTotalCountFragment = (sortKeyType: string) => {
    const priceFilterArg =
      hasPriceFilter && useCollection
        ? ", filters: {price: {min: $minPrice, max: $maxPrice}}"
        : "";
    const queryArg = useProductSearch ? ", query: $query" : "";

    return `
      totalCount: products(first: 250, after: $totalCountAfter, sortKey: $sortKey, reverse: $reverse${priceFilterArg}${queryArg}) {
        edges {
          cursor
        }
      }
      minPriceProduct: products(first: 1, sortKey: PRICE, reverse: false${priceFilterArg}${queryArg}) {
        edges {
          node {
            priceRange {
              minVariantPrice {
                amount
              }
            }
          }
        }
      }
      maxPriceProduct: products(first: 1, sortKey: PRICE, reverse: true${priceFilterArg}${queryArg}) {
        edges {
          node {
            priceRange {
              maxVariantPrice {
                amount
              }
            }
          }
        }
      }
    `;
  };

  const buildPageInfoFragment = (sortKeyType: string) => {
    const priceFilterArg =
      hasPriceFilter && useCollection
        ? ", filters: {price: {min: $minPrice, max: $maxPrice}}"
        : "";
    const queryArg = useProductSearch ? ", query: $query" : "";

    return `
      products(first: 1, after: $checkCursor, sortKey: $sortKey, reverse: $reverse${priceFilterArg}${queryArg}) {
        pageInfo {
          hasNextPage
        }
      }
    `;
  };

  const checkHasMoreProducts = async (
    sortKeyType: string,
    cursor: string,
    baseVariables: Record<string, any>
  ): Promise<boolean> => {
    const checkQuery = useCollection
      ? `query checkPageInfo($handle: String!, $checkCursor: String!, $sortKey: ${sortKeyType}!, $reverse: Boolean!${hasPriceFilter ? ", $minPrice: Float!, $maxPrice: Float!" : ""
      }) {
          collectionByHandle(handle: $handle) {
            ${buildPageInfoFragment(sortKeyType)}
          }
        }`
      : `query checkPageInfo($checkCursor: String!, $sortKey: ${sortKeyType}!, $reverse: Boolean!, $query: String!) {
          ${buildPageInfoFragment(sortKeyType)}
        }`;

    const variables = {
      ...baseVariables,
      checkCursor: cursor,
    };

    const data = await shopifyFetch<any>(checkQuery, variables);
    const rootData = data.collectionByHandle || data;
    const pageInfo = rootData.products?.pageInfo;

    return pageInfo?.hasNextPage || false;
  };

  const fetchAllTotalCount = async (
    query: string,
    sortKeyType: string,
    baseVariables: Record<string, any>,
    initialEdges: any[]
  ) => {
    let allEdges: any[] = [...initialEdges];

    if (initialEdges.length === 250) {
      const lastCursor = initialEdges[249].cursor;
      const hasNextPage = await checkHasMoreProducts(
        sortKeyType,
        lastCursor,
        baseVariables
      );

      if (hasNextPage) {
        let currentCursor: string | null = lastCursor;
        let hasMore = true;

        while (hasMore) {
          const variables: Record<string, any> = {
            ...baseVariables,
            totalCountAfter: currentCursor,
          };

          const data = await shopifyFetch<any>(query, variables);
          const rootData = data.collectionByHandle || data;
          const countEdges = rootData.totalCount?.edges || [];

          allEdges = allEdges.concat(countEdges);

          if (countEdges.length === 250) {
            const lastBatchCursor = countEdges[249].cursor;
            hasMore = await checkHasMoreProducts(
              sortKeyType,
              lastBatchCursor,
              baseVariables
            );
            currentCursor = lastBatchCursor;
          } else {
            hasMore = false;
          }
        }
      }
    }

    return allEdges;
  };

  // Build query and variables
  let query: string;
  const variables: Record<string, any> = {
    sortKey: effectiveSortBy.sortKey,
    reverse: effectiveSortBy.reverse,
    totalCountAfter: null,
  };

  const sortKeyType = useCollection ? "ProductCollectionSortKeys" : "ProductSortKeys";

  if (useCollection) {
    query = `
      query getCollectionTotalCount($handle: String!, $sortKey: ${sortKeyType}!, $reverse: Boolean!, $totalCountAfter: String${hasPriceFilter ? ", $minPrice: Float!, $maxPrice: Float!" : ""
      }) {
        collectionByHandle(handle: $handle) {
          ${buildTotalCountFragment(sortKeyType)}
        }
      }
    `;
    variables.handle = collection;
    if (hasPriceFilter) {
      variables.minPrice = minPrice;
      variables.maxPrice = maxPrice;
    }
  } else {
    const filterQuery = buildFilterQuery();

    query = `
      query getProductsTotalCount($sortKey: ${sortKeyType}!, $reverse: Boolean!, $query: String!, $totalCountAfter: String) {
        ${buildTotalCountFragment(sortKeyType)}
      }
    `;
    variables.query = filterQuery;
  }

  const data = await shopifyFetch<any>(query, variables);
  const rootData = data.collectionByHandle || data;

  const initialCountEdges = rootData.totalCount?.edges || [];
  const minPriceEdges = rootData.minPriceProduct?.edges || [];
  const maxPriceEdges = rootData.maxPriceProduct?.edges || [];

  // Fetch all totalCount data if needed
  let countEdges = initialCountEdges;
  if (initialCountEdges.length === 250) {
    countEdges = await fetchAllTotalCount(query, sortKeyType, variables, initialCountEdges);
  }

  const totalCount = countEdges.length;

  // Calculate price range
  let minPriceFound = 0;
  let maxPriceFound = 0;

  if (totalCount > 0) {
    minPriceFound = parseFloat(
      minPriceEdges[0]?.node.priceRange?.minVariantPrice?.amount || "0"
    );
    maxPriceFound = parseFloat(
      maxPriceEdges[0]?.node.priceRange?.maxVariantPrice?.amount || "0"
    );
  }

  const pageCursors: (string | null)[] = [null];

  if (countEdges.length > 0) {
    for (
      let i = ITEMS_PER_PAGE - 1;
      i < countEdges.length;
      i += ITEMS_PER_PAGE
    ) {
      const cursor = countEdges[i]?.cursor;
      if (cursor) {
        pageCursors.push(cursor);
      }
    }
  }

  return {
    totalCount,
    priceRange: {
      min: minPriceFound,
      max: maxPriceFound,
    },
    pageCursors,
  };
}

async function getProducts({
  first = ITEMS_PER_PAGE,
  after = null,
  collection,
  subcategory,
  minPrice,
  maxPrice,
  sortBy = { sortKey: "PRICE", reverse: false },
}: {
  first?: number;
  after?: string | null;
  collection?: string;
  subcategory?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: { sortKey: string; reverse: boolean };
}): Promise<{
  products: ShopifyProductPreview[];
  pageInfo: any;
}> {
  const hasValidSubcategory = subcategory !== undefined && subcategory !== "";
  const hasPriceFilter = minPrice !== undefined && maxPrice !== undefined;

  const useCollection = collection && !hasValidSubcategory;
  const useProductSearch = hasValidSubcategory || !collection;

  const effectiveSortBy =
    useCollection && sortBy.sortKey === "CREATED_AT"
      ? { ...sortBy, sortKey: "CREATED" }
      : sortBy;

  const buildFilterQuery = () => {
    const filters: string[] = [];
    if (hasValidSubcategory) filters.push(`tag:${subcategory}`);
    if (hasPriceFilter && useProductSearch) {
      filters.push(
        `variants.price:>=${minPrice} AND variants.price:<=${maxPrice}`
      );
    }
    return filters.join(" AND ");
  };

  const productFields = `
    id
    handle
    title
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
  `;

  const buildProductsFragment = (sortKeyType: string) => {
    const priceFilterArg =
      hasPriceFilter && useCollection
        ? ", filters: {price: {min: $minPrice, max: $maxPrice}}"
        : "";
    const queryArg = useProductSearch ? ", query: $query" : "";

    return `
      products(first: $first, after: $after, sortKey: $sortKey, reverse: $reverse${priceFilterArg}${queryArg}) {
        edges {
          node { ${productFields} }
          cursor
        }
        pageInfo {
          hasNextPage
          hasPreviousPage
          endCursor
          startCursor
        }
      }
    `;
  };

  let query: string;
  const variables: Record<string, any> = {
    first,
    after,
    sortKey: effectiveSortBy.sortKey,
    reverse: effectiveSortBy.reverse,
  };

  const sortKeyType = useCollection ? "ProductCollectionSortKeys" : "ProductSortKeys";

  if (useCollection) {
    query = `
      query getCollectionProducts($handle: String!, $first: Int!, $after: String, $sortKey: ${sortKeyType}!, $reverse: Boolean!${hasPriceFilter ? ", $minPrice: Float!, $maxPrice: Float!" : ""
      }) {
        collectionByHandle(handle: $handle) {
          ${buildProductsFragment(sortKeyType)}
        }
      }
    `;
    variables.handle = collection;
    if (hasPriceFilter) {
      variables.minPrice = minPrice;
      variables.maxPrice = maxPrice;
    }
  } else {
    const filterQuery = buildFilterQuery();

    query = `
      query getProducts($first: Int!, $after: String, $sortKey: ${sortKeyType}!, $reverse: Boolean!, $query: String!) {
        ${buildProductsFragment(sortKeyType)}
      }
    `;
    variables.query = filterQuery;
  }

  const data = await shopifyFetch<any>(query, variables);
  const rootData = data.collectionByHandle || data;

  const productEdges = rootData.products?.edges || [];
  const pageInfo = rootData.products?.pageInfo || {
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: null,
    startCursor: null,
  };

  const products: ShopifyProductPreview[] = productEdges.map(
    ({ node }: { node: ShopifyProductPreview }) => productMapper(node)
  );

  return {
    products,
    pageInfo,
  };
}

async function getAllProductHandles(): Promise<string[]> {
  const query = `
    query getProductHandles($after: String) {
      products(first: 250, after: $after) {
        edges {
          node {
            handle
          }
          cursor
        }
        pageInfo {
          hasNextPage
          endCursor
        }
      }
    }
  `;

  let allHandles: string[] = [];
  let currentCursor: string | null = null;
  let hasMore = true;

  while (hasMore) {
    const variables: Record<string, any> = {
      after: currentCursor,
    };

    const data = await shopifyFetch<any>(query, variables);
    const edges = data.products?.edges || [];
    const pageInfo = data.products?.pageInfo;

    // Extract handles from edges
    const handles = edges.map((edge: any) => edge.node.handle).filter(Boolean);
    allHandles = allHandles.concat(handles);

    hasMore = pageInfo?.hasNextPage || false;
    currentCursor = pageInfo?.endCursor || null;
  }

  return allHandles;
}

export {
  getCategories,
  getAllProductHandles,
  getProducts,
  getProductsTotalCountAndCursors,
  getRecommendedProducts,
  shopifyFetch,
  getProductByHandle
};
