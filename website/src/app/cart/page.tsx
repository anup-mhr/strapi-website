"use client";

import { useCart } from "@/components/cart-test/CartProvider";
import CartItem from "@/components/CartItem";
import Loader from "@/components/common/Loader";
import { formatPrice } from "@/lib/helper";
import { shopifyService } from "@/lib/shopify-v2";
import { Cart as CartType } from "@/types/shopify-v2";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartPage() {
  const { refreshCart } = useCart();
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await shopifyService.getCart();
      await refreshCart();
      setCart(cartData);
      console.log(cartData);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!cart || cart.lineItems.length === 0) return;

    setIsCheckingOut(true);
    setCheckoutError(null);

    try {
      const lines = cart.lineItems.map((item) => ({
        merchandiseId: item.merchandiseId,
        quantity: item.quantity,
      }));

      const response = await fetch("/api/cart/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });

      const data = await response.json();
      if (response.ok && data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        setCheckoutError(data.error || "Failed to create checkout");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      setCheckoutError("An unexpected error occurred during checkout.");
    } finally {
      setIsCheckingOut(false);
    }
  };
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (!cart || cart.lineItems.length === 0) {
    return (
      <div className="pt-15">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="w-full space-y-6">
            <div className="flex items-center justify-between w-full mb-8">
              <h1 className="text-center text-primary italic md:text-left text-base md:text-lg font-semibold w-full mb-2">
                Shopping Cart
              </h1>
            </div>
            <div className="flex flex-col items-center mt-12">
              <div className="mb-6 text-sm">Your cart is empty.</div>
              <Link href="/shop" className="underline text-xs">
                Explore the heirloom collections.
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // const shippingCost = cart.totalPrice > 100 ? 0 : 15;
  // const tax = cart.totalPrice * 0.08;
  // const total = cart.totalPrice + shippingCost + tax;
  const total = cart.totalPrice;

  return (
    <div className="pt-15">
      <div className="flex flex-col lg:flex-row justify-between gap-18">
        {/* Cart Items */}
        <div className="w-full space-y-6">
          <div className="flex items-center justify-between w-full mb-8">
            <h1 className="text-center text-primary italic md:text-left text-base md:text-lg font-semibold w-full mb-2">
              Shopping Cart
            </h1>
          </div>
          {cart.lineItems.map((item) => (
            <CartItem key={item.id} item={item} onUpdate={loadCart} />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="self-end md:w-[25rem]">
          {checkoutError && (
            <p className="text-red-600 text-sm mb-2">{checkoutError}</p>
          )}
          <p className="text-xs text-black/60 mb-2">
            Tax calculated at checkout.
          </p>
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg md:text-xl font-semibold">Total</span>
            <span className="font-semibold text-base md:text-lg">
              {formatPrice(total, "INR")}
            </span>
          </div>
          <button
            onClick={handleCheckout}
            disabled={isCheckingOut}
            className="w-full bg-black text-white py-3 cursor-pointer hover:bg-black/80 font-semibold text-sm md:text-base transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-6"
          >
            {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
          </button>

          <div className="py-6 text-xs md:text-sm border-b border-black/10">
            <p className="mb-3">Shipping</p>
            <p>
              Complimentary shipping on all orders worldwide. Please visit our{" "}
              <Link href="/shipping-policy" className="underline">
                Shipping Policy
              </Link>{" "}
              for more information.
            </p>
          </div>
          <div className="py-6 text-xs md:text-sm border-b border-black/10">
            <p className="mb-3">Contact Us</p>
            <p>
              Email us at{" "}
              <Link href="mailto:info@heirloomnaga.com" className="underline">
                info@heirloomnaga.com
              </Link>
            </p>
            <p>Customer Service Hours: Monday to Friday 9am - 6pm EST</p>
          </div>
          <div className="py-6 text-xs md:text-sm">
            <p className="mb-3">Return Policy</p>
            <p>
              Item purchased from khaite.com can be returned for a refund at no
              charge, online or in store within 14 days from original ship date.
              Please visit our{" "}
              <Link href="/return-policy" className="underline">
                Return Policy
              </Link>{" "}
              page for more information.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
