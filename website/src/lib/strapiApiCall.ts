import { ApiResponse, HeroSlide } from "@/types/heroSlider";
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


interface Journal {
  id: number;
  attributes: {
    title: string;
    sub_title?: string;
    published_date: string;
    profile_image: any;
    slug: string;
    content: string;
    tags: any[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}

async function fetchJournals(): Promise<Journal[] | []> {
  try {
    const queryOptions = {
      fields: ["title", "sub_title", "published_date", "slug"],
      populate: {
        profile_image: true,
        tags: true,
      },
      pagination: {
        pageSize: 10,
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



interface Journal {
  id: number;
  attributes: {
    title: string;
    sub_title?: string;
    published_date: string;
    slug: string;
    content: string;
    profile_image: any;
    tags: any[];
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
}


export async function fetchJournalBySlug(slug: string): Promise<Journal | null> {
  try {
    const queryOptions = {
      filters: {
        slug: {
          $eq: slug,
        },
      },
      populate: {
        profile_image: true,
        tags: true,
      },
    };

    const data = await fetchStrapi("/api/journals", queryOptions);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data[0];
  } catch (error) {
    console.error(`Error fetching journal with slug "${slug}"`, error);
    return null;
  }
}

export { fetchHeroSlides , fetchJournals };
