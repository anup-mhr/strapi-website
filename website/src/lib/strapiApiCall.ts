import { ApiResponse, File, HeroSlide } from "@/types/heroSlider";
import { fetchStrapi } from "./strapi";

async function fetchHeroSlides(): Promise<HeroSlide[] | []> {
  try {
    const queryOptions = {
      fields: ["*"],
      populate: ["CTA", "backgroundImage", "mobileViewImage"],
      pagination: {
        pageSize: 6,
      },
    };
    const data: ApiResponse = await fetchStrapi(
      "/api/hero-slides",
      queryOptions
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching hero slides", error);
    return [];
  }
}

export interface IJournal {
  id: number;
  documentId: string;
  title: string;
  sub_title?: string;
  published_date: string;
  profile_image: File;
  slug: string;
  content: string;
  tags: { id: number; name: string }[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

async function fetchJournals(pageSize?: number): Promise<IJournal[] | []> {
  try {
    const queryOptions = {
      populate: {
        profile_image: true,
        tags: true,
      },
      pagination: {
        pageSize: pageSize ?? 5,
      },
      sort: ["published_date:desc"],
    };

    const data = await fetchStrapi("/api/journals", queryOptions);
    return data.data;
  } catch (error) {
    console.error("Error fetching journals", error);
    return [];
  }
}

export async function fetchJournalBySlug(
  slug: string
): Promise<IJournal | null> {
  try {
    const queryOptions = {
      filters: { slug: { $eq: slug } },
      fields: ["slug", "title", "sub_title", "published_date", "content"],
      populate: {
        profile_image: true,
        tags: true,
      },
    };

    const data = await fetchStrapi("/api/journals", queryOptions);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    // console.log("data from slug journal", data.data);

    return data.data[0];
  } catch (error) {
    console.error(`Error fetching journal with slug "${slug}"`, error);
    return null;
  }
}

export { fetchHeroSlides, fetchJournals };
