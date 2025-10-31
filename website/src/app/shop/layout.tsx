import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import type { ReactNode } from "react";

export const metadata = {
  title: "Heirloom Naga - Shop",
  description:
    "Discover Heirloom Naga's collection of handcrafted Naga products, including journals, textiles, ceramics, and more. Each piece reflects traditional craftsmanship and heritage.",
  keywords:
    "Heirloom Naga, shop, handcrafted products, Naga crafts, journals, textiles, ceramics, handmade gifts, Naga heritage",
};

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      <main className="padding py-8 sm:py-10 md:py-12">
        <Heading title="SHOP" subtitle="Our latest products" />
        {children}
      </main>
      <Footer />
    </div>
  );
}
