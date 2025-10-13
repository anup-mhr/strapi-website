import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import React from "react";

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
