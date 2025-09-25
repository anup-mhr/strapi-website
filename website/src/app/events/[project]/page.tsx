import ModifiedImage from "@/components/common/ModifiedImage";
import { capitalize, getImageUrl } from "@/lib/helper";
import {
  fetchProjectBySlug,
  fetchProjectListByCategory,
} from "@/lib/strapiApiCall";

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

    const title = project?.title
      ? `Aku Zeliang - ${capitalize(project.title)}`
      : "Aku Zeliang - Our Projects";
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
      {
        project.description && <p className="text-black text-xs mb-8 tracking-widest px-5 md:px-0 leading-7">
          {project.description
            .split(new RegExp(`(${project.title})`, "gi"))
            .map((part, index) =>
              part.toLowerCase() === project.title.toLowerCase() ? (
                <strong key={index}>{part}</strong>
              ) : (
                part
              )
            )}
        </p>
      }
      {project.products.length === 0 ? (
        <h1 className="text-black font-semibold">We will be updating soon.</h1>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
          {project.products.map((product) => (
            <ModifiedImage
              key={product.documentId}
              project={product}
              category="Events"
              ctaLabel="VIEW EVENT"
              href={`/events/${slug}/${product.slug}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default page;
