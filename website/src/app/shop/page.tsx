import Heading from "@/components/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import ProductList from "@/components/sections/ProductList";
import Sidebar from "@/components/sections/Sidebar";
import { products } from "@/constants/constants";
import { ChevronsRight } from "lucide-react";

export default function Page() {
    return (
        <div>
            <Header />

            <main className="padding py-12">
                <Heading title="SHOP" subtitle="Our latest products" />

                <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-[2rem] xl:gap-[4rem]">
                    <Sidebar />

                    <div>
                        <div className="flex justify-between items-center mb-10">
                            <p className="text-xs text-gray-600">SHOWING 1-9 OF 209 RESULTS</p>
                            <select className="border border-black/20 text-primary rounded-md font-bold tracking-normal pl-6 px-2 py-2">
                                <option>SORT BY</option>
                            </select>
                        </div>

                        <ProductList
                            products={Array(8).fill(products[0])}
                            className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
                        />
                    </div>
                </div>
                <div className="flex justify-center space-x-2 mt-10">
                    <button className="w-10 h-10 bg-primary-pink text-white rounded-full">1</button>
                    <button className="w-10 h-10 border border-black/20 rounded-full text-gray-600">2</button>
                    <button className="w-10 h-10 border border-black/20 rounded-full text-gray-600">3</button>
                    <button className="w-10 h-10 border border-black/20 rounded-full text-gray-600">4</button>
                    <button className="text-gray-600">
                        <ChevronsRight />
                    </button>
                </div>
            </main>

            <Footer />
        </div>
    );
}
