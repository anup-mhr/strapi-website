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
      className="flex items-center gap-2 bg-black text-white px-6 py-3 rounded-lg hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <ShoppingCart size={20} />
      {success ? "Added!" : isLoading ? "Adding..." : "Add to Cart"}
    </button>
  );
}
