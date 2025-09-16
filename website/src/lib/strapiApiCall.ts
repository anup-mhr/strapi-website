import { ApiResponse, HeroSlide } from "@/types/heroslide";
import { fetchStrapi } from "./strapi";

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

export { fetchHeroSlides };
