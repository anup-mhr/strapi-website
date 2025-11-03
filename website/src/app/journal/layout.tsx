import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import React from "react";

export const metadata = {
  title: "Heirloom Naga - Journals",
  description:
    "Explore Heirloom Naga's handcrafted journals, inspired by Naga traditions. Perfect for writing, sketching, or gifting, each journal reflects heritage and artistry.",
  keywords:
    "Heirloom Naga, journals, handcrafted journals, Naga crafts, handmade notebooks, writing, sketching, gifts, Naga heritage",
};

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="py-12 padding">{children}</main>

      <Footer />
    </div>
  );
}

export default layout;