"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/types/shopify-v2";
import { Plus, Minus, Trash2 } from "lucide-react";
import { useState } from "react";
import { shopifyService } from "@/lib/shopify-v2";

interface CartItemProps {
  item: CartItemType;
  onUpdate: () => void;
}

export default function CartItem({ item, onUpdate }: CartItemProps) {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityChange = async (newQuantity: number) => {
    if (newQuantity === item.quantity) return;

    setIsUpdating(true);
    try {
      if (newQuantity <= 0) {
        await shopifyService.removeFromCart(item.id);
      } else {
        await shopifyService.updateCartQuantity(item.id, newQuantity);
      }
      onUpdate();
    } catch (error) {
      console.error("Error updating quantity:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRemove = async () => {
    setIsUpdating(true);
    try {
      await shopifyService.removeFromCart(item.id);
      onUpdate();
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div
      className={`flex gap-4 p-6 bg-heirloom-ivory rounded-lg shadow-sm ${
        isUpdating ? "opacity-50" : ""
      }`}
    >
      {/* Product Image */}
      <div className="relative w-24 h-24 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover rounded-md"
          sizes="96px"
        />
      </div>

      {/* Product Details */}
      <div className="flex-1">
        <h3 className="font-serif text-lg font-semibold text-heirloom-charcoal mb-1">
          {item.title}
        </h3>
        <p className="text-sm text-heirloom-charcoal/60 mb-2">
          {item.product.productType}
        </p>
        <p className="text-lg font-semibold text-heirloom-charcoal">
          ${item.price.toFixed(2)}
        </p>
      </div>

      {/* Quantity Controls */}
      <div className="flex flex-col items-center space-y-2">
        <div className="flex items-center space-x-2">
          <button
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={isUpdating || item.quantity <= 1}
            className="p-2 rounded-md border border-heirloom-charcoal/20 hover:bg-heirloom-charcoal/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-8 text-center font-medium">{item.quantity}</span>
          <button
            onClick={() => handleQuantityChange(item.quantity + 1)}
            disabled={isUpdating}
            className="p-2 rounded-md border border-heirloom-charcoal/20 hover:bg-heirloom-charcoal/5 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        <button
          onClick={handleRemove}
          disabled={isUpdating}
          className="p-2 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors disabled:opacity-50"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Item Total */}
      <div className="text-right">
        <p className="text-lg font-semibold text-heirloom-charcoal">
          ${(item.price * item.quantity).toFixed(2)}
        </p>
      </div>
    </div>
  );
}
