"use client";

import Image from "next/image";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import ProductList from "@/components/sections/ProductList";
import { products } from "@/constants/constants";
import { useState } from "react";

export default function Page() {
    const [minPrice, setMinPrice] = useState(0);
    const [maxPrice, setMaxPrice] = useState(10000);

    // Handlers to avoid overlap
    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxPrice - 100);
        setMinPrice(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minPrice + 100);
        setMaxPrice(value);
    };

    return (
        <div>
            <Header />
            <div className="padding py-[12rem] tracking-widest">
                <div className="text-center mb-16">
                    <h1 className="text-3xl font-bold">SHOP</h1>
                    <h2 className="tagline text-lg">Our latest products</h2>
                </div>

                <div className="grid grid-cols-[1fr_4fr] gap-10">
                    {/* Sidebar */}
                    <div>
                        {/* Filter by Price */}
                        <div className="mb-10">
                            <h3 className="font-semibold mb-3">FILTER BY PRICE</h3>

                            {/* Dual Thumb Range */}
                            <div className="relative h-6 mt-2">
                                <div className="absolute top-1/2 left-0 right-0 h-1 bg-pink-300 rounded-full transform -translate-y-1/2 z-0" />

                                <input
                                    type="range"
                                    min="100"
                                    max="10000"
                                    value={minPrice}
                                    onChange={handleMinChange}
                                    className="range-thumb absolute top-1/2 w-full transform -translate-y-1/2 z-10"
                                />

                                <input
                                    type="range"
                                    min="100"
                                    max="10000"
                                    value={maxPrice}
                                    onChange={handleMaxChange}
                                    className="range-thumb absolute -top-1/2 w-full transform -translate-y-1/2 z-10"
                                />
                            </div>
                            {/* Display Min and Max Price */}


                            {/* Filter Button */}
                            <div className="flex items-center justify-between">
                                <div className="text-xs text-gray-600 mt-2">
                                    <span><span className="font-semibold text-sm">Price: </span>₹{minPrice} - ₹{maxPrice}</span>
                                </div>

                                <button className="mt-3 px-6 py-2  text-xs bg-pink-300 text-white hover:bg-pink-100">
                                    FILTER
                                </button>
                            </div>
                        </div>

                        {/* Filter by Category */}
                        <div>
                            <h3 className="font-semibold mb-3">FILTER BY CATEGORY</h3>
                            <ul className="text-sm space-y-2 text-gray-700">
                                <li>Accessories</li>
                                <li className="ml-4">Mini Pouch</li>
                                <li>Bamboo Textiles</li>
                                <li className="ml-4">Mekhala Single</li>
                                <li className="ml-4">Shawls</li>
                                <li className="ml-4">Scarves</li>
                                <li>Cotton Throws</li>
                                <li>Cushion Covers</li>
                                <li className="ml-4">16x16</li>
                                <li className="ml-4">20x20</li>
                                <li>Indigenous Naga Crafts</li>
                                <li className="ml-4">Umbrellas</li>
                                <li className="ml-4">Stoles</li>
                                <li>Table Runners</li>
                                <li>Textile Artwork</li>
                                <li>Wall Decor</li>
                                <li className="ml-4">Bamboo & Loin Loom</li>
                                <li className="ml-4">Textile</li>
                            </ul>
                        </div>
                    </div>

                    {/* Product Grid */}
                    <div>
                        <div className="flex justify-between items-center mb-10">
                            <p className="text-xs text-gray-600">SHOWING 1-9 OF 209 RESULTS</p>
                            <select className="border border-black/20 text-primary font-bold tracking-normal pl-6 px-2 py-2 text-xs ">
                                <option>DEFAULT SORTING</option>
                            </select>
                        </div>

                        <ProductList
                            products={Array(8).fill(products[0])}
                            className="grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                        />

                        {/* Pagination */}
                        <div className="flex justify-center space-x-2 mt-10">
                            <button className="w-8 h-8 border rounded-full">1</button>
                            <button className="w-8 h-8 border rounded-full text-gray-600">2</button>
                            <button className="w-8 h-8 border rounded-full text-gray-600">3</button>
                            <button className="w-8 h-8 border rounded-full text-gray-600">4</button>
                            <button className="w-8 h-8 border rounded-full text-gray-600">&raquo;</button>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
