import type { Metadata } from "next";
import "./globals.css";
import { montserrat, cormorant, nunito } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Heirloom Naga - Premium Artisan Crafts & Heritage Goods",
  description:
    "Discover exquisite handcrafted pieces that preserve ancient Naga traditions. From ceramics to textiles, each item tells a story of heritage and timeless beauty.",
  keywords:
    "heirloom, naga, artisan, handcrafted, traditional, ceramics, textiles, home decor, wellness",
  openGraph: {
    title: "Heirloom Naga - Premium Artisan Crafts",
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
      <body
        className={`${montserrat.variable} ${cormorant.variable} ${nunito.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
