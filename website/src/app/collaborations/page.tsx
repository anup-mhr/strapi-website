import ProjectGrid from "@/components/common/ProjectGrid";
import { fetchProjectsByCategory } from "@/lib/strapiApiCall";

async function Page() {
  const projects = await fetchProjectsByCategory("Collaborations");

  return (
    <ProjectGrid
      projects={projects || []}
      category="collaborations"
      ctaLabel="view work"
    />
  );
}

export default Page;
