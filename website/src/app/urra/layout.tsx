import Sidebar from "@/components/sections/Sidebar";
import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { links } from "@/constants/constants";
import { fetchProjectListByCategory } from "@/lib/strapiApiCall";
import type { ReactNode } from "react";

export const metadata = {
  title: "Aku Zeliang - Urra Design Studio",
  description:
    "Urra Design Studio portfolio showcasing design work across multiple disciplines",
};

export default async function Layout({ children }: { children: ReactNode }) {
  const projects = await fetchProjectListByCategory("Urra Design Studio");

  return (
    <div className="bg-white h-full w-full font-dosis">
      <Navigation links={links} />

      <div className="px-4 sm:px-8 custom-md:px-16 custom-lg:px-32 xl:px-48 py-28 md:py-44 grid grid-flow-row md:grid-cols-[1fr_3fr] gap-10 tracking-[3px]">
        <Sidebar projects={projects} />

        <main className="min-h-[70vh]">{children}</main>
      </div>

      <Footer />
    </div>
  );
}
