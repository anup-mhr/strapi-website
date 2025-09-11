"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type LinkType = {
  href: string;
  label: string;
};

interface NavigationProps {
  links: LinkType[];
  theme?: "light" | "dark";
  className?: string;
}

function Navigation({ links, theme = "light", className }: NavigationProps) {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);

    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 w-full font-dosis px-[12rem] py-8 flex items-center justify-between tracking-widest text-lg transition-all border-transparent duration-300 ease-in-out",
        className,
        theme === "light" ? "text-black" : "text-white",
        isScrolled && [
          theme === "light"
            ? "bg-white/50 backdrop-blur-md shadow-lg border-b border-gray-200/50"
            : "bg-black/50 backdrop-blur-md shadow-lg border-b border-white/10",
          "py-4",
        ]
      )}
    >
      <Link
        href="/"
        className={cn(
          "header-nav !font-semibold transition-all duration-300",
          theme === "light" ? "nav-light" : "nav-dark",
          pathname === "/" && "active"
        )}
      >
        AKU ZELIANG
      </Link>

      <ul className="flex gap-10">
        {links.slice(1).map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "header-nav transition-all duration-300",
                theme === "light" ? "nav-light" : "nav-dark",
                pathname === link.href && "active"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
