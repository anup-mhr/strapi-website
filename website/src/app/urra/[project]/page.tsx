import LinkButton from "@/components/common/LinkButton";
import { projects } from "@/constants/constants";
import { fetchStrapi } from "@/lib/strapi";
import Image from "next/image";

// export async function generateStaticParams() {
//   // TODO: FUTURE
//   //* RETURN ALL PROJECTS FROM THIS FUNCTION FOR SSG *//
//   //   const blogSlugs = await getAllBlogSlugs();
//   //   return blogSlugs.map((slug) => ({
//   //     id: slug,
//   //   }));
// }
export async function generateStaticParams() {
  const response = await fetchStrapi("/api/projects", {
    fields: ["slug"],
  });

  const projects = response.data || [];

  return projects.map((project: any) => ({
    project: project.slug,
  }));
}

async function getProjects(slug: string) {
  console.log("slug", slug)
  const response = await fetchStrapi(`/api/projects`, {
    filters: { slug: { $eq: slug } },
    fields: ["title", "description", "category"],
    populate: {
      products: {
        fields: ["slug", "name"],
        populate: {
          images: {
            fields: ["*"]
          }
        }
      }
    }
  });

  return response.data[0];
}

async function page({ params }: { params: Promise<{ project: string }> }) {
  const slug = (await params).project;

  const project = await getProjects(slug);
  console.log(project)


  return (
    <div>
      <p className="text-black text-sm mb-8 tracking-widest leading-7">
        {project.description}
      </p>
      {
        project.products.length === 0
          ? <h1 className="text-black font-semibold">We will be updating soon.</h1>
          :

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
            {project.products.map((product: any, index: number) => (
              <div
                key={index}
                className="group relative w-full aspect-square overflow-hidden shadow-lg flex items-center justify-center"
              >
                <div className="absolute top-1/2 left-1/2 z-10 w-full h-full group-hover:w-[82%] group-hover:h-[82%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                  <h1 className="uppercase font-semibold text-lg text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                    {product.name}
                  </h1>
                  <h1 className="text-white/80 uppercase translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                    {project.category}
                  </h1>
                  <LinkButton
                    href={`/urra/${slug}/${product.slug}`}
                    className="scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-300"
                  >
                    VIEW IMAGE
                  </LinkButton>
                </div>

                <Image
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${product.images[0].url}`}
                  alt={product.name}
                  fill
                  className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"

                />

              </div>
            ))}

          </div>
      }
    </div>
  );
}

export default page;
