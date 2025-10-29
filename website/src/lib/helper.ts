import { File } from "@/types/heroSlider";
import { ShopifyProductPreview } from "@/types/shopify";
import striptags from "striptags";

export const formatPrice = (
  amount: string | number | null,
  currencyCode: string,
  minimunFractionDigits?: number
) => {
  if (!amount) return "";
  return new Intl.NumberFormat(undefined, {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: minimunFractionDigits || 0,
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

export const getMonthYear = (dateString: string) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
  });
};

export function getImageUrl(image: File): string {
  if (!image?.url) return "/images/placeholder.webp";

  const url = image.url;

  if (url.startsWith("http")) {
    return url;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";

  return `${baseUrl}${url}`;
}

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

export function calculateReadingTime(
  articleContent: any,
  wordsPerMinute = 200
) {
  // 1. Get and clean the content (assuming articleContent is a string or innerHTML)
  const cleanedContent = articleContent.replace(/<[^>]*>/g, ""); // Remove HTML tags if present

  // 2. Calculate the word count
  const wordCount = cleanedContent.trim().split(/\s+/).length;

  // 3. Calculate the raw reading time in minutes
  const rawMinutes = wordCount / wordsPerMinute;

  // 4. Format the reading time
  const minutes = Math.floor(rawMinutes);
  const seconds = Math.round((rawMinutes - minutes) * 60);

  if (minutes === 0 && seconds === 0) {
    return "Less than a minute";
  } else if (minutes === 0) {
    return `${seconds} sec read`;
  } else if (seconds === 0) {
    return `${minutes} min read`;
  } else {
    return `${minutes} min ${seconds} sec`;
  }
}

export function capitalize(string: string | null) {
  if (!string) return null;
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

export function getPlainText(html?: string, fallback = ""): string {
  if (!html) return fallback;
  return striptags(html).trim();
}
