import { ApiResponse, HeroSlide } from "@/types/heroslide";
import { fetchStrapi } from "./strapi";
import {
  AllProjectsAndProducts,
  ProjectDetails,
  ProjectList,
  ProjectListResponse,
  ProjectTitleList,
} from "@/types/project";
import { ProductDetails } from "@/types/product";
import { useQuery } from "@tanstack/react-query";

async function fetchProjectCategories(): Promise<string[]> {
  try {
    const data = await fetchStrapi("/api/projects/categories");
    return data ?? [];
  } catch (error) {
    console.error("Error fetching project categories", error);
    return [];
  }
}

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

async function fetchProjectListByCategory(
  category: string
): Promise<ProjectTitleList[] | []> {
  try {
    const queryOptions = {
      filters: { category: { $eq: category } },
      fields: ["slug", "title", "projectDate"],
    };
    const data: ProjectListResponse = await fetchStrapi(
      "/api/projects",
      queryOptions
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
      fields: ["id", "title", "category", "slug", "projectDate"],
      populate: {
        thumbnail: {
          fields: ["*"],
        },
      },
    };
    const data: ProjectListResponse = await fetchStrapi(
      "/api/projects",
      queryOptions
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
            images: {
              fields: ["*"],
            },
          },
        },
      },
    };
    const data = await fetchStrapi("/api/projects", queryOptions, {
      // revalidate: 60,
    });
    return data.data[0];
  } catch (error) {
    console.error("Error fetching project details ", error);
    return null;
  }
}

async function fetchProjectBySlugCache(
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
            images: {
              fields: ["*"],
            },
          },
        },
      },
    };
    const data = await fetchStrapi("/api/projects", queryOptions, {
      revalidate: 60 * 5,
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
    const data = await fetchStrapi("/api/products", queryOptions);
    return data.data[0];
  } catch (error) {
    console.error("Error fetching project details ", error);
    return null;
  }
}

async function fetchAllProjectsAndProduct(): Promise<
  AllProjectsAndProducts[] | null
> {
  try {
    const queryOptions = {
      fields: ["category", "slug"],
      populate: {
        products: {
          fields: ["slug"],
        },
      },
      pagination: {
        pageSize: 1000,
      },
    };
    const data = await fetchStrapi("/api/projects", queryOptions);
    return data.data;
  } catch (error) {
    console.error("Error fetching all project and products ", error);
    return null;
  }
}
export const useProduct = (slug: string | null) => {
  return useQuery({
    queryKey: ["product", slug],
    queryFn: () => {
      if (!slug) throw new Error("Slug is required");
      return fetchProjectBySlug(slug);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    enabled: !!slug,
  });
};

export {
  fetchHeroSlides,
  fetchProjectListByCategory,
  fetchProjectsByCategory,
  fetchProjectBySlug,
  fetchProductBySlug,
  fetchAllProjectsAndProduct,
  fetchProjectBySlugCache,
  fetchProjectCategories,
};
