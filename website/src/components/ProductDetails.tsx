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
    const variant = product.variants.find(v => v.title === variantTitle);
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
        <p>
          {formatPrice(selectedVariant.price.amount, selectedVariant.price.currencyCode)}
        </p>
      </div>

      <div className="text-lg text-gray-700 mb-6 space-y-8">
        <div className="space-y-2">
          {selectedVariant.selectedOptions.map((option, index) => (
            <p key={index} className={`${option.name.toUpperCase() === "NOTE" && 'mt-8'}`}>
              {option.name.toUpperCase() !== 'NOTE' && <strong>{option.name}:</strong>}{option.value}
            </p>
          ))}
        </div>

        <p className="mt-4 text-black">{product.description}</p>
        <p>
          <strong>Availability:</strong> {selectedVariant.inventoryQuantity}
        </p>
      </div>

      {product.variants.length > 1 && (
        <div className="mb-6">
          <label htmlFor="variant" className="mr-3 font-semibold">Select Variant</label>
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

      <div className="flex flex-col sm:flex-row items-center gap-8 mt-12">
        <div className="flex items-center gap-8">
          <label htmlFor="quantity">Quantity</label>
          <select
            id="quantity"
            className="px-4 py-2"
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
          className="w-full bg-black text-white px-6 py-4 rounded-md hover:opacity-90"
          disabled={!selectedVariant.availableForSale || selectedVariant.inventoryQuantity === 0}
        >
          {selectedVariant.availableForSale ? "ADD TO CART" : "OUT OF STOCK"}
        </button>
      </div>
    </div>
  );
}
