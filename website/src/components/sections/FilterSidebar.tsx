"use client";

import { getCategories } from "@/lib/shopify";
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
  onApplyPriceFilter: (minPrice: number | undefined, maxPrice: number | undefined) => void;
  isMobile?: boolean;
  onClose?: () => void;
  priceRange: { min: number | undefined; max: number | undefined };
}

const PRICE_GAP = 50; // Prevents slider thumbs from overlapping

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onCategoryChange,
  onApplyPriceFilter,
  isMobile = false,
  priceRange,
  onClose = () => { },
}) => {
  const [categories, setCategories] = useState<CategoryItem[]>([]);
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [localMinPrice, setLocalMinPrice] = useState<number | undefined>(filters.minPrice);
  const [localMaxPrice, setLocalMaxPrice] = useState<number | undefined>(filters.maxPrice);

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
      const category = categories.find((cat) => cat.handle === filters.category);
      if (category && !expandedCategories.includes(category.handle)) {
        setExpandedCategories((prev) => [...prev, category.handle]);
      }
    }
  }, [filters.category, categories]);

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
      prev.includes(handle) ? prev.filter((cat) => cat !== handle) : [...prev, handle]
    );
  };

  const handleCategoryClick = (category: CategoryItem) => {
    const isSameCategory = filters.category === category.handle;
    if (isSameCategory) {
      onCategoryChange("", "");
    } else {
      onCategoryChange(category.handle, "");
    }
  };

  const handleSubcategoryClick = (category: CategoryItem, subItem: { title: string }) => {
    const isSameSubcategory =
      filters.category === category.handle && filters.subcategory === subItem.title;
    if (isSameSubcategory) {
      onCategoryChange(category.handle, "");
    } else {
      onCategoryChange(category.handle, subItem.title);
    }
  };


  const safeMin = localMinPrice ?? priceRange.min ?? 0;
  const safeMax = localMaxPrice ?? priceRange.max ?? 0;
  const totalMax = priceRange.max ?? 1;

  const renderPriceSlider = () => (
    <div className="mb-12">
      <h3 className="font-semibold pb-2 mb-4 border-b-2 border-black/30">FILTER BY PRICE</h3>

      <div className="relative h-6 mt-2">
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 rounded-full transform -translate-y-1/2" />
        <div
          className="absolute top-1/2 h-1 bg-primary-pink rounded-full transform -translate-y-1/2 pointer-events-none"
          style={{
            left: `${((safeMin - (priceRange.min ?? 0)) /
                ((priceRange.max ?? 1) - (priceRange.min ?? 0))) *
              100
              }%`,
            width: `${((safeMax - safeMin) /
                ((priceRange.max ?? 1) - (priceRange.min ?? 0))) *
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
          className="range-thumb absolute w-full top-0 h-6 appearance-none bg-transparent pointer-events-auto z-20"
        />
        <input
          type="range"
          min={priceRange.min}
          max={priceRange.max}
          value={safeMax}
          onChange={handleMaxChange}
          className="range-thumb absolute w-full top-0 h-6 appearance-none bg-transparent pointer-events-auto z-10"
        />

      </div>
      <div className="flex items-center justify-between mt-4">
        <div className="text-base text-gray-500">
          <span>
            <span className="font-bold">Price: </span>₹
            {safeMin.toLocaleString("en-IN")} - ₹{safeMax.toLocaleString("en-IN")}
          </span>
        </div>

        <button
          onClick={handleApplyFilter}
          className="mt-3 px-8 rounded-md py-2 bg-primary-pink text-white hover:bg-primary-pink/80 cursor-pointer transition-colors"
        >
          APPLY
        </button>
      </div>
    </div>
  );

  const renderCategoryFilter = () => (
    <div>
      <h3 className="font-semibold pb-2 border-b-2 border-black/30 mb-4">FILTER BY CATEGORY</h3>
      <ul className="space-y-3 text-gray-700">
        {categories.map((category) => (
          <li key={category.handle}>
            <div className="flex justify-between items-center">
              <span
                onClick={() => handleCategoryClick(category)}
                className={`cursor-pointer hover:text-primary-pink transition-colors ${filters.category === category.handle && "text-primary-pink font-semibold"
                  }`}
              >
                {category.title}
              </span>
              {category.subItems.length > 0 && (
                <button
                  className="w-5 h-5 flex justify-center items-center font-bold border border-black/10 rounded-full text-sm cursor-pointer hover:bg-gray-100 transition-colors"
                  onClick={() => toggleCategory(category.handle)}
                >
                  {expandedCategories.includes(category.handle) ? "−" : "+"}
                </button>
              )}
            </div>

            {expandedCategories.includes(category.handle) && category.subItems.length > 0 && (
              <ul className="ml-4 mt-2 space-y-1 text-gray-600">
                {category.subItems.map((sub) => (
                  <li
                    key={sub.title}
                    onClick={() => handleSubcategoryClick(category, sub)}
                    className={`cursor-pointer hover:text-primary-pink transition-colors ${filters.category === category.handle &&
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
        <div className="fixed inset-0 bg-black/50 z-40 animate-fadeIn" onClick={onClose} />
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

            <div className="flex-1 overflow-y-auto px-6 py-6">
              {renderPriceSlider()}
              {renderCategoryFilter()}
            </div>

            <div className="px-6 py-4 border-t bg-gray-50">
              <button
                onClick={handleApplyFilter}
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

  return (
    <div className="min-w-[17rem]">
      {priceRange.min !== undefined && priceRange.max !== undefined && renderPriceSlider()}
      {renderCategoryFilter()}
    </div>
  );
};

export default FilterSidebar;