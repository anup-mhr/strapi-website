"use client";

import CartItem from "@/components/CartItem";
import { shopifyService } from "@/lib/shopify-v2";
import { Cart as CartType } from "@/types/shopify-v2";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  ShoppingBag,
  Truck,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function CartPage() {
  const [cart, setCart] = useState<CartType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const router = useRouter();

  useEffect(() => {
    loadCart();
  }, []);

  const loadCart = async () => {
    try {
      const cartData = await shopifyService.getCart();
      setCart(cartData);
    } catch (error) {
      console.error("Error loading cart:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCheckout = async () => {
    if (!cart || cart.lineItems.length === 0) return;

    setIsCheckingOut(true);
    try {
      // In a real implementation, this would create a Shopify checkout
      // For now, we'll show a success message
      alert("Redirecting to secure checkout...");
      // router.push('/checkout');
    } catch (error) {
      console.error("Error during checkout:", error);
    } finally {
      setIsCheckingOut(false);
    }
  };

  const handleClearCart = async () => {
    if (!confirm("Are you sure you want to clear your cart?")) return;

    try {
      await shopifyService.clearCart();
      loadCart();
    } catch (error) {
      console.error("Error clearing cart:", error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-heirloom-gold"></div>
      </div>
    );
  }

  if (!cart || cart.lineItems.length === 0) {
    return (
      <div className="min-h-screen bg-heirloom-ivory pt-20">
        <div className="section-padding py-16">
          <div className="max-w-2xl mx-auto text-center">
            <ShoppingBag className="w-24 h-24 text-heirloom-charcoal/30 mx-auto mb-6" />
            <h1 className="text-4xl font-serif font-bold text-heirloom-charcoal mb-4">
              Your Cart is Empty
            </h1>
            <p className="text-lg text-heirloom-charcoal/70 mb-8">
              Discover our curated collection of heirloom-quality pieces
            </p>
            <button
              onClick={() => router.push("/shop")}
              className="inline-flex items-center space-x-2 bg-heirloom-charcoal text-heirloom-ivory px-8 py-4 rounded-sm font-medium hover:bg-heirloom-gold transition-colors duration-300"
            >
              <span>Continue Shopping</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  const shippingCost = cart.totalPrice > 100 ? 0 : 15;
  const tax = cart.totalPrice * 0.08;
  const total = cart.totalPrice + shippingCost + tax;

  return (
    <div className="min-h-screen bg-heirloom-ivory pt-20">
      <div className="section-padding py-12">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-serif font-bold text-heirloom-charcoal mb-2">
                Shopping Cart
              </h1>
              <p className="text-heirloom-charcoal/70">
                {cart.lineItems.length}{" "}
                {cart.lineItems.length === 1 ? "item" : "items"} in your cart
              </p>
            </div>
            <button
              onClick={() => router.push("/shop")}
              className="flex items-center space-x-2 text-heirloom-charcoal hover:text-heirloom-gold transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Continue Shopping</span>
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-6">
              {cart.lineItems.map((item) => (
                <CartItem key={item.id} item={item} onUpdate={loadCart} />
              ))}

              <div className="flex justify-end">
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 text-sm font-medium"
                >
                  Clear Cart
                </button>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-heirloom-cream rounded-lg p-6 sticky top-24">
                <h2 className="text-2xl font-serif font-semibold text-heirloom-charcoal mb-6">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <span className="text-heirloom-charcoal/70">Subtotal</span>
                    <span className="font-medium">
                      ${cart.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-heirloom-charcoal/70">Shipping</span>
                    <span className="font-medium">
                      {shippingCost === 0
                        ? "Free"
                        : `$${shippingCost.toFixed(2)}`}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-heirloom-charcoal/70">Tax</span>
                    <span className="font-medium">${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-heirloom-charcoal/20 pt-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full bg-heirloom-charcoal text-heirloom-ivory py-4 rounded-sm font-semibold text-lg hover:bg-heirloom-gold transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                >
                  {isCheckingOut ? "Processing..." : "Proceed to Checkout"}
                </button>

                {/* Guarantees */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-heirloom-gold" />
                    <span className="text-heirloom-charcoal/70">
                      Secure Checkout
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Truck className="w-4 h-4 text-heirloom-gold" />
                    <span className="text-heirloom-charcoal/70">
                      Free shipping on orders over $100
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CreditCard className="w-4 h-4 text-heirloom-gold" />
                    <span className="text-heirloom-charcoal/70">
                      Multiple payment options
                    </span>
                  </div>
                </div>

                {/* Discount Code */}
                <div className="mt-6 pt-6 border-t border-heirloom-charcoal/20">
                  <h3 className="font-medium text-heirloom-charcoal mb-3">
                    Discount Code
                  </h3>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Enter code"
                      className="flex-1 px-3 py-2 border border-heirloom-charcoal/20 rounded-sm bg-heirloom-ivory focus:outline-none focus:border-heirloom-gold"
                    />
                    <button className="px-4 py-2 bg-heirloom-charcoal/10 text-heirloom-charcoal rounded-sm hover:bg-heirloom-charcoal hover:text-heirloom-ivory transition-colors">
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
