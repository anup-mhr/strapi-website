import ProjectGrid from "@/components/common/ProjectGrid";
import { fetchProjectsByCategory } from "@/lib/strapiApiCall";

async function Page() {
  const projects = await fetchProjectsByCategory("Objects");

  return (
    <ProjectGrid
      projects={projects || []}
      category="objects"
      ctaLabel="view work"
    />
  );
}

export default Page;
