import {
  capitalize,
  getCategoryViaSlug,
  getImageUrl,
  getPlainText,
} from "@/lib/helper";
import { fetchProductBySlug, fetchProjectBySlug } from "@/lib/strapiApiCall";

// Universal SEO builder
function buildSEO({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image?: string;
}) {
  const metadata: any = {
    title,
    description,
    robots: "index, follow",
    openGraph: {
      title,
      description,
      images: image
        ? [
            {
              url: image,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: image ? [image] : [],
    },
  };

  Object.keys(metadata).forEach((key) => {
    if (metadata[key] === undefined) delete metadata[key];
  });

  return metadata;
}

// Category metadata
export function generateCategoryMetadata(slug: string) {
  const meta = getCategoryViaSlug(slug);
  return buildSEO({
    title: meta.title,
    description: meta.description,
  });
}

// Project metadata
export async function generateProjectMetadata(projectSlug: string) {
  try {
    const project = await fetchProjectBySlug(projectSlug);
    const title = project?.title
      ? `Aku Zeliang - ${capitalize(project.title)}`
      : "Aku Zeliang - Our Projects";
    const description = getPlainText(
      project?.description,
      "Checkout our latest projects"
    );
    const image = project?.thumbnail ? getImageUrl(project.thumbnail) : "";

    return buildSEO({ title, description, image });
  } catch (error) {
    console.error("Error generating project metadata:", error);
    return buildSEO({
      title: "Projects | Urra Design Studio",
      description: "Checkout our latest projects",
    });
  }
}

//Product (Image) metadata
export async function generateProductMetadata(productSlug: string) {
  try {
    const product = await fetchProductBySlug(productSlug);

    const title = product?.name
      ? `Aku Zeliang - ${capitalize(product.name)}`
      : "Aku Zeliang - Our Projects";

    const description = getPlainText(
      product?.description,
      "Checkout our latest products"
    );

    const image = product?.images?.[0] ? getImageUrl(product.images[0]) : "";

    return buildSEO({ title, description, image });
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return buildSEO({
      title: "Projects | Urra Design Studio",
      description: "Checkout our latest products",
    });
  }
}
