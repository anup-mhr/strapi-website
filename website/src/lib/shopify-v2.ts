import { getCartId, setCartId, removeCartId } from "@/lib/cart-utils";
import type { Cart, CartItem } from "@/types/shopify-v2";

export const shopifyService = {
  async getProducts() {
    const response = await fetch("/api/products", {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch products");
    const data = await response.json();
    return data.products;
  },

  async getProduct(id: string) {
    const response = await fetch(`/api/products/${id}`, {
      method: "GET",
      cache: "no-store",
    });

    if (!response.ok) throw new Error("Failed to fetch product");
    const data = await response.json();
    return data.product;
  },

  async createCart(lines: any[] = []): Promise<Cart> {
    const response = await fetch("/api/cart/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines }),
    });

    if (!response.ok) throw new Error("Failed to create cart");
    const cartData = await response.json();

    setCartId(cartData.id);
    return this.normalizeCart(cartData);
  },

  async addToCart(variantId: string, quantity = 1): Promise<Cart> {
    const cartId = getCartId();

    if (!cartId) {
      // Create a new cart if none exists
      const newCart = await this.createCart([
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

    if (!response.ok) throw new Error("Failed to add item to cart");
    const cartData = await response.json();

    setCartId(cartData.id);
    return this.normalizeCart(cartData);
  },

  async updateCartQuantity(lineId: string, quantity: number): Promise<Cart> {
    const cartId = getCartId();
    if (!cartId) throw new Error("No cart found");

    const response = await fetch("/api/cart/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartId,
        lines: [{ id: lineId, quantity }],
      }),
    });

    if (!response.ok) throw new Error("Failed to update cart item quantity");
    const cartData = await response.json();
    return this.normalizeCart(cartData);
  },

  async removeFromCart(lineId: string): Promise<Cart> {
    const cartId = getCartId();
    if (!cartId) throw new Error("No cart found");

    const response = await fetch("/api/cart/remove", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        cartId,
        lineIds: [lineId],
      }),
    });

    if (!response.ok) throw new Error("Failed to remove item from cart");
    const cartData = await response.json();
    return this.normalizeCart(cartData);
  },

  async getCart(): Promise<Cart | null> {
    const cartId = getCartId();
    if (!cartId) return null;

    const response = await fetch(`/api/cart/get?cartId=${cartId}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });

    if (!response.ok) {
      console.error("Failed to fetch cart:", response.statusText);
      return null;
    }

    const cartData = await response.json();
    console.log("cartData", cartData);
    return this.normalizeCart(cartData);
  },

  async clearCart(): Promise<void> {
    removeCartId();
  },

  normalizeCart(cartData: any): Cart {
    if (!cartData) throw new Error("Invalid cart data");

    const lineItems: CartItem[] =
      cartData.lines?.edges?.map((edge: any) => {
        const node = edge.node;
        return {
          id: node.id,
          title: node.merchandise.product.title,
          merchandiseId: node.merchandise.id,
          quantity: node.quantity,
          price: parseFloat(node.merchandise.priceV2.amount),
          currencyCode: node.merchandise.priceV2.currencyCode,
          image: node.merchandise.product.featuredImage?.url ?? "",
          altText: node.merchandise.product.featuredImage?.altText ?? "",
          selectedOptions: node.merchandise.selectedOptions?.map(
            (opt: any) => ({ name: opt.name, value: opt.value })
          ),
        };
      }) ?? [];

    const totalPrice = parseFloat(cartData.cost?.totalAmount?.amount ?? "0");
    const currencyCode = cartData.cost?.totalAmount?.currencyCode ?? "USD";

    return {
      id: cartData.id,
      checkoutUrl: cartData.checkoutUrl,
      totalQuantity: cartData.totalQuantity,
      totalPrice,
      currencyCode,
      lineItems,
    };
  },
};
