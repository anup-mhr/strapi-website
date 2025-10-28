"use client";

import { X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { CategoryItem } from "@/lib/shopify";

export interface Filters {
  minPrice: number | undefined;
  maxPrice: number | undefined;
  subcategory?: string;
  category?: string;
}

interface FilterSidebarProps {
  filters: Filters;
  onCategoryChange: (category: string, subcategory: string) => void;
  onApplyPriceFilter: (
    minPrice: number | undefined,
    maxPrice: number | undefined
  ) => void;
  isMobile?: boolean;
  onClose?: () => void;
  priceRange: { min: number | undefined; max: number | undefined };
  isLoading?: boolean;
  categories: CategoryItem[];
}

const PRICE_GAP = 50; // Prevents slider thumbs from overlapping

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onCategoryChange,
  onApplyPriceFilter,
  isMobile = false,
  priceRange,
  onClose = () => {},
  isLoading,
  categories,
}) => {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [localMinPrice, setLocalMinPrice] = useState<number | undefined>(
    filters.minPrice
  );
  const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>(
    filters.maxPrice
  );
  const [displayRange, setDisplayRange] = useState(priceRange);

  useEffect(() => {
    if (!isLoading) {
      setDisplayRange(priceRange);
    }
  }, [priceRange, isLoading]);
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = "unset";
      };
    }
  }, [isMobile]);

  useEffect(() => {
    setLocalMinPrice(filters.minPrice);
    setLocalMaxPrice(filters.maxPrice);
  }, [filters.minPrice, filters.maxPrice]);

  useEffect(() => {
    if (priceRange.min !== undefined && priceRange.max !== undefined) {
      setLocalMinPrice(priceRange.min);
      setLocalMaxPrice(priceRange.max);
    }
  }, [priceRange.min, priceRange.max]);

  useEffect(() => {
    if (filters.category) {
      const category = categories.find(
        (cat) => cat.handle === filters.category
      );
      if (category && !expandedCategories.includes(category.handle)) {
        setExpandedCategories((prev) => [...prev, category.handle]);
      }
    }
  }, [filters.category, categories, expandedCategories]);

  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (priceRange.min !== undefined && priceRange.max !== undefined) {
      if (localMaxPrice && newMin > localMaxPrice - PRICE_GAP) {
        setLocalMinPrice(localMaxPrice - PRICE_GAP);
      } else {
        setLocalMinPrice(newMin);
      }
    }
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (priceRange.min !== undefined && priceRange.max !== undefined) {
      if (localMinPrice && newMax < localMinPrice + PRICE_GAP) {
        setLocalMaxPrice(localMinPrice + PRICE_GAP);
      } else {
        setLocalMaxPrice(newMax);
      }
    }
  };

  const handleApplyFilter = () => {
    onApplyPriceFilter(localMinPrice, localMaxPrice);
  };

  const toggleCategory = (handle: string) => {
    setExpandedCategories((prev) =>
      prev.includes(handle)
        ? prev.filter((cat) => cat !== handle)
        : [...prev, handle]
    );
  };

  const handleCategoryClick = (category: CategoryItem) => {
    const isSameCategory = filters.category === category.handle;
    if (isSameCategory) {
      onCategoryChange("", "");
    } else {
      onCategoryChange(category.handle, "");
    }
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleSubcategoryClick = (
    category: CategoryItem,
    subItem: { title: string }
  ) => {
    const isSameSubcategory =
      filters.category === category.handle &&
      filters.subcategory === subItem.title;
    if (isSameSubcategory) {
      onCategoryChange(category.handle, "");
    } else {
      onCategoryChange(category.handle, subItem.title);
    }
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const safeMin = localMinPrice ?? priceRange.min ?? 0;
  const safeMax = localMaxPrice ?? priceRange.max ?? 0;

  const handleRangeBarClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (priceRange.min === undefined || priceRange.max === undefined) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = clickX / rect.width;
    const clickedValue = Math.round(
      priceRange.min + percentage * (priceRange.max - priceRange.min)
    );

    // Determine which thumb is closer to the clicked position
    const distanceToMin = Math.abs(clickedValue - safeMin);
    const distanceToMax = Math.abs(clickedValue - safeMax);

    if (distanceToMin < distanceToMax) {
      const newMin = Math.min(clickedValue, safeMax - PRICE_GAP);
      setLocalMinPrice(Math.max(priceRange.min, Math.round(newMin)));
    } else {
      const newMax = Math.max(clickedValue, safeMin + PRICE_GAP);
      setLocalMaxPrice(Math.min(priceRange.max, Math.round(newMax)));
    }
  };

  const renderPriceSlider = () => (
    <div className="mb-8 sm:mb-10 lg:mb-12">
      <h3 className="text-sm sm:text-base font-semibold pb-2 mb-3 sm:mb-4 border-b-2 border-black/30">
        FILTER BY PRICE
      </h3>

      <div className="relative h-5 sm:h-6 mt-2">
        <div
          className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2 cursor-pointer"
          onClick={handleRangeBarClick}
        />
        <div
          className="absolute top-1/2 h-1 bg-primary-pink rounded-full transform -translate-y-1/2 pointer-events-none"
          style={{
            left: `${
              ((safeMin - (displayRange.min ?? 0)) /
                ((displayRange.max ?? 1) - (displayRange.min ?? 0))) *
              100
            }%`,
            width: `${
              ((safeMax - safeMin) /
                ((displayRange.max ?? 1) - (displayRange.min ?? 0))) *
              100
            }%`,
          }}
        />

        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={safeMin}
          onChange={handleMinChange}
          className="range-thumb absolute w-full top-0 h-5 sm:h-6 appearance-none bg-transparent pointer-events-auto z-20"
        />
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={safeMax}
          onChange={handleMaxChange}
          className="range-thumb absolute w-full top-0 h-5 sm:h-6 appearance-none bg-transparent pointer-events-auto z-10"
        />
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mt-3 sm:mt-4">
        <div className="text-xs sm:text-sm lg:text-base text-gray-500">
          <span>
            <span className="font-bold">Price: </span>₹
            {safeMin.toLocaleString("en-IN")} - ₹
            {safeMax.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={handleApplyFilter}
          className="w-full sm:w-auto px-6 sm:px-8 rounded-md py-2 text-xs sm:text-sm font-medium bg-primary-pink text-white hover:bg-primary-pink/80 cursor-pointer transition-colors"
        >
          APPLY
        </button>
      </div>
    </div>
  );

  const renderCategoryFilter = () => (
    <div>
      <h3 className="text-sm sm:text-base font-semibold pb-2 border-b-2 border-black/30 mb-3 sm:mb-4">
        FILTER BY CATEGORY
      </h3>
      <ul className="space-y-2 sm:space-y-3 text-gray-700">
        {categories.map((category) => (
          <li key={category.handle}>
            <div className="flex justify-between items-center">
              <span
                onClick={() => handleCategoryClick(category)}
                className={`text-sm sm:text-base cursor-pointer hover:text-primary-pink transition-colors ${
                  filters.category === category.handle &&
                  "text-primary-pink font-semibold"
                }`}
              >
                {category.title}
              </span>
              {category.subItems.length > 0 && (
                <button
                  className="w-5 h-5 sm:w-6 sm:h-6 flex justify-center items-center font-bold border border-black/10 rounded-full text-xs sm:text-sm cursor-pointer hover:bg-gray-100 transition-colors shrink-0"
                  onClick={() => toggleCategory(category.handle)}
                >
                  {expandedCategories.includes(category.handle) ? "−" : "+"}
                </button>
              )}
            </div>

            {expandedCategories.includes(category.handle) &&
              category.subItems.length > 0 && (
                <ul className="ml-3 sm:ml-4 mt-1.5 sm:mt-2 space-y-1 text-gray-600">
                  {category.subItems.map((sub) => (
                    <li
                      key={sub.title}
                      onClick={() => handleSubcategoryClick(category, sub)}
                      className={`text-xs sm:text-sm cursor-pointer hover:text-primary-pink transition-colors ${
                        filters.category === category.handle &&
                        filters.subcategory === sub.title &&
                        "text-primary-pink font-semibold"
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
  );

  if (isMobile) {
    return (
      <>
        <div
          className="fixed inset-0 bg-black/50 z-40 animate-fadeIn"
          onClick={onClose}
        />
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
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

            <div className="flex-1 overflow-y-auto max-h-[calc(90vh-200px)] px-4 sm:px-6 py-4 sm:py-6">
              {priceRange.min !== undefined &&
                priceRange.max !== undefined &&
                priceRange.min !== priceRange.max &&
                renderPriceSlider()}
              {renderCategoryFilter()}
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div className="min-w-68">
      {priceRange.min !== undefined &&
        priceRange.max !== undefined &&
        priceRange.min !== priceRange.max &&
        renderPriceSlider()}
      {renderCategoryFilter()}
    </div>
  );
};

export default FilterSidebar;
