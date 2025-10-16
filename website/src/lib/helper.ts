import { ShopifyProductPreview } from "@/types/shopify";

export const formatPrice = (
  amount: string | number | null,
  currencyCode: string
) => {
  if (!amount) return "";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Number(amount));
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

export const productMapper = (node: any): ShopifyProductPreview => ({
  id: node.id,
  handle: node.handle,
  title: node.title,
  descriptionHtml: node.descriptionHtml,
  images: node.images.edges.map((img: any) => ({ src: img.node.src })),
  variants: node.variants.edges.map((v: any) => ({
    price: {
      amount: v.node.price?.amount,
      currencyCode: v.node.price?.currencyCode,
    },
    compareAtPrice: {
      amount: v.node.compareAtPrice?.amount || v.node.price?.amount,
      currencyCode:
        v.node.compareAtPrice?.currencyCode || v.node.price?.currencyCode,
    },
  })),
});
