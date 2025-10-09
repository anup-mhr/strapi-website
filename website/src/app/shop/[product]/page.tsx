import Heading from "@/components/Heading";
import ProductGallery from "@/components/ProductGallery";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import ProductList from "@/components/sections/ProductList";
import { product, relatedProducts } from "@/constants/constants";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ product: string }>;
}) {
  const slug = (await params).product;
  console.log("this is slug", slug);

  return (
    <div>
      <Header />

      <main className="padding pt-[3rem]">
        <Heading title="SHOP" subtitle="Our latest products" />

        <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-8 items-start mb-20">
          <ProductGallery images={product.images} name={product.name} />
          <div className="flex lg:justify-end">
            <div className="max-w-xl">
              <div className="flex justify-between mb-8 border-b-2 border-black/30">
                <h2 className="text-xl font-bold uppercase tracking-widest">
                  {product.name}
                </h2>
                <p className="text-lg mb-4">
                  ₹
                  {product.price.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>

              <div className="text-base text-gray-700 mb-6 space-y-8">
                <div className="space-y-2">
                  <p>Size: {product.size}</p>
                  <p>Material: {product.material}</p>
                </div>
                <p className="mt-4 text-gray-700">{product.description}</p>
                <p>
                  Availability:{" "}
                  <span className="text-primary-pink">
                    {product.availability}
                  </span>{" "}
                  in stock
                </p>
              </div>

              <div className="flex items-center gap-4 md:gap-8 mt-15 xl:mt-44">
                <div className="flex items-center gap-2 md:gap-8">
                  <label htmlFor="quantity" className="text-gray-700">
                    Quantity
                  </label>
                  <select
                    id="quantity"
                    className="px-4 py-2 border border-primary-pink/30"
                    defaultValue={1}
                  >
                    {Array.from(
                      { length: product.availability },
                      (_, i) => i + 1
                    ).map((q) => (
                      <option key={q} value={q}>
                        {q}
                      </option>
                    ))}
                  </select>
                </div>

                <button className="w-full bg-black text-white px-6 py-3 rounded-md hover:opacity-90">
                  ADD TO CART
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h1 className="text-xl font-semibold mb-6 uppercase tracking-wider">
            Related Products
          </h1>
          <ProductList products={relatedProducts} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
