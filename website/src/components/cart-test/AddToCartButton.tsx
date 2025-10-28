"use client";
import { useState } from "react";
import { useCart } from "./CartProvider";
import { ShoppingCart } from "lucide-react";

export default function AddToCartButton({ variantId, quantity = 1 }: any) {
  const { addToCart, isLoading } = useCart();
  const [success, setSuccess] = useState(false);

  async function handleAddToCart() {
    try {
      await addToCart(variantId, quantity);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2000);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  }

  return (
    <button
      onClick={handleAddToCart}
      disabled={isLoading}
      className="flex w-full items-center justify-center bg-black gap-3 sm:gap-4 md:gap-6 text-white px-4 sm:px-5 md:px-6 py-2.5 sm:py-3 md:py-3.5 rounded-md text-sm sm:text-base font-medium hover:bg-gray-900 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 active:scale-95"
    >
      <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
      <span className="whitespace-nowrap">
        {success ? "Added!" : isLoading ? "Adding..." : "ADD TO CART"}
      </span>
    </button>
  );
}
