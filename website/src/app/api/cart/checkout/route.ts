import { CREATE_CART_MUTATION, shopifyFetch } from "@/lib/cart-shopify";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { lines } = await request.json();
    console.log("lines:", lines);

    if (!lines || lines.length === 0) {
      return NextResponse.json(
        { error: "Cart line items are required" },
        { status: 400 }
      );
    }

    const data = await shopifyFetch({
      query: CREATE_CART_MUTATION,
      variables: { input: { lines } },
    });

    if (data?.cartCreate?.userErrors.length > 0) {
      return NextResponse.json(
        { error: data.cartCreate.userErrors[0].message },
        { status: 400 }
      );
    }

    const checkoutUrl = data?.cartCreate?.cart?.checkoutUrl;

    if (!checkoutUrl) {
      throw new Error("Checkout URL not returned from Shopify");
    }

    return NextResponse.json({ checkoutUrl });
  } catch (error) {
    console.error("Checkout creation error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout" },
      { status: 500 }
    );
  }
}
