import LinkButton from "@/components/common/LinkButton";
import { getImageUrl } from "@/lib/helper";
import { fetchProjectsByCategory } from "@/lib/strapiApiCall";
import Image from "next/image";

async function Page() {
  const projects = await fetchProjectsByCategory("Events");

  if (!projects) return <div>Loading</div>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
      {projects.length === 0 && (
        <div className="text-black">We will be updating soon.</div>
      )}
      {projects.map((project) => (
        <div
          key={project.slug}
          className="group relative w-full aspect-square overflow-hidden shadow-lg flex items-center justify-center"
        >
          <div className="absolute top-1/2 left-1/2 z-10 w-full h-full group-hover:w-[82%] group-hover:h-[82%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
            <h1 className="uppercase font-semibold text-lg text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
              {project.title}
            </h1>
            <h1 className="text-white/80 uppercase translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
              {project.category}
            </h1>
            <LinkButton
              href={`/events/${project.slug}`}
              className="scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-300 uppercase"
            >
              view event
            </LinkButton>
          </div>

          <Image
            src={getImageUrl(project.thumbnail)}
            alt={project.title}
            fill
            className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
          />
        </div>
      ))}
    </div>
  );
}

export default Page;
