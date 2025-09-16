import { shopifyClient } from "@/lib/shopify";
import Button from "@/components/common/LinkButton";
import Image from "next/image";

async function getProjects() {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            title
            handle
            image {
              src
              altText
              width
              height
            }
          }
        }
      }
    }
  `;

  const data: any = await shopifyClient.request(query);
 
  return data.collections.edges;
}

async function Page() {
  const projects = await getProjects();
 console.log(projects);
  return (
    <main>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
        {projects.map((project: any) => (
          <div
            key={project.node.handle}
            className="group relative w-full aspect-square overflow-hidden shadow-lg flex items-center justify-center"
          >
            <div className="absolute top-1/2 left-1/2 z-10 w-full h-full group-hover:w-[82%] group-hover:h-[82%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
              <h1 className="uppercase font-semibold text-lg text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                {project.node.title}
              </h1>
              <h1 className="text-white/80 uppercase translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                OBJECTS
              </h1>
              <Button
                href={`/objects/${project.node.handle}`}
                className="scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-300"
              >
                VIEW IMAGE
              </Button>
            </div>

            <Image
              src={project.node.image.src}
              alt={project.node.title}
              fill
              className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
            />
          </div>
        ))}
      </div>


    </main>
  );
}

export default Page;
