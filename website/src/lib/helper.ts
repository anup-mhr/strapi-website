import { File } from "@/types/heroslide.dt";
import { ImageData } from "./shopify";

export function getImageUrl(image: File | ImageData): string {
  if (!image?.url) return "/images/placeholder.webp";

  const url = image.url;

  if (url.startsWith("http")) {
    return url;
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:1337";

  return `${baseUrl}${url}`;
}
