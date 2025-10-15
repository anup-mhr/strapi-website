"use client";

import { useState } from "react";
import { formatPrice } from "@/lib/helper";

interface ProductDetailsProps {
  product: {
    title: string;
    description: string;
    variants: {
      title: string;
      availableForSale: boolean;
      inventoryQuantity: number;
      price: { amount: string; currencyCode: string };
      selectedOptions: { name: string; value: string }[];
    }[];
  };
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variantTitle: string) => {
    const variant = product.variants.find((v) => v.title === variantTitle);
    if (variant) {
      setSelectedVariant(variant);
      setQuantity(1);
    }
  };

  return (
    <div className="max-w-xl">
      <div className="flex flex-col sm:flex-row justify-between mb-6 sm:mb-8 pb-4 sm:pb-0 border-b-2 border-black/30">
        <h2 className="text-lg sm:text-xl md:text-2xl font-bold uppercase tracking-wide sm:tracking-widest mb-2 sm:mb-0">
          {product.title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl mb-2 sm:mb-4">
          {formatPrice(
            selectedVariant.price.amount,
            selectedVariant.price.currencyCode
          )}
        </p>
      </div>

      <div className="text-sm sm:text-base text-gray-700 mb-6 space-y-6 sm:space-y-8">
        <div className="space-y-2">
          {selectedVariant.selectedOptions.map((option, index) => (
            <p
              key={index}
              className={`text-sm sm:text-base ${
                option.name.toUpperCase() === "NOTE" && "mt-6 sm:mt-8"
              }`}
            >
              {option.name.toUpperCase() !== "NOTE" && (
                <strong>{option.name}:</strong>
              )}
              {option.value}
            </p>
          ))}
        </div>
        <p className="mt-4 text-sm sm:text-base text-gray-700">
          {product.description}
        </p>
        <p className="text-sm sm:text-base">
          Availability:{" "}
          <span className="text-primary-pink font-semibold">
            {selectedVariant.inventoryQuantity}
          </span>{" "}
          in stock
        </p>
      </div>

      {product.variants.length > 1 && (
        <div className="mb-6">
          <label
            htmlFor="variant"
            className="mr-3 text-sm sm:text-base font-semibold"
          >
            Select Variant
          </label>
          <select
            id="variant"
            className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border rounded"
            value={selectedVariant.title}
            onChange={(e) => handleVariantChange(e.target.value)}
          >
            {product.variants.map((variant, idx) => (
              <option key={idx} value={variant.title}>
                {variant.title}
              </option>
            ))}
          </select>
        </div>
      )}

      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 md:gap-8 mt-8 sm:mt-15 xl:mt-44">
        {selectedVariant.inventoryQuantity > 0 && (
          <div className="flex items-center gap-2 sm:gap-4 md:gap-8">
            <label
              htmlFor="quantity"
              className="text-sm sm:text-base text-gray-700"
            >
              Quantity
            </label>
            <select
              id="quantity"
              className="px-3 sm:px-4 py-1.5 sm:py-2 text-sm sm:text-base border border-primary-pink/30"
              value={quantity}
              onChange={(e) => setQuantity(Number(e.target.value))}
            >
              {Array.from(
                { length: selectedVariant.inventoryQuantity ?? 1 },
                (_, i) => i + 1
              ).map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
        )}
        <button
          className="w-full bg-black text-white px-4 sm:px-6 py-2.5 sm:py-3 text-sm sm:text-base font-semibold rounded-md cursor-pointer hover:opacity-90 disabled:opacity-90 disabled:cursor-not-allowed transition-opacity"
          disabled={
            !selectedVariant.availableForSale ||
            selectedVariant.inventoryQuantity === 0
          }
        >
          {selectedVariant.availableForSale &&
          selectedVariant.inventoryQuantity !== 0
            ? "ADD TO CART"
            : "OUT OF STOCK"}
        </button>
      </div>
    </div>
  );
}
