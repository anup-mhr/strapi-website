"use client";
import { categories } from "@/constants/constants";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface Filters {
  minPrice: number;
  maxPrice: number;
  selectedCategories: string[];
  selectedSubcategories: string[];
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApplyFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onApplyFilters,
  isMobile = false,
  onClose = () => {},
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  // Prevent body scroll when mobile modal is open
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isMobile]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), filters.maxPrice - 100);
    setFilters((prev) => ({ ...prev, minPrice: value }));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), filters.minPrice + 100);
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  const toggleCategory = (name: string) => {
    setExpandedCategories((prev) =>
      prev.includes(name) ? prev.filter((cat) => cat !== name) : [...prev, name]
    );
  };

  const toggleCategoryFilter = (category: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedCategories: prev.selectedCategories.includes(category)
        ? prev.selectedCategories.filter((c) => c !== category)
        : [...prev.selectedCategories, category],
    }));
  };

  const toggleSubcategoryFilter = (subcategory: string) => {
    setFilters((prev) => ({
      ...prev,
      selectedSubcategories: prev.selectedSubcategories.includes(subcategory)
        ? prev.selectedSubcategories.filter((s) => s !== subcategory)
        : [...prev.selectedSubcategories, subcategory],
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters();
    if (isMobile) {
      onClose();
    }
  };

  // Mobile Popup View
  if (isMobile) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
          onClick={onClose}
        />

        {/* Modal */}
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
            <div className="flex justify-between items-center px-6 py-4 border-b">
              <h2 className="text-xl font-bold">Filters</h2>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-6 py-6">
              <div className="mb-8">
                <h3 className="font-semibold pb-2 mb-4 border-b-2 border-black/30">
                  FILTER BY PRICE
                </h3>

                <div className="relative h-6 mt-2">
                  <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2" />
                  <div
                    className="absolute top-1/2 h-1 bg-primary-pink rounded-full transform -translate-y-1/2"
                    style={{
                      left: `${(filters.minPrice / 10000) * 100}%`,
                      right: `${100 - (filters.maxPrice / 10000) * 100}%`,
                    }}
                  />

                  <input
                    type="range"
                    min="100"
                    max="10000"
                    value={filters.minPrice}
                    onChange={handleMinChange}
                    className="absolute top-1/2 w-full transform -translate-y-1/2 z-10 pointer-events-auto appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow"
                  />

                  <input
                    type="range"
                    min="100"
                    max="10000"
                    value={filters.maxPrice}
                    onChange={handleMaxChange}
                    className="absolute top-1/2 w-full transform -translate-y-1/2 z-10 pointer-events-auto appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow"
                  />
                </div>

                <div className="text-base text-gray-500 mt-4">
                  <span>
                    <span className="font-bold">Price: </span>₹
                    {filters.minPrice.toLocaleString("en-IN")} - ₹
                    {filters.maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="font-semibold pb-2 border-b-2 border-black/30 mb-4">
                  FILTER BY CATEGORY
                </h3>
                <ul className="space-y-3 text-gray-700">
                  {categories.map((category) => (
                    <li key={category.name}>
                      <div className="flex justify-between items-center">
                        <span
                          onClick={() => toggleCategoryFilter(category.name)}
                          className="cursor-pointer hover:text-primary-pink transition-colors"
                        >
                          {category.name}
                        </span>
                        {category.subcategories.length > 0 && (
                          <button
                            className="w-5 h-5 flex justify-center text-black/30 items-center font-bold border-1 border-black/10 rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleCategory(category.name)}
                          >
                            {expandedCategories.includes(category.name)
                              ? "−"
                              : "+"}
                          </button>
                        )}
                      </div>

                      {expandedCategories.includes(category.name) &&
                        category.subcategories.length > 0 && (
                          <ul className="ml-4 mt-2 space-y-1 text-gray-600">
                            {category.subcategories.map((sub) => (
                              <li
                                key={sub}
                                onClick={() => toggleSubcategoryFilter(sub)}
                                className="cursor-pointer hover:text-primary-pink transition-colors"
                              >
                                {sub}
                              </li>
                            ))}
                          </ul>
                        )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50">
              <button
                onClick={handleApplyFilters}
                className="w-full rounded-md py-3 bg-primary-pink text-white font-semibold hover:bg-primary-pink/90 transition-colors"
              >
                APPLY FILTER
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  // Desktop Sidebar View
  return (
    <div className="min-w-[17rem]">
      <div className="mb-12">
        <h3 className="font-semibold pb-2 mb-4 border-b-2 border-black/30">
          FILTER BY PRICE
        </h3>

        <div className="relative h-6 mt-2">
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2" />
          <div
            className="absolute top-1/2 h-1 bg-primary-pink rounded-full transform -translate-y-1/2"
            style={{
              left: `${(filters.minPrice / 10000) * 100}%`,
              right: `${100 - (filters.maxPrice / 10000) * 100}%`,
            }}
          />

          <input
            type="range"
            min="100"
            max="10000"
            value={filters.minPrice}
            onChange={handleMinChange}
            className="absolute top-1/2 w-full transform -translate-y-1/2 z-10 pointer-events-auto appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow"
          />

          <input
            type="range"
            min="100"
            max="10000"
            value={filters.maxPrice}
            onChange={handleMaxChange}
            className="absolute top-1/2 w-full transform -translate-y-1/2 z-10 pointer-events-auto appearance-none bg-transparent [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-black [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:shadow [&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-black [&::-moz-range-thumb]:cursor-pointer [&::-moz-range-thumb]:shadow"
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-base text-gray-500 mt-2">
            <span>
              <span className="font-bold">Price: </span>₹
              {filters.minPrice.toLocaleString("en-IN")} - ₹
              {filters.maxPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={onApplyFilters}
            className="mt-3 px-12 rounded-md py-2 bg-primary-pink text-white hover:bg-primary-pink/80 cursor-pointer"
          >
            FILTER
          </button>
        </div>
      </div>

      <div>
        <h3 className="font-semibold pb-2 border-b-2 border-black/30 mb-4">
          FILTER BY CATEGORY
        </h3>
        <ul className="space-y-3 text-gray-700">
          {categories.map((category) => (
            <li key={category.name}>
              <div className="flex justify-between items-center">
                <span
                  onClick={() => toggleCategoryFilter(category.name)}
                  className="cursor-pointer"
                >
                  {category.name}
                </span>
                {category.subcategories.length > 0 && (
                  <button
                    className="w-5 h-5 flex justify-center text-black/30 items-center font-bold border-1 border-black/10 rounded-full text-sm cursor-pointer"
                    onClick={() => toggleCategory(category.name)}
                  >
                    {expandedCategories.includes(category.name) ? "−" : "+"}
                  </button>
                )}
              </div>

              {expandedCategories.includes(category.name) &&
                category.subcategories.length > 0 && (
                  <ul className="ml-4 mt-2 space-y-1 text-gray-600">
                    {category.subcategories.map((sub) => (
                      <li
                        key={sub}
                        onClick={() => toggleSubcategoryFilter(sub)}
                        className="cursor-pointer"
                      >
                        {sub}
                      </li>
                    ))}
                  </ul>
                )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FilterSidebar;
