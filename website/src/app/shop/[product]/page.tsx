import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductList from "@/components/sections/ProductList";
import { getProductByHandle, getRecommendedProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPlainText } from "@/lib/helper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ product: string }>;
}): Promise<Metadata> {
  const handle = (await params).product;
  const product = await getProductByHandle(handle);

  if (!product) {
    return {
      title: "Product Not Found",
    };
  }
  const description = getPlainText(product.descriptionHtml);

  return {
    title: "Heirloom Naga - " + product.title,
    description: description || `Buy ${product.title} - High quality product`,
    openGraph: {
      title: product.title,
      description: description || `Buy ${product.title}`,
      images: product.images?.slice(0, 1).map((img) => ({
        url: img.src,
        alt: product.title,
      })),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.title,
      description: description || `Buy ${product.title}`,
      images: product.images?.[0]?.src ? [product.images[0].src] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const handle = (await params).product;
  const product = await getProductByHandle(handle);

  if (!product) return notFound();

  const relatedProducts = await getRecommendedProducts(product.handle, product.tags);
  return (
    <div>
      <main className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-8 items-start mb-20">
          <ProductGallery images={product.images} name={product.title} />
          <div className="flex lg:justify-end">
            <ProductDetails product={product} />
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold mb-6 uppercase tracking-wider">
            Related Products
          </h1>
          <ProductList products={relatedProducts.slice(0, 4)} />
        </div>
      </main>
    </div>
  );
}
