import { ApiResponse, HeroSlide } from "@/types/heroslide";
import { ProductDetails } from "@/types/product";
import {
  AllProjectsAndProducts,
  ProjectDetails,
  ProjectList,
  ProjectListResponse,
  ProjectTitleList,
} from "@/types/project";
import { useQuery } from "@tanstack/react-query";
import { fetchStrapi } from "./strapi";
import { ContactPageDetails } from "@/types/contact";

async function fetchProjectCategories(): Promise<string[]> {
  try {
    const data = await fetchStrapi(
      "/api/pages",
      {},
      {
        revalidate: 60,
      }
    );
    const titles =
      data?.data
        ?.sort(
          (a: any, b: any) =>
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
        )
        .map((page: any) => page.title) ?? [];

    return titles;
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
      queryOptions,
      {
        revalidate: 60 * 5,
      }
    );
    return data.data;
  } catch (error) {
    console.error("Error fetching hero slides", error);
    return [];
  }
}

async function fetchContactContent(): Promise<ContactPageDetails | null> {
  try {
    const queryOptions = {
      fields: ["*"],
      populate: {
        heroSection: {
          fields: ["*"],
          populate: "*",
        },
      },
    };
    const data = await fetchStrapi("/api/contact", queryOptions, {
      revalidate: 60,
    });
    return data.data;
  } catch (error) {
    console.error("Error fetching contact data", error);
    return null;
  }
}

async function fetchTermsContent(): Promise<string> {
  try {
    const data = await fetchStrapi(
      "/api/terms-and-condition",
      {},
      {
        revalidate: 60,
      }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching terms data", error);
    return "";
  }
}

async function fetchPaymentModes(): Promise<string> {
  try {
    const data = await fetchStrapi(
      "/api/payment-mode",
      {},
      {
        revalidate: 60,
      }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching payment data", error);
    return "";
  }
}

async function fetchProjectListByCategory(
  category: string
): Promise<ProjectTitleList[] | []> {
  try {
    const queryOptions = {
      filters: {
        category: {
          title: {
            $eq: category,
          },
        },
      },
      fields: ["slug", "title", "projectDate"],
    };
    const data: ProjectListResponse = await fetchStrapi(
      "/api/projects",
      queryOptions,
      {
        revalidate: 60,
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
      filters: { category: { title: { $eq: category } } },
      fields: ["id", "title", "slug", "projectDate"],
      populate: {
        thumbnail: {
          fields: ["*"],
        },
        category: {
          fields: ["title"],
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
      fields: ["title", "description"],
      populate: {
        products: {
          fields: ["slug", "name"],
          populate: {
            images: {
              fields: ["*"],
            },
          },
        },
        category: {
          fields: ["title"],
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
      fields: ["title", "description"],
      populate: {
        products: {
          fields: ["slug", "name"],
          populate: {
            images: {
              fields: ["*"],
            },
          },
        },
        category: {
          fields: ["title"],
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
      fields: ["slug"],
      populate: {
        products: {
          fields: ["slug"],
        },
        category: {
          fields: ["title"],
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
  fetchAllProjectsAndProduct,
  fetchContactContent,
  fetchHeroSlides,
  fetchProductBySlug,
  fetchProjectBySlug,
  fetchProjectBySlugCache,
  fetchProjectCategories,
  fetchProjectListByCategory,
  fetchProjectsByCategory,
  fetchTermsContent,
  fetchPaymentModes,
};
