import { SortOption } from "@/context/SortContext";
import { File } from "@/types/heroslide";
import { ProjectList } from "@/types/project";

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

export function capitalize(string: string) {
  return string
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
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
        console.log(a);
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
