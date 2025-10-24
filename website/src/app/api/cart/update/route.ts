import { shopifyFetch, UPDATE_CART_MUTATION } from "@/lib/cart-shopify";
import { NextResponse } from "next/server";
export async function POST(request: Request) {
  try {
    const { cartId, lines } = await request.json();

    if (!cartId || !lines || lines.length === 0) {
      return NextResponse.json(
        { error: "Cart ID and lines are required" },
        { status: 400 }
      );
    }

    const data = await shopifyFetch({
      query: UPDATE_CART_MUTATION,
      variables: {
        cartId,
        lines,
      },
    });

    if (data.cartLinesUpdate.userErrors.length > 0) {
      return NextResponse.json(
        { error: data.cartLinesUpdate.userErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(data.cartLinesUpdate.cart);
  } catch (error) {
    console.error("Update cart error:", error);
    return NextResponse.json(
      { error: "Failed to update cart" },
      { status: 500 }
    );
  }
}
