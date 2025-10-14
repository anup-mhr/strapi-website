export const CART_ID_KEY = "shopify_cart_id";

export function getCartId() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(CART_ID_KEY);
}

export function setCartId(cartId: string) {
  if (typeof window === "undefined") return;
  localStorage.setItem(CART_ID_KEY, cartId);
}

export function removeCartId() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(CART_ID_KEY);
}

export function formatPrice(amount: number | string, currencyCode = "USD") {
  if (!amount) return "";
  amount = Number(amount);
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currencyCode,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function extractVariantId(gid: string) {
  // Convert from gid://shopify/ProductVariant/123 to 123
  return gid.split("/").pop();
}

export function formatCartLine(line: any) {
  return {
    id: line.id,
    quantity: line.quantity,
    variantId: line.merchandise.id,
    title: line.merchandise.product.title,
    variantTitle: line.merchandise.title,
    price: parseFloat(line.merchandise.priceV2.amount),
    currencyCode: line.merchandise.priceV2.currencyCode,
    image: line.merchandise.product.featuredImage?.url,
    imageAlt: line.merchandise.product.featuredImage?.altText,
  };
}
