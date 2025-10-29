import { capitalize, getImageUrl, getPlainText } from "./helper";
import { getProductByHandle } from "./shopify";
import { fetchJournalBySlug } from "./strapiApiCall";

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

export async function generateJournalMetadata(productSlug: string) {
  try {
    const journal = await fetchJournalBySlug(productSlug);

    const title = journal?.title
      ? `Heirloom Naga - ${capitalize(journal.title)}`
      : "Heirloom Naga - Our Journals";

    const description = getPlainText(
      journal?.content,
      "Checkout our latest journals"
    );

    const image = journal?.profile_image
      ? getImageUrl(journal.profile_image)
      : "";

    return buildSEO({ title, description, image });
  } catch (error) {
    console.error("Error generating journal metadata:", error);
    return buildSEO({
      title: "Heirloom Naga - Our Journals",
      description: "Checkout our latest journals",
    });
  }
}

export async function generateProductMetadata(productSlug: string) {
  try {
    const product = await getProductByHandle(productSlug);

    const title = product?.title
      ? `Heirloom Naga - ${capitalize(product.title)}`
      : "Heirloom Naga - Our Products";

    const description = getPlainText(
      product?.descriptionHtml,
      "Checkout our latest Products"
    );

    const image = product?.images?.[0] ? product.images[0].src : "";

    return buildSEO({ title, description, image });
  } catch (error) {
    console.error("Error generating product metadata:", error);
    return buildSEO({
      title: "Heirloom Naga - Our Journals",
      description: "Checkout our latest journals",
    });
  }
}
