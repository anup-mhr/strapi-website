import Image from "next/image";
import Header from "@/components/sections/Header";
import Footer from "@/components/sections/Footer";
import ProductList from "@/components/sections/ProductList";
import ProductGallery from "@/components/ProductGallery";
import { product , relatedProducts } from "@/constants/constants";

export default async function ProductPage({ params }: { params: Promise<{ product: string }> }) {
    const slug = (await params).product;

    return (
        <div>
            <Header />

            <div className="padding pt-[3rem]">
                <div className="flex flex-col gap-2 items-center mt-14 sm:mt-20 lg:mt-24 mb-12 text-primary">
                    <Image
                        src={"/images/design.png"}
                        alt={"design"}
                        width={210}
                        height={100}
                        className="mb-4"
                    />
                    <h1 className="text-5xl heading">SHOP</h1>
                    <h2 className="text-2xl subheading">Our latest products</h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 w-full justify-between gap-8 items-start mb-20">
                    <ProductGallery images={product.images} name={product.name} />
                    <div className="flex justify-end">
                        <div className="max-w-xl">
                            <div className="flex justify-between mb-8 border-b-2 border-black/30">
                                <h2 className="text-xl font-bold uppercase tracking-widest">
                                    {product.name}
                                </h2>
                                <p className="text-lg mb-6">
                                    ₹{product.price.toLocaleString("en-IN")}.00
                                </p>
                            </div>

                            <div className="text-lg text-gray-700 mb-6 space-y-8">
                                <div className="space-y-2">
                                    <p>
                                        <strong>Size:</strong> {product.size}
                                    </p>
                                    <p>
                                        <strong>Material:</strong> {product.material}
                                    </p>
                                </div>
                                <p className="mt-4 text-black">{product.description}</p>
                                <p>
                                    <strong>Availability:</strong> {product.availability}
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
                    <ProductList products={relatedProducts} />
                </div>
            </div>

            <Footer />
        </div>
    );
}
