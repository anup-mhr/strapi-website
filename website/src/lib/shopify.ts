import type { ProductImage, ProductNode } from "@/types/shopify";
import type { ImageData } from "@/components/common/ImageSlider";
import { GraphQLClient } from "graphql-request";


const endpoint = `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/api/2023-10/graphql.json`;

if (!process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN) {
  throw new Error("Missing SHOPIFY_STOREFRONT_TOKEN in .env.local");
}

export const shopifyClient = new GraphQLClient(endpoint, {
  headers: {
    "X-Shopify-Storefront-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN,
    "Content-Type": "application/json",
  },
});

export const mapShopifyImages = (product: ProductNode): ImageData[] => {
  console.log("recieved product",product)
  return product.images.edges.map(({ node }: ProductImage): ImageData => ({
    name: node.altText ?? product.title,
    url: node.src,
    formats: {
      thumbnail: { url: node.src },
      small: { url: node.src },
      medium: { url: node.src },
      large: { url: node.src },
    },
  }));
};