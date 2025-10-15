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
    <div className="flex items-center gap-4 md:gap-6">
      <div className="relative w-40 md:w-48 h-60 flex-shrink-0">
        <Image
          src={item.image}
          alt={item.title}
          fill
          className="object-cover object-center"
        />
      </div>
      <div className="flex flex-col gap-6 w-full">
        <div className="flex flex-col md:flex-row justify-between md:items-center md:gap-4">
          <h3 className="text-sm md:text-base uppercase">{item.title}</h3>
          <p className="text-sm md:text-base">
            {formatPrice(item.price * item.quantity, "INR")}
          </p>
        </div>
        <div className="text-xs md:text-sm">
          <p className="mb-1">Size: 20 x 22</p>
          <p>Materials: Cotton</p>
        </div>
        <div className="flex justify-between">
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handleQuantityChange(item.quantity - 1)}
              disabled={isUpdating || item.quantity <= 1}
              className="p-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-3 h-3" />
            </button>
            <span className="w-4 text-sm md:text-base text-center">
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
