import LinkButton from "@/components/common/LinkButton";
import { capitalize, getImageUrl } from "@/lib/helper";
import { fetchProductBySlug } from "@/lib/strapiApiCall";
import ImageSlider from "../../../../components/sections/product/ImageSlider";

export const revalidate = 300;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ image: string }>;
}) {
  try {
    const slug = (await params).image;
    const project = await fetchProductBySlug(slug);

    const title = project?.name
      ? `Urra Design Studio - ${capitalize(project.name)}`
      : "Aku Zeliang - Our Projects";

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
      title: "Projects | Urra Design Studio",
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

      <div className="text-2xs text-gray-800 mb-10 leading-5 px-5 md:px-0">
        <h1 className="text-black text-xs sm:text-sm font-semibold uppercase">
          {data.name}
        </h1>
        <h1 className="text-2xs text-gray-700 py-0 uppercase">
          URRA DESIGN STUDIO
        </h1>

        {
          data.description && <p className="py-5 tracking-[2px]">{data.description}</p>
        }

        {
          data.materials && <p> Materials: <span className="capitalize">{data.materials}</span> </p>
        }

        {
          data.dimension && <p>Dimensions: {data.dimension}</p>
        }

      </div>
      <div className="px-5 md:px-0">
        <LinkButton
          href={data?.CTA?.href}
          newTab={data?.CTA?.newTab}
          className="py-3"
        >
          {data?.CTA?.label ?? "Contact us"}
        </LinkButton>
      </div>
    </div>
  );
}

export default page;
