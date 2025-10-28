"use client";

import { formatPrice } from "@/lib/helper";
import { ShopifyProduct } from "@/types/shopify";
import { useState } from "react";
import AddToCartButton from "./cart-test/AddToCartButton";

export default function ProductDetails({
  product,
}: {
  product: ShopifyProduct;
}) {
  const [selectedVariant, setSelectedVariant] = useState(product.variants[0]);
  const [quantity, setQuantity] = useState(1);

  const handleVariantChange = (variantTitle: string) => {
    const variant = product.variants.find((v) => v.title === variantTitle);
    if (variant) {
      setSelectedVariant(variant);
      setQuantity(1);
    }
  };

  const price = Number(selectedVariant.price.amount);
  const compareAtPrice = Number(selectedVariant.compareAtPrice?.amount ?? 0);
  const isOnSale = compareAtPrice > 0 && compareAtPrice !== price;

  return (
    <div className="max-w-xl w-full">
      <div className="flex justify-between items-start mb-8 border-b-2 border-black/30">
        <h2 className="text-xl font-bold uppercase tracking-widest">
          {product.title}
        </h2>
        <div className="text-lg mb-4 flex flex-col items-end">
          {isOnSale ? (
            <div className="flex gap-6 items-center">
              <span className="text-gray-500 line-through text-base">
                {formatPrice(
                  compareAtPrice,
                  selectedVariant.price.currencyCode
                )}
              </span>
              <span className="font-semibold text-lg">
                {formatPrice(price, selectedVariant.price.currencyCode)}
              </span>
            </div>
          ) : (
            <span>
              {formatPrice(price, selectedVariant.price.currencyCode)}
            </span>
          )}
        </div>
      </div>

      {/* Product Details */}
      <div className="text-base text-gray-700 mb-6 space-y-8">
        <div className="space-y-2">
          {selectedVariant.selectedOptions.map((option, index) => (
            <p
              key={index}
              className={`${option.name.toUpperCase() === "NOTE" && "mt-8"}`}
            >
              {option.name.toUpperCase() !== "NOTE" && (
                <strong>{option.name}: </strong>
              )}
              {option.value}
            </p>
          ))}
        </div>
        <div
          className="mt-4 text-gray-700"
          dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
        />
        <p>
          Availability:{" "}
          <span className="text-primary-pink">
            {selectedVariant.quantityAvailable}
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
              { length: selectedVariant.quantityAvailable ?? 1 },
              (_, i) => i + 1
            ).map((q) => (
              <option key={q} value={q}>
                {q}
              </option>
            ))}
          </select>
        </div>

        {selectedVariant.availableForSale ? (
          <AddToCartButton variantId={selectedVariant.id} quantity={quantity} />
        ) : (
          <button className="flex w-full items-center justify-center bg-black gap-3 sm:gap-4 md:gap-6 text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-md text-sm sm:text-base font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95">
            OUT OF STOCK
          </button>
        )}
      </div>
    </div>
  );
}
