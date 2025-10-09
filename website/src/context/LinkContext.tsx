// src/context/LinksContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { fetchProjectCategories } from "@/lib/strapiApiCall";
import { links } from "@/constants/constants";

type LinkType = {
    href: string;
    label: string;
};

const LinksContext = createContext<LinkType[]>([]);

export const useLinks = () => useContext(LinksContext);

export function LinksProvider({ children }: { children: React.ReactNode }) {
    const [allLinks, setLinks] = useState<LinkType[]>([]);

    useEffect(() => {
        async function loadLinks() {
            try {
                const categories = await fetchProjectCategories();

                const categoryLinks = categories.map((category) => {
                    if (category.toUpperCase() === "URRA DESIGN STUDIO") {
                        return { href: "/urra", label: category.toUpperCase() };
                    }
                    return {
                        href: `/${category.toLowerCase()}`,
                        label: category.toUpperCase(),
                    };
                });


                setLinks([...categoryLinks, ...links]);
            } catch (error) {
                console.error("Failed to load navigation links", error);
            }
        }

        loadLinks();
    }, []);

    return (
        <LinksContext.Provider value={allLinks}>
            {children}
        </LinksContext.Provider>
    );
}
