import type { Metadata } from "next";
import "./globals.css";
import { montserrat, cormorant, nunito } from "@/lib/fonts";
import "./globals.css";
import { CartProvider } from "@/components/cart-test/CartProvider";
import Head from "next/head";

export const metadata: Metadata = {
  title: "Heirloom Naga - Honouring Hands",
  description:
    "Discover exquisite handcrafted pieces that preserve ancient Naga traditions. From ceramics to textiles, each item tells a story of heritage and timeless beauty.",
  keywords:
    "heirloom, naga, artisan, handcrafted, traditional, ceramics, textiles, home decor, wellness",
  openGraph: {
    title: "Heirloom Naga - Honouring Hands",
    description:
      "Exquisite handcrafted pieces preserving ancient Naga traditions",
    type: "website",
    url: "https://heirloomnaga.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
       <Head>
        <link
          rel="preload"
          as="image"
          href="/images/logo1.webp"
          type="image/webp"
        />
      </Head>
      <body
        className={`${montserrat.variable} ${cormorant.variable} ${nunito.variable} antialiased`}
      >
        <CartProvider>{children}</CartProvider>
        {/* {children} */}
      </body>
    </html>
  );
}
