import { ApiResponse, HeroSlide } from "@/types/heroslide";
import { fetchStrapi } from "./strapi";
import {
  ProjectList,
  ProjectListResponse,
  ProjectTitleList,
} from "@/types/project";

async function fetchHeroSlides(): Promise<HeroSlide[] | []> {
  try {
    const queryOptions = {
      fields: ["*"],
      populate: ["CTA", "backgroundImage"],
      pagination: {
        pageSize: 6,
      },
    };
    const data: ApiResponse = await fetchStrapi(
      "/api/hero-slides",
      queryOptions,
      { cache: "force-cache", revalidate: 60 * 30 }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching hero slides", error);
    return [];
  }
}

async function fetchProjectListByCategory(
  category: string
): Promise<ProjectTitleList[] | []> {
  try {
    const queryOptions = {
      filters: { category: { $eq: category } },
      fields: ["slug", "title"],
    };
    const data: ProjectListResponse = await fetchStrapi(
      "/api/projects",
      queryOptions,
      {
        cache: "force-cache",
        revalidate: 60 * 30,
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching project lists", error);
    return [];
  }
}

async function fetchProjectsByCategory(
  category: string
): Promise<ProjectList[] | []> {
  try {
    const queryOptions = {
      filters: { category: { $eq: category } },
      fields: ["id", "title", "category", "slug"],
      populate: {
        thumbnail: {
          fields: ["*"],
        },
      },
    };
    const data: ProjectListResponse = await fetchStrapi(
      "/api/projects",
      queryOptions,
      {
        cache: "force-cache",
        revalidate: 60 * 30,
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching project lists", error);
    return [];
  }
}

export { fetchHeroSlides, fetchProjectListByCategory, fetchProjectsByCategory };
