import LinkButton from "@/components/common/LinkButton";
import { getImageUrl } from "@/lib/helper";
import {
  fetchProjectBySlug,
  fetchProjectListByCategory,
} from "@/lib/strapiApiCall";
import Image from "next/image";

export const revalidate = 300;

export async function generateStaticParams() {
  const projects = await fetchProjectListByCategory("Events");

  return projects.slice(0, 5).map((project) => ({
    project: project.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ project: string }>;
}) {
  try {
    const slug = (await params).project;
    const project = await fetchProjectBySlug(slug);

    const title = project?.title || "Our Projects";
    const description = project?.description || "Checkout our latest projects";
    // Get the best image for meta tags
    const metaImageUrl = project?.thumbnail
      ? getImageUrl(project.thumbnail)
      : "";

    const metadata: any = {
      title,
      description,
      robots: "index, follow",
    };

    // OpenGraph metadata
    if (project) {
      metadata.openGraph = {
        title: title,
        description: description,
        images: [
          {
            url: metaImageUrl,
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      };
    }

    // Twitter metadata
    metadata.twitter = {
      card: "summary_large_image",
      title: title,
      description: description,
      images: [metaImageUrl],
    };

    // Remove undefined values
    Object.keys(metadata).forEach((key) => {
      if (metadata[key] === undefined) {
        delete metadata[key];
      }
    });

    return metadata;
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Projects | Events",
      description: "Checkout our latest projects",
    };
  }
}

async function page({ params }: { params: Promise<{ project: string }> }) {
  const slug = (await params).project;

  const project = await fetchProjectBySlug(slug);
  if (!project)
    return (
      <div>
        <h1 className="text-black font-semibold">We will be updating soon.</h1>
      </div>
    );

  return (
    <div>
      <p className="text-black text-sm mb-8 tracking-widest leading-7">
        {project.description}
      </p>
      {project.products.length === 0 ? (
        <h1 className="text-black font-semibold">We will be updating soon.</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          {project.products.map((product) => (
            <div
              key={product.documentId}
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
                  href={`/events/${slug}/${product.slug}`}
                  className="scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-300 uppercase"
                >
                  VIEW EVENT
                </LinkButton>
              </div>

              <Image
                src={getImageUrl(product.thumbnail)}
                alt={product.name}
                fill
                className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
