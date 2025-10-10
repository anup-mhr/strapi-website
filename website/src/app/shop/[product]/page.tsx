import Image from "next/image";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ProductList from "@/components/sections/ProductList";
import ProductGallery from "@/components/ProductGallery";
import { relatedProducts } from "@/constants/constants";
import Heading from "@/components/Heading";
import { getProductByHandle } from "@/lib/shopify";
import { formatPrice } from "@/lib/helper";

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
    const handle = (await params).product;

    const product = await getProductByHandle(handle);
    if (!product) {
        return <div></div>
    }
    console.log(product)
    return (
        <div>
            <Header />

            <main className="padding pt-[3rem]">
                <Heading title="SHOP" subtitle="Our latest products" />

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-8 items-start mb-20">
                    <ProductGallery images={product.images} name={product.title} />
                    <div className="flex justify-end">
                        <div className="max-w-xl">
                            <div className="flex justify-between mb-8 border-b-2 border-black/30">
                                <h2 className="text-xl font-bold uppercase tracking-widest">
                                    {product.title}
                                </h2>
                                <p>
                                    {formatPrice(product.variants[0].price.amount, product.variants[0].price.currencyCode)}
                                </p>
                            </div>

                            <div className="text-lg text-gray-700 mb-6 space-y-8">

                                <div className="space-y-2">
                                    {
                                        product.variants[0].selectedOptions.map((option, index) => (
                                            <p key={index} className={`${option.name==="Note" && "mt-6"}`}>
                                                <strong>{option.name}:</strong> {option.value}
                                            </p>

                                        ))
                                    }
                                </div>
                                <p className="mt-4 text-black">{product.description}</p>
                                <p>
                                    <strong>Availability:</strong> {product.variants[0].inventoryQuantity}
                                </p>
                            </div>

                            <div className="flex flex-col sm:flex-row items-center gap-8 mt-44">
                                <div className="flex items-center gap-8">
                                    <label htmlFor="quantity">Quantity</label>
                                    <select id="quantity" className="px-4 py-2" defaultValue={1}>
                                        {[1, 2, 3, 4, 5].map((q) => (
                                            <option key={q} value={q}>
                                                {q}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <button className="w-full bg-black text-white px-6 py-4 rounded-md hover:opacity-90">
                                    ADD TO CART
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                <div>
                    <h1 className="text-xl font-semibold mb-6 uppercase tracking-widest">
                        Related Products
                    </h1>
                    {/* <ProductList products={relatedProducts} /> */}
                </div>
            </main>

            <Footer />
        </div>
    );
}
