import ProjectGrid from "@/components/common/ProjectGrid";
import { fetchProjectsByCategory } from "@/lib/strapiApiCall";

async function Page() {
  const projects = await fetchProjectsByCategory("Urra Design Studio");

  return <ProjectGrid projects={projects || []} />;
}

export default Page;
