import Image from "next/image";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ProductGallery from "@/components/ProductGallery";
import Heading from "@/components/Heading";
import { getProductByHandle } from "@/lib/shopify";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
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
          <div className="flex justify-end">
            <ProductDetails product={product} />
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
