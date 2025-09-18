import LinkButton from "@/components/common/LinkButton";
import { fetchProductBySlug } from "@/lib/strapiApiCall";
import ImageSlider from "../../../../components/sections/product/ImageSlider";
import { getImageUrl } from "@/lib/helper";

export const revalidate = 86400;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ image: string }>;
}) {
  try {
    const slug = (await params).image;
    const project = await fetchProductBySlug(slug);

    const title = project?.title || "Projects | Events";
    const description = project?.description || "Checkout our latest products";
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
      description: "Checkout our latest products",
    };
  }
}

async function page({ params }: { params: Promise<{ image: string }> }) {
  const slug = (await params).image;
  const data = await fetchProductBySlug(slug);

  if (!data)
    return (
      <div>
        <h1 className="text-black font-semibold">We will be updating soon.</h1>
      </div>
    );

  return (
    <div className="text-black tracking-[3px]">
      <ImageSlider images={data.images} />

      <div className="text-sm text-gray-800 mb-16">
        <h1 className="text-black text-base sm:text-lg lg:text-xl uppercase">
          {data.name}
        </h1>
        <h1 className="text-xs sm:text-sm lg:text-base py-2 lg:py-0 uppercase">
          Events
        </h1>

        <p className="py-8 tracking-[2px]">{data.description}</p>

        <p>Materials: {data.materials}</p>
        <p>Dimensions: {data.dimension}</p>
      </div>

      <LinkButton href={data?.CTA?.href}>
        {data?.CTA?.label ?? "Contact us"}
      </LinkButton>
    </div>
  );
}

export default page;
