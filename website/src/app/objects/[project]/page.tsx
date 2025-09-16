import LinkButton from "@/components/common/LinkButton";
import { projects } from "@/constants/constants";
import { shopifyClient } from "@/lib/shopify";
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


async function getProducts(handle: string) {
    const query = `
    {
      collectionByHandle(handle: "${handle}") {
        id
        title
        handle
         description
        products(first: 20) {
          edges {
            node {
              title
              handle
              images(first: 1) {
                edges {
                  node {
                    src
                    altText
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

    const data: any = await shopifyClient.request(query);
    console.log(data.collectionByHandle)
    return data.collectionByHandle;
}

async function page({ params }: { params: Promise<{ project: string }> }) {
    const slug = (await params).project;

    const project = await getProducts(slug);
    console.log("products", project)


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
                        {project.products.edges.map((product: any, index: number) => (
                            <div
                                key={index}
                                className="group relative w-full aspect-square overflow-hidden shadow-lg flex items-center justify-center"
                            >
                                <div className="absolute top-1/2 left-1/2 z-10 w-full h-full group-hover:w-[82%] group-hover:h-[82%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
                                    <h1 className="uppercase font-semibold text-lg text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
                                        {product.node.title}
                                    </h1>
                                    <h1 className="text-white/80 uppercase translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
                                        {project.title}
                                    </h1>
                                    <LinkButton
                                        href={`/objects/${slug}/${product.node.handle}`}
                                        className="scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-300"
                                    >
                                        VIEW IMAGE
                                    </LinkButton>
                                </div>

                                <Image
                                    src={product.node.images.edges[0].node.src}
                                    alt={product.node.title}
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
