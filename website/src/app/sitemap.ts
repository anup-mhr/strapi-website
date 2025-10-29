import { fetchAllProjectsAndProduct } from "@/lib/strapiApiCall";
import type { MetadataRoute } from "next";

const DOMAIN = process.env.DOMAIN_URL;

const categoryMap: any = {
  Collaborations: "collaborations",
  Events: "events",
  Objects: "objects",
  "Urra Design Studio": "urra",
};

async function dynamicRoutesList() {
  const everything = await fetchAllProjectsAndProduct();
  if (!everything) return [];

  const routes = everything.flatMap((item) => {
    const category = categoryMap[item?.category?.title];
    return item.products.map(
      (product) => `${category}/${item.slug}/${product.slug}`
    );
  });
  return routes;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static routes (always available)
  const staticRoutes: MetadataRoute.Sitemap = [
    "/",
    "/contact",
    "/payment-modes",
    "/terms",
    "/collaborations",
    "/events",
    "/objects",
    "/urra",
  ].map((route) => ({
    url: `${DOMAIN}${route}`,
    lastModified: new Date(),
    priority: route === "/" ? 1 : 0.8,
  }));

  const routes = await dynamicRoutesList();

  const dynamicRoutes: MetadataRoute.Sitemap = [
    ...routes.map((slug) => ({
      url: `${DOMAIN}/${slug}`,
      lastModified: new Date(),
      priority: 0.8,
    })),
  ];

  return [...staticRoutes, ...dynamicRoutes];
}

// Optional: cache sitemap for 1 hour
export const revalidate = 3600;
