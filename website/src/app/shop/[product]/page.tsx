import ProductGallery from "@/components/ProductGallery";
import ProductList from "@/components/sections/ProductList";

import ProductDetails from "@/components/ProductDetails";
import { getProductByHandle, getRecommendedProducts } from "@/lib/shopify";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const handle = (await params).product;
  const product = await getProductByHandle(handle);

  if (!product)
    return (
      <div className="flex justify-center items-center min-h-[250px]">
        <p className="text-gray-600 text-lg">Product not found.</p>
      </div>
    );

  // update fetch for related products
  const relatedProducts = await getRecommendedProducts(product.id);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-6 sm:gap-8 lg:gap-12 items-start mb-12 sm:mb-16 lg:mb-20">
        <ProductGallery images={product.images} name={product.title} />
        <div className="flex lg:justify-end">
          <ProductDetails product={product} />
        </div>
      </div>

      <div>
        <h1 className="text-base sm:text-lg md:text-xl font-semibold mb-4 sm:mb-6 uppercase tracking-wide sm:tracking-wider">
          Related Products
        </h1>
        <ProductList products={relatedProducts} />
      </div>
    </>
  );
}
