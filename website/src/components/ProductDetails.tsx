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
      <div className="flex justify-between mb-8 border-b-2 border-black/30">
        <h2 className="text-xl font-bold uppercase tracking-widest">
          {product.title}
        </h2>
        <p className="text-lg mb-4">
          {formatPrice(
            selectedVariant.price.amount,
            selectedVariant.price.currencyCode
          )}
        </p>
      </div>

      <div className="text-base text-gray-700 mb-6 space-y-8">
        <div className="space-y-2">
          {selectedVariant.selectedOptions.map((option, index) => (
            <p key={index}>
              {option.name}: {option.value}
            </p>
          ))}
        </div>
        <p className="mt-4 text-gray-700">{product.description}</p>
        <p>
          Availability:{" "}
          <span className="text-primary-pink">
            {selectedVariant.inventoryQuantity}
          </span>{" "}
          in stock
        </p>
      </div>

      {product.variants.length > 1 && (
        <div className="mb-6">
          <label htmlFor="variant" className="mr-3 font-semibold">
            Select Variant
          </label>
          <select
            id="variant"
            className="px-4 py-2 border rounded"
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

      <div className="flex items-center gap-4 md:gap-8 mt-15 xl:mt-44">
        <div className="flex items-center gap-2 md:gap-8">
          <label htmlFor="quantity" className="text-gray-700">
            Quantity
          </label>
          <select
            id="quantity"
            className="px-4 py-2 border border-primary-pink/30"
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

        <button
          className="w-full bg-black text-white px-6 py-3 rounded-md hover:opacity-90"
          disabled={
            !selectedVariant.availableForSale ||
            selectedVariant.inventoryQuantity === 0
          }
        >
          {selectedVariant.availableForSale ? "ADD TO CART" : "OUT OF STOCK"}
        </button>
      </div>
    </div>
  );
}
