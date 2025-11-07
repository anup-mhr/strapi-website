import { getAllProductHandles } from "@/lib/shopify";
import { getAllJournalSlugs } from "@/lib/strapiApiCall";
import type { MetadataRoute } from "next";

const DOMAIN = process.env.DOMAIN_URL;


async function dynamicRoutesList() {
    const productHandles = await getAllProductHandles();
    const journalSlugs = await getAllJournalSlugs() || [];

    return [
        ...productHandles.map(handle => {
            return `shop/${handle}`;
        }),
        ...journalSlugs.map(journal => {
            return `journal/${journal.slug}`;
        }),
    ]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Static routes (always available)
    const staticRoutes: MetadataRoute.Sitemap = [
        "/",
        "/shop",
        "/journal",
        "/terms",
        "/about",
        "/contact",
        "/return-refund-policy",
        "/shipping",
        "/privacy-policy",
        "/terms",
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
// export const revalidate = 0;