import Sidebar from "@/components/sections/Sidebar";
import Footer from "@/components/theme/Footer";
import Navigation from "@/components/theme/Navigation";
import { links } from "@/constants/constants";
import { shopifyClient } from "@/lib/shopify";
import { ProjectTitleList } from "@/types/project.dt";
import { Collection } from "@/types/shopify.dt";

import type { ReactNode } from "react";

export const getProjectTitle = async () => {
  const query = `
    {
      collections(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  `;

  const data = await shopifyClient.request<{
    collections: { edges: Collection[] };
  }>(query);
  return data.collections.edges;
};

export default async function Layout({ children }: { children: ReactNode }) {
  const projects = await getProjectTitle();

  return (
    <div className="bg-white h-full w-full font-dosis">
      <Navigation links={links} />

      <div className="px-4 sm:px-8 custom-md:px-16 custom-lg:px-32 xl:px-48 py-[8rem] md:py-[12rem] grid grid-flow-row md:grid-cols-[1fr_3fr] gap-10 tracking-[3px]">
        <Sidebar
          projects={
            projects.map(({ node: { title, handle } }: Collection) => ({
              slug: handle,
              title,
            })) as ProjectTitleList[]
          }
        />
        <main>{children}</main>
      </div>

      <Footer />
    </div>
  );
}
