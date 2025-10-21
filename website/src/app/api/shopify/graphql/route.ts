import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { query, queryString: variables } = await req.json();

        const response = await fetch(
            `https://${process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN}/admin/api/2025-10/graphql.json`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Shopify-Access-Token": process.env.NEXT_PUBLIC_SHOPIFY_ADMIN_ACCESS_TOKEN!,
                },
                body: JSON.stringify({ query, variables }),
            }
        );

        const data = await response.json();

        if (!response.ok) {
            console.error("Shopify API error:", data);
            return NextResponse.json(data, { status: response.status });
        }

        return NextResponse.json(data);
    } catch (error) {
        console.error("Shopify Admin API route error:", error);
        return NextResponse.json(
            { error: "Failed to connect to Shopify Admin API" },
            { status: 500 }
        );
    }
}
