"use client";

import { formatPrice } from "@/lib/helper";
import { shopifyService } from "@/lib/shopify-v2";
import { CartItem as CartItemType } from "@/types/shopify-v2";
import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

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
    <div className="flex items-center gap-4 md:gap-6 border-b border-black/10 py-4">
      {/* Product Image */}
      <div className="relative w-40 md:w-48 h-60 flex-shrink-0">
        <Image
          src={item.image || ""}
          alt={item.altText || item.title}
          fill
          className="object-cover object-center"
        />
      </div>

      {/* Product Info */}
      <div className="flex flex-col gap-4 w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-4">
          <h3 className="text-sm md:text-base uppercase">{item.title}</h3>
          <p className="text-sm md:text-base font-semibold">
            {formatPrice(item.price * item.quantity, item.currencyCode)}
          </p>
        </div>

        {/* Selected Options */}
        <div className="text-xs md:text-sm text-gray-700 space-y-2">
          {item.selectedOptions?.map((option) => option.name !== "Note" && (
            <p key={option.name}>
              {option.name}: {option.value}
            </p>
          ))}
        </div>

        {/* Quantity Controls and Remove */}
        <div className="flex justify-between items-center mt-2">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-6 text-sm md:text-base text-center">
              {item.quantity}
            </span>
            <button
              onClick={() => handleQuantityChange(item.quantity + 1)}
              disabled={isUpdating}
              className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
          <button
            onClick={handleRemove}
            disabled={isUpdating}
            className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
