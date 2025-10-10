import Sidebar from "@/components/sections/Sidebar";
import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { getCategoryViaSlug, loadLinks } from "@/lib/helper";
import { generateCategoryMetadata } from "@/lib/metadataHelper";
import { fetchProjectListByCategory } from "@/lib/strapiApiCall";
import SortWrapper from "@/provider/SortWrapper";
import type { ReactNode } from "react";

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}) {
  return generateCategoryMetadata(params.category);
}

export const revalidate = 60;

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const { displayName } = getCategoryViaSlug(category);
  const projects = await fetchProjectListByCategory(displayName);
  const links = await loadLinks();

  return (
    <div className="bg-white h-full w-full font-dosis">
      <Navigation links={links} />

      <SortWrapper>
        <div className="sm:px-8 custom-md:px-16 custom-lg:px-32 xl:px-44 py-20 md:py-40 grid grid-flow-row md:grid-cols-[1fr_3fr] gap-10 tracking-[2px]">
          <Sidebar projects={projects} />

          <main className="min-h-[40vh] md:min-h-[50vh]">{children}</main>
        </div>
      </SortWrapper>

      <Footer />
    </div>
  );
}
