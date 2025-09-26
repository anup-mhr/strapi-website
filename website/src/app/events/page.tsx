import ProjectGrid from "@/components/common/ProjectGrid";
import { fetchProjectsByCategory } from "@/lib/strapiApiCall";

async function Page() {
  const projects = await fetchProjectsByCategory("Events");

  return (
    <ProjectGrid
      projects={projects || []}
      category="events"
      ctaLabel="view events"
    />
  );
}

export default Page;
