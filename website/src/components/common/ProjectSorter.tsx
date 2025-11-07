"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { shopSortOptions } from "@/constants/sorter";

interface ProjectSorterProps {
  sortBy: string | null;
  setSortBy: (value: string) => void;
  className?: string;
}

export function ProjectSorter({
  sortBy,
  setSortBy,
  className,
}: ProjectSorterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const effectiveSortBy = sortBy;

  const currentLabel = shopSortOptions.find(
    (opt) => opt.value === effectiveSortBy
  )?.label;

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setIsOpen(false);
  };

  return (
    <div
      className={cn(
        "relative inline-block w-full md:min-w-48 text-left",
        className
      )}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex w-full items-center justify-between cursor-pointer px-4 py-2 uppercase text-xs text-black tracking-normal bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200 min-w-[150px]"
      >
        <span>{currentLabel}</span>
        <ChevronDown
          className={`ml-2 h-4 w-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""
            }`}
        />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-full bg-white border border-gray-200 shadow-lg z-30">
          {shopSortOptions.map((option) => (
            <button
              key={option.value}
              onClick={() => handleSortChange(option.value)}
              className={`block w-full px-4 py-2 text-xs text-left cursor-pointer hover:bg-gray-50 transition-colors duration-200 uppercase tracking-normal ${effectiveSortBy === option.value
                ? "bg-gray-100 text-black font-semibold"
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
