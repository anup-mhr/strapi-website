"use client";

import { CategoryItem, getCategories } from "@/lib/shopify";
import { X } from "lucide-react";
import React, { useEffect, useState } from "react";

export interface Filters {
  minPrice: number;
  maxPrice: number;
  category?: string;
  subcategory?: string;
  categoryHandle?: string;
}

interface FilterSidebarProps {
  filters: Filters;
  setFilters: React.Dispatch<React.SetStateAction<Filters>>;
  onApplyFilters: () => void;
  isMobile?: boolean;
  onClose?: () => void;
  handleCategoryClick?: (category: string) => void;
  handleSubcategoryClick?: (collection: string, subcategory: string) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  setFilters,
  onApplyFilters,
  isMobile = false,
  handleCategoryClick = () => {},
  handleSubcategoryClick = () => {},
  onClose = () => {},
}) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);

  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isMobile]);

  useEffect(() => {
    const fetchCategories = async () => {
      const rawCategories = await getCategories();
      setCategories(rawCategories);
    };
    fetchCategories();
  }, []);

  // Price range handlers
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.min(Number(e.target.value), filters.maxPrice - 100);
    setFilters((prev) => ({ ...prev, minPrice: value }));
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Math.max(Number(e.target.value), filters.minPrice + 100);
    setFilters((prev) => ({ ...prev, maxPrice: value }));
  };

  // Expand/collapse category
  const toggleCategory = (title: string) => {
    setExpandedCategories((prev) =>
      prev.includes(title)
        ? prev.filter((cat) => cat !== title)
        : [...prev, title]
    );
  };

  const handleApplyFilters = () => {
    onApplyFilters();
    if (isMobile) onClose();
  };

  if (isMobile) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
          onClick={onClose}
        />

        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-lg shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden flex flex-col animate-slideUp">
            <div className="flex justify-between items-center px-4 sm:px-6 py-3 sm:py-4 border-b">
              <h2 className="text-lg sm:text-xl font-bold">Filters</h2>
              <button
                onClick={onClose}
                className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>

            {/* Content */}
            <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
              <div className="mb-6 sm:mb-8">
                <h3 className="text-sm sm:text-base font-semibold pb-2 mb-3 sm:mb-4 border-b-2 border-black/30">
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
                    className={`custom-slider-thumb ${
                      filters.minPrice >= filters.maxPrice - 200
                        ? "z-20"
                        : "z-10"
                    }`}
                  />

                  <input
                    type="range"
                    min="100"
                    max="10000"
                    value={filters.maxPrice}
                    onChange={handleMaxChange}
                    className="custom-slider-thumb z-10"
                  />
                </div>

                <div className="text-sm sm:text-base text-gray-500 mt-3 sm:mt-4">
                  <span>
                    <span className="font-bold">Price: </span>₹
                    {filters.minPrice.toLocaleString("en-IN")} - ₹
                    {filters.maxPrice.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Category Filter */}
              <div>
                <h3 className="text-sm sm:text-base font-semibold pb-2 border-b-2 border-black/30 mb-3 sm:mb-4">
                  FILTER BY CATEGORY
                </h3>
                <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
                  {categories.map((category) => (
                    <li key={category.title}>
                      <div className="flex justify-between items-center">
                        <span
                          onClick={() => {
                            handleCategoryClick(category.handle);
                            setFilters((prev) => ({
                              ...prev,
                              category: category.title,
                              subcategory: "",
                              categoryHandle: category.handle,
                            }));
                          }}
                          className={`cursor-pointer hover:text-primary-pink transition-colors ${
                            filters.category === category.title &&
                            "text-primary-pink"
                          }`}
                        >
                          {category.title}
                        </span>
                        {category.subItems.length > 0 && (
                          <button
                            className="w-5 h-5 flex justify-center items-center font-bold border border-black/10 rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                            onClick={() => toggleCategory(category.title)}
                          >
                            {expandedCategories.includes(category.title)
                              ? "−"
                              : "+"}
                          </button>
                        )}
                      </div>

                      {expandedCategories.includes(category.title) &&
                        category.subItems.length > 0 && (
                          <ul className="ml-3 sm:ml-4 mt-1.5 sm:mt-2 space-y-1 text-xs sm:text-sm text-gray-600">
                            {category.subItems.map((sub) => (
                              <li
                                key={sub.title}
                                onClick={() => {
                                  handleSubcategoryClick(
                                    sub.title,
                                    category.handle
                                  );
                                  setFilters((prev) => ({
                                    ...prev,
                                    category: category.title,
                                    subcategory: sub.title,
                                    categoryHandle: category.handle,
                                  }));
                                }}
                                className={`cursor-pointer hover:text-primary-pink transition-colors ${
                                  filters.subcategory === sub.title &&
                                  "text-primary-pink"
                                }`}
                              >
                                {sub.title}
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
            <div className="px-4 sm:px-6 py-3 sm:py-4 border-t bg-gray-50">
              <button
                onClick={handleApplyFilters}
                className="w-full rounded-md py-2.5 sm:py-3 text-sm sm:text-base bg-primary-pink text-white font-semibold hover:bg-primary-pink/90 transition-colors"
              >
                APPLY FILTER
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-w-[15rem] sm:min-w-[17rem]">
      <div className="mb-8 sm:mb-12">
        <h3 className="text-sm sm:text-base font-semibold pb-2 mb-3 sm:mb-4 border-b-2 border-black/30">
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
            className="range-thumb absolute h-full top-1/2 w-full transform -translate-y-1/2 z-10"
          />
          <input
            type="range"
            min="100"
            max="10000"
            value={filters.maxPrice}
            onChange={handleMaxChange}
            className="range-thumb absolute h-full top-1/2 w-full transform -translate-y-1/2 z-10"
          />
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-0">
          <div className="text-sm sm:text-base text-gray-500 mt-2">
            <span>
              <span className="font-bold">Price: </span>₹
              {filters.minPrice.toLocaleString("en-IN")} - ₹
              {filters.maxPrice.toLocaleString("en-IN")}
            </span>
          </div>

          <button
            onClick={onApplyFilters}
            className="mt-3 px-8 sm:px-12 rounded-md py-2 text-sm sm:text-base bg-primary-pink text-white hover:bg-primary-pink/80 cursor-pointer"
          >
            FILTER
          </button>
        </div>
      </div>

      {/* Category Filter */}
      <div>
        <h3 className="text-sm sm:text-base font-semibold pb-2 border-b-2 border-black/30 mb-3 sm:mb-4">
          FILTER BY CATEGORY
        </h3>
        <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-gray-700">
          {categories.map((category) => (
            <li key={category.title}>
              <div className="flex justify-between items-center">
                <span
                  onClick={() =>
                    setFilters((prev) => ({
                      ...prev,
                      category: category.title,
                      subcategory: "",
                      categoryHandle: category.handle,
                    }))
                  }
                  className={`cursor-pointer hover:text-primary-pink transition-colors ${
                    filters.category === category.title && "text-primary-pink"
                  } `}
                >
                  {category.title}
                </span>
                {category.subItems.length > 0 && (
                  <button
                    className="w-5 h-5 flex justify-center text-black/30 items-center font-bold border-1 border-black/10 rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                    onClick={() => toggleCategory(category.title)}
                  >
                    {expandedCategories.includes(category.title) ? "−" : "+"}
                  </button>
                )}
              </div>

              {expandedCategories.includes(category.title) &&
                category.subItems.length > 0 && (
                  <ul className="ml-3 sm:ml-4 mt-1.5 sm:mt-2 space-y-1 text-xs sm:text-sm text-gray-600">
                    {category.subItems.map((sub) => (
                      <li
                        key={sub.title}
                        onClick={() =>
                          setFilters((prev) => ({
                            ...prev,
                            category: category.title,
                            subcategory: sub.title,
                            categoryHandle: category.handle,
                          }))
                        }
                        className={`cursor-pointer hover:text-primary-pink transition-colors ${
                          filters.subcategory === sub.title &&
                          "text-primary-pink"
                        } `}
                      >
                        {sub.title}
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
