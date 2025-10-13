"use client";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const sortOptions = [
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "newest", label: "Newest First" },
  { value: "name", label: "Name A-Z" },
];

export function ProjectSorter() {
  const [currentSort, setCurrentSort] = useState(sortOptions[0].value);
  const [isOpen, setIsOpen] = useState(false);

  const currentLabel = sortOptions.find(
    (opt) => opt.value === currentSort
  )?.label;

  const handleSortChange = (sortOption: any) => {
    setCurrentSort(sortOption);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center justify-between cursor-pointer px-4 py-2 uppercase text-xs text-black tracking-normal bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 min-w-[150px]"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 shadow-lg z-30">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`block w-full px-4 py-2 text-xs text-left cursor-pointer hover:bg-gray-50 transition-colors duration-200 uppercase tracking-normal ${
                currentSort === option.value
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
