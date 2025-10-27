import { ADD_TO_CART_MUTATION, shopifyFetch } from "@/lib/cart-shopify";
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
      query: ADD_TO_CART_MUTATION,
      variables: {
        cartId,
        lines,
      },
    });

    console.log("data", data);

    if (data.cartLinesAdd.userErrors.length > 0) {
      return NextResponse.json(
        { error: data.cartLinesAdd.userErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(data.cartLinesAdd.cart);
  } catch (error) {
    console.error("Add to cart error:", error);
    return NextResponse.json(
      { error: "Failed to add items to cart" },
      { status: 500 }
    );
  }
}
