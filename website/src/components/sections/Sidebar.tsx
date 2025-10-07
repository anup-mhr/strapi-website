"use client";
import { useState } from 'react';
import React from 'react'
import { categories } from '@/constants/constants';

const Sidebar = () => {

    const [minPrice, setMinPrice] = useState(500);
    const [maxPrice, setMaxPrice] = useState(10000);
    const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

    const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.min(Number(e.target.value), maxPrice - 100);
        setMinPrice(value);
    };

    const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Math.max(Number(e.target.value), minPrice + 100);
        setMaxPrice(value);
    };

    const toggleCategory = (name: string) => {
        setExpandedCategories(prev =>
            prev.includes(name)
                ? prev.filter(cat => cat !== name)
                : [...prev, name]
        );
    };
    return (
        <div className="min-w-[17rem] hidden lg:block">
            <div className="mb-12">
                <h3 className="font-semibold pb-2 mb-4 border-b-2 border-black/30">
                    FILTER BY PRICE
                </h3>

                <div className="relative h-6 mt-2">
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-primary-pink rounded-full transform -translate-y-1/2 z-0" />

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

                <div className="flex items-center justify-between">
                    <div className="text-base text-gray-500 mt-2">
                        <span>
                            <span className="font-bold">Price: </span>₹{minPrice.toLocaleString("en-IN")} - ₹{maxPrice.toLocaleString("en-IN")}
                        </span>
                    </div>

                    <button className="mt-3 px-12 rounded-md py-2 bg-primary-pink text-white hover:bg-pink-100">
                        FILTER
                    </button>
                </div>
            </div>

            <div>
                <h3 className="font-semibold pb-2 border-b-2 border-black/30 mb-4">
                    FILTER BY CATEGORY
                </h3>
                <ul className=" space-y-3 text-gray-700">
                    {categories.map((category) => (
                        <li key={category.name}>
                            <div
                                className="flex justify-between items-center cursor-pointer"
                                onClick={() => toggleCategory(category.name)}
                            >
                                <span>{category.name}</span>
                                {category.subcategories.length > 0 && (
                                    <button className="w-5 h-5 flex justify-center text-black/30 items-center font-bold border-1 border-black/10 rounded-full text-sm">
                                        {expandedCategories.includes(category.name) ? "−" : "+"}
                                    </button>
                                )}
                            </div>

                            {expandedCategories.includes(category.name) &&
                                category.subcategories.length > 0 && (
                                    <ul className="ml-4 mt-2 space-y-1 text-gray-600">
                                        {category.subcategories.map((sub) => (
                                            <li key={sub}>{sub}</li>
                                        ))}
                                    </ul>
                                )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar