import ProjectGrid from "@/components/common/ProjectGrid";
import { getCategoryViaSlug } from "@/lib/helper";
import { fetchStrapi } from "@/lib/strapi";
import { fetchProjectCategories, fetchProjectsByCategory } from "@/lib/strapiApiCall";
import { notFound } from "next/navigation";

async function Page({ params }: { params: Promise<{ category: string }> }) {
  const { category } = await params;
  const { displayName } = getCategoryViaSlug(category)
  const projects = await fetchProjectsByCategory(displayName);

  const categories = await fetchProjectCategories();
  console.log(categories);

  if (!categories.includes(displayName)) {
    notFound();
  }

  return (
    <ProjectGrid
      projects={projects || []}
      category={category}
      ctaLabel={category === "events" ? "view event" : "view work"}
    />
  );
}

export default Page;
