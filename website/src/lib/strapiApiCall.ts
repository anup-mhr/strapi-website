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

export interface IJournalResponse {
  data: IJournal[];
  meta: {
    pagination: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

async function fetchJournals(
  pageSize?: number,
  page?: number,
  sort?: string
): Promise<IJournalResponse> {
  try {
    const queryOptions = {
      populate: {
        profile_image: true,
        tags: true,
      },
      pagination: {
        pageSize: pageSize ?? 5,
        page: page ?? 1,
      },
      sort: [sort ?? "published_date:desc"],
    };

    const data = await fetchStrapi("/api/journals", queryOptions);
    return data;
  } catch (error) {
    console.error("Error fetching journals", error);
    return {
      data: [],
      meta: {
        pagination: {
          page: 1,
          pageSize: 5,
          pageCount: 1,
          total: 0,
        },
      },
    };
  }
}

async function fetchJournalBySlug(slug: string): Promise<IJournal | null> {
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

async function fetchRelatedJournals(
  slug: string,
  tags: string[]
): Promise<IJournal[] | []> {
  try {
    const queryOptions = {
      filters: {
        tags: {
          name: {
            $in: tags,
          },
        },
        slug: {
          $ne: slug,
        },
      },
      populate: {
        profile_image: true,
        tags: true,
      },
      pagination: {
        pageSize: 4,
      },
      // sort: ["published_date:desc"],
    };

    const data = await fetchStrapi("/api/journals", queryOptions);

    if (!data.data || data.data.length === 0) {
      return [];
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching journal with tags "${tags}"`, error);
    return [];
  }
}

async function fetchAboutPage() {
  try {
    const data = await fetchStrapi(
      "/api/about",
      {}
      // {
      //   revalidate: 60 * 60 * 24 * 30,
      // }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching terms data", error);
    return "";
  }
}

async function fetchContactPage() {
  try {
    const data = await fetchStrapi(
      "/api/contact",
      {}
      // {
      //   revalidate: 60 * 60 * 24 * 30,
      // }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching terms data", error);
    return "";
  }
}

async function fetchReturnRefundPage() {
  try {
    const data = await fetchStrapi(
      "/api/return-and-refund",
      {}
      // {
      //   revalidate: 60 * 60 * 24 * 30,
      // }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching terms data", error);
    return "";
  }
}

async function fetchShippingPage() {
  try {
    const data = await fetchStrapi(
      "/api/shipping-policy",
      {}
      // {
      //   revalidate: 60 * 60 * 24 * 30,
      // }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching terms data", error);
    return "";
  }
}

async function fetchTermsPage(): Promise<string> {
  try {
    const data = await fetchStrapi(
      "/api/terms-and-condition",
      {}
      // {
      //   revalidate: 60 * 60 * 24 * 30,
      // }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching terms data", error);
    return "";
  }
}

async function fetchPrivacyPage() {
  try {
    const data = await fetchStrapi(
      "/api/privacy-policy",
      {}
      // {
      //   revalidate: 60 * 60 * 24 * 30,
      // }
    );
    return data.data.content;
  } catch (error) {
    console.error("Error fetching terms data", error);
    return "";
  }
}


async function getAllJournalSlugs(): Promise<IJournal[] | null> {
  try {
    const queryOptions = {
      fields: ['slug']
    };

    const data = await fetchStrapi("/api/journals", queryOptions);

    if (!data.data || data.data.length === 0) {
      return null;
    }

    return data.data;
  } catch (error) {
    console.error(`Error fetching slugs`);
    return null;
  }
}

export {
  fetchHeroSlides,
  fetchJournalBySlug,
  fetchJournals,
  fetchRelatedJournals,
  fetchReturnRefundPage,
  fetchShippingPage,
  fetchAboutPage,
  fetchContactPage,
  fetchTermsPage,
  fetchPrivacyPage,
  getAllJournalSlugs
};
