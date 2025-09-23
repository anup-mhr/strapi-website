import ModifiedImage from "@/components/common/ModifiedImage";
import { fetchProjectsByCategory } from "@/lib/strapiApiCall";

async function Page() {
  const projects = await fetchProjectsByCategory("Collaborations");

  if (!projects) return <div>Loading</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
      {projects.length === 0 && (
        <div className="text-black">We will be updating soon.</div>
      )}
      {projects.map((project) => (
        <ModifiedImage
          key={project.slug}
          project={project}
          href={`/collaborations/${project.slug}`}
        />
      ))}
    </div>
  );
}

export default Page;
