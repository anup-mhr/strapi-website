"use client";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

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

  return (
    <div
      className={cn(
        "fixed z-50 w-full font-dosis px-[12rem] py-8 flex items-center justify-between tracking-widest text-lg",
        className,
        theme === "light" ? "text-black" : "text-white"
      )}
    >
      <Link
        href="/"
        className={cn(
          "header-nav !font-bold",
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
                "header-nav",
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
