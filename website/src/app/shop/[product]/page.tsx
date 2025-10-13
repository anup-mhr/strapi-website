import Heading from "@/components/Heading";
import ProductGallery from "@/components/ProductGallery";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import ProductList from "@/components/sections/ProductList";
import { relatedProducts } from "@/constants/constants";

import ProductDetails from "@/components/ProductDetails";
import { getProductByHandle } from "@/lib/shopify";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const handle = (await params).product;
  const product = await getProductByHandle(handle);

  if (!product) return <div>Product not found</div>;

  return (
    <div>
      <Header />

      <main className="padding pt-[3rem]">
        <Heading title="SHOP" subtitle="Our latest products" />

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
          <ProductList products={relatedProducts as any} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
