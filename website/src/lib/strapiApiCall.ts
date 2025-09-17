import { ApiResponse, HeroSlide } from "@/types/heroslide.dt";
import { fetchStrapi } from "./strapi";
import {
  ProjectDetails,
  ProjectList,
  ProjectListResponse,
  ProjectTitleList,
} from "@/types/project.dt";
import { ProductDetails } from "@/types/product.dt";

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
        // cache: "force-cache",
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
    console.error("Error fetching project  lists", error);
    return [];
  }
}

async function fetchProjectBySlug(
  slug: string
): Promise<ProjectDetails | null> {
  try {
    const queryOptions = {
      filters: { slug: { $eq: slug } },
      fields: ["title", "description", "category"],
      populate: {
        products: {
          fields: ["slug", "name"],
          populate: {
            thumbnail: {
              fields: ["*"],
            },
          },
        },
      },
    };
    const data = await fetchStrapi("/api/projects", queryOptions, {
      revalidate: 60 * 60,
    });
    return data.data[0];
  } catch (error) {
    console.error("Error fetching project details ", error);
    return null;
  }
}

async function fetchProductBySlug(
  slug: string
): Promise<ProductDetails | null> {
  try {
    const queryOptions = {
      filters: { slug: { $eq: slug } },
      populate: "*",
    };
    const data = await fetchStrapi("/api/products", queryOptions, {
      revalidate: 60 * 30,
    });
    return data.data[0];
  } catch (error) {
    console.error("Error fetching project details ", error);
    return null;
  }
}

export {
  fetchHeroSlides,
  fetchProjectListByCategory,
  fetchProjectsByCategory,
  fetchProjectBySlug,
  fetchProductBySlug,
};
