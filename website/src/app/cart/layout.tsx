import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import React from "react";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Header />

      <main className="pt-12 padding min-h-[45vh] md:min-h-[50vh] xl:min-h-[55vh]">
        {children}
      </main>

      <Footer />
    </div>
  );
}

export default layout;
