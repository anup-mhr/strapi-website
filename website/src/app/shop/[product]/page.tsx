import ProductDetails from "@/components/ProductDetails";
import ProductGallery from "@/components/ProductGallery";
import ProductList from "@/components/sections/ProductList";
import { getProductByHandle, getRecommendedProducts } from "@/lib/shopify";
import { notFound } from "next/navigation";


export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const handle = (await params).product;
  const product = await getProductByHandle(handle);

  if (!product) return notFound();

  const relatedProducts = await getRecommendedProducts(product.id);

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
