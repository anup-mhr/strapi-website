import { SortOption } from "@/context/SortContext";
import { CategoryMeta } from "@/types/category";
import { File } from "@/types/heroslide";
import { ProjectList } from "@/types/project";
import { fetchProjectCategories } from "./strapiApiCall";
import striptags from "striptags";

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

export function sortProjects(
  projects: any[],
  sortOption: SortOption
): ProjectList[] {
  const sorted = [...projects];

  switch (sortOption) {
    case "name-asc":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));

    case "name-desc":
      return sorted.sort((a, b) => b.title.localeCompare(a.title));

    case "date-asc":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.projectDate || 0);
        const dateB = new Date(b.projectDate || 0);
        return dateA.getTime() - dateB.getTime();
      });

    case "date-desc":
      return sorted.sort((a, b) => {
        const dateA = new Date(a.projectDate || 0);
        const dateB = new Date(b.projectDate || 0);
        return dateB.getTime() - dateA.getTime();
      });

    default:
      return sorted;
  }
}

export function getCategoryViaSlug(slug: string): CategoryMeta {
  //for urra because the slug is urra but the category and display names are Urra Design Studio
  //for other categories, slug and display names are basically the same.
  const map: Record<string, CategoryMeta> = {
    urra: {
      title: "Aku Zeliang - Urra Design Studio",
      description:
        "Urra Design Studio portfolio showcasing design work across multiple disciplines",
      displayName: "Urra Design Studio",
    },
  };

  const name = capitalize(slug);

  return (
    map[slug] || {
      title: `Aku Zeliang - ${name}`,
      description: `${name} showcasing design work across multiple disciplines`,
      displayName: name,
    }
  );
}

export async function loadLinks() {
  try {
    const links = {
      href: "/contact",
      label: "CONTACT",
    };
    const categories = await fetchProjectCategories();

    const categoryLinks = categories.map((category) => {
      if (category.toUpperCase() === "URRA DESIGN STUDIO") {
        return { href: "/urra", label: category.toUpperCase() };
      }
      return {
        href: `/${category.toLowerCase()}`,
        label: category.toUpperCase(),
      };
    });

    return [...categoryLinks, links];
  } catch (error) {
    console.error("Failed to load navigation links", error);
    return [];
  }
}
