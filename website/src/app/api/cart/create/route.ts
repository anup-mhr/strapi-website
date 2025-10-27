import { CREATE_CART_MUTATION, shopifyFetch } from "@/lib/cart-shopify";
import { NextResponse } from "next/server";

// Define the expected request body
interface CreateCartRequestBody {
  lines?: Array<{
    merchandiseId: string;
    quantity: number;
  }>;
}

// Define the response shape based on your GraphQL mutation
interface CreateCartResponse {
  cartCreate: {
    cart: {
      id: string;
      checkoutUrl: string;
      totalQuantity: number;
      cost: {
        subtotalAmount: { amount: string; currencyCode: string };
        totalAmount: { amount: string; currencyCode: string };
        totalTaxAmount: { amount: string; currencyCode: string };
      };
      lines: {
        edges: Array<{
          node: {
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
          };
        }>;
      };
    };
    userErrors: Array<{ field?: string[]; message: string }>;
  };
}

export async function POST(request: Request) {
  try {
    const { lines }: CreateCartRequestBody = await request.json();

    const data = await shopifyFetch<CreateCartResponse>({
      query: CREATE_CART_MUTATION,
      variables: {
        input: {
          lines: lines || [],
        },
      },
    });

    if (data.cartCreate.userErrors.length > 0) {
      return NextResponse.json(
        { error: data.cartCreate.userErrors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(data.cartCreate.cart);
  } catch (error) {
    console.error("Create cart error:", error);
    return NextResponse.json(
      { error: "Failed to create cart" },
      { status: 500 }
    );
  }
}
