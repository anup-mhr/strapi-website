"use client";
import { SortOption, useSort } from "@/context/SortContext";
import { ChevronDown } from "lucide-react";
import { useState } from "react";

const sortOptions = [
  {
    value: "date-desc" as const,
    label: (
      <>
        Newest <span className="text-sm">→</span> Oldest
      </>
    ),
  },
  {
    value: "date-asc" as const,
    label: (
      <>
        Oldest <span className="text-sm">→</span> Newest
      </>
    ),
  },
  { value: "name-asc" as const, label: "Name A-Z" },
  { value: "name-desc" as const, label: "Name Z-A" },
];

export function ProjectSorter() {
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
        className="inline-flex items-center justify-between cursor-pointer px-4 py-2 text-2xs uppercase tracking-[2px] text-black bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 min-w-[150px]"
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
              className={`block w-full px-4 py-2 text-2xs text-left cursor-pointer hover:bg-gray-50 transition-colors duration-200 uppercase tracking-[2px] ${
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
