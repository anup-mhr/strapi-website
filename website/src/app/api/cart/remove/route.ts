import { REMOVE_FROM_CART_MUTATION, shopifyFetch } from "@/lib/cart-shopify";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { cartId, lineIds } = await request.json();

    if (!cartId || !lineIds || lineIds.length === 0) {
      return NextResponse.json(
        { error: "Cart ID and line IDs are required" },
        { status: 400 }
      );
    }

    const data = await shopifyFetch({
      query: REMOVE_FROM_CART_MUTATION,
      variables: {
        cartId,
        lineIds,
      },
    });

    if (data.cartLinesRemove.userErrors.length > 0) {
      return NextResponse.json(
        { error: data.cartLinesRemove.userErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(data.cartLinesRemove.cart);
  } catch (error) {
    console.error("Remove from cart error:", error);
    return NextResponse.json(
      { error: "Failed to remove items from cart" },
      { status: 500 }
    );
  }
}
