"use client";
import { getCartId, removeCartId, setCartId } from "@/lib/cart-utils";
import {
  createContext,
  ReactNode,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";

interface CartCost {
  subtotalAmount: { amount: string; currencyCode: string };
  totalAmount: { amount: string; currencyCode: string };
  totalTaxAmount: { amount: string; currencyCode: string };
}

interface CartLine {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    title: string;
    priceV2: { amount: string; currencyCode: string };
    product: {
      title: string;
      featuredImage?: { url: string; altText: string | null };
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  cost: CartCost;
  lines: { edges: { node: CartLine }[] };
}

interface CartContextType {
  cart: Cart | null;
  cartCount: number;
  isLoading: boolean;
  refreshCart: () => Promise<void>;
  addToCart: (
    variantId: string,
    quantity?: number
  ) => Promise<Cart | undefined>;
  updateLineQuantity: (
    lineId: string,
    quantity: number
  ) => Promise<Cart | undefined>;
  removeFromCart: (lineId: string) => Promise<Cart | undefined>;
  clearCart: () => void;
}

// -------------------- Context Setup --------------------

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const computeCount = (cartData: Cart | null) => {
    if (!cartData) return 0;
    return cartData.lines.edges.reduce(
      (total, edge) => total + edge.node.quantity,
      0
    );
  };

  //Fetching the cart from Shopify by ID
  const refreshCart = useCallback(async () => {
    const cartId = getCartId();
    if (!cartId) return;
    setIsLoading(true);
    try {
      const response = await fetch(`/api/cart/get?cartId=${cartId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        // cache: "no-store",
      });

      if (response.ok) {
        const data = await response.json();
        setCart(data);
      } else {
        console.error("Failed to fetch cart:", response.statusText);
      }
    } catch (error) {
      console.error("Error refreshing cart:", error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new cart
  const createCart = useCallback(async (lines: any[] = []): Promise<Cart> => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/cart/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lines }),
      });

      const newCart: Cart = await response.json();
      setCart(newCart);
      setCartId(newCart.id);
      return newCart;
    } catch (error) {
      console.error("Create cart error:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add item to cart
  const addToCart = useCallback(
    async (variantId: string, quantity = 1): Promise<Cart | undefined> => {
      setIsLoading(true);
      try {
        const cartId = getCartId();

        if (!cartId) {
          const newCart = await createCart([
            { merchandiseId: variantId, quantity },
          ]);
          return newCart;
        }

        const response = await fetch("/api/cart/add", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId,
            lines: [{ merchandiseId: variantId, quantity }],
          }),
        });

        const updatedCart: Cart = await response.json();
        setCart(updatedCart);
        return updatedCart;
      } catch (error) {
        console.error("Add to cart error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    [createCart]
  );

  // Update item quantity
  const updateLineQuantity = useCallback(
    async (lineId: string, quantity: number): Promise<Cart | undefined> => {
      setIsLoading(true);
      try {
        const cartId = getCartId();
        if (!cartId) return;

        const response = await fetch("/api/cart/update", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cartId,
            lines: [{ id: lineId, quantity }],
          }),
        });

        const updatedCart: Cart = await response.json();
        setCart(updatedCart);
        return updatedCart;
      } catch (error) {
        console.error("Update cart error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Remove item
  const removeFromCart = useCallback(
    async (lineId: string): Promise<Cart | undefined> => {
      setIsLoading(true);
      try {
        const cartId = getCartId();
        if (!cartId) return;

        const response = await fetch("/api/cart/remove", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ cartId, lineIds: [lineId] }),
        });

        const updatedCart: Cart = await response.json();
        setCart(updatedCart);
        return updatedCart;
      } catch (error) {
        console.error("Remove cart error:", error);
        throw error;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Clear cart
  const clearCart = useCallback(() => {
    removeCartId();
    setCart(null);
  }, []);

  useEffect(() => {
    refreshCart();
  }, [refreshCart]);

  const value: CartContextType = {
    cart,
    cartCount: computeCount(cart),
    isLoading,
    refreshCart,
    addToCart,
    updateLineQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// -------------------- Hook --------------------

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
