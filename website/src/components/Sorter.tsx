"use client";
import { SortOption, useSort } from "@/context/SortContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const sortOptions = [
    {
        value: "low-high" as const,
        label: "Price Low -High"
    },
    {
        value: "high-low" as const,
        label: "Price High-Low"
    },
    { value: "name-asc" as const, label: "Name A-Z" },
    { value: "name-desc" as const, label: "Name Z-A" },
];

export function Sorter() {
    const { currentSort, setCurrentSort } = useSort();
    const [isOpen, setIsOpen] = useState(false);

    const currentLabel = sortOptions.find(
        (opt) => opt.value === currentSort
    )?.label;

    const handleSortChange = (sortOption: SortOption) => {
        setCurrentSort(sortOption);
        setIsOpen(false);
    };

    return (
        <div className="relative inline-block text-left">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex text-sm items-center justify-between cursor-pointer border border-black/20 text-primary rounded-md font-bold tracking-normal pl-6 px-2 py-2 uppercase"
            >
                <span>{currentLabel}</span>
                <ChevronDown
                    className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
                        }`}
                />
            </button>

            {isOpen && (
                <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 shadow-lg z-30">
                    {sortOptions.map((option) => (
                        <button
                            key={option.value}
                            onClick={() => handleSortChange(option.value)}
                            className={`block w-full px-4 py-2 text-[10px] text-left cursor-pointer hover:bg-gray-50 transition-colors duration-200 uppercase tracking-widest ${currentSort === option.value
                                    ? "bg-gray-100  text-black font-semibold"
                                    : "text-gray-700"
                                }`}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}