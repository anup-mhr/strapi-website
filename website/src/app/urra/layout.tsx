import Navigation from "@/components/sections/Navigation";
import type { ReactNode } from "react";
import { projects } from "@/constants/constants";
import Sidebar from "@/components/sections/Sidebar";
import Footer from "@/components/sections/Footer";

export default function Layout({ children }: { children: ReactNode }) {
    return (
        <div className="bg-white h-full w-full">

            <Navigation />


            <div className="px-[12rem] py-[12rem] grid grid-cols-[1fr_3fr] tracking-[3px]">

                <Sidebar projects={projects.map(({ id, title }) => ({ id, title }))} />
    
                <main>
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}