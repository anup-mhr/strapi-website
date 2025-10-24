import { NextResponse } from "next/server";
import { shopifyFetch, GET_CART_QUERY } from "@/lib/cart-shopify";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const cartId = searchParams.get("cartId");

    if (!cartId) {
      return NextResponse.json({ error: "Missing cartId" }, { status: 400 });
    }

    const data = await shopifyFetch({
      query: GET_CART_QUERY,
      variables: { cartId },
    });

    console.log("from api",data)

    if (!data?.cart) {
      return NextResponse.json({ error: "Cart not found" }, { status: 404 });
    }

    return NextResponse.json(data.cart);
  } catch (error) {
    console.error("Error fetching cart:", error);
    return NextResponse.json({ error: "Failed to fetch cart" }, { status: 500 });
  }
}
