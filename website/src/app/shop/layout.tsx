import Heading from "@/components/common/Heading";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
import type { ReactNode } from "react";

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
