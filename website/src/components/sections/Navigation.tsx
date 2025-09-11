"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links as navlinks } from "@/constants/constants";
import clsx from "clsx";

type LinkType = {
  href: string;
  label: string;
};

function Navigation({
  links = navlinks,
  textColor = "text-black",
  background = "bg-white",
}: {
  links?: LinkType[];
  textColor?: string;
  background?: string;
}) {
  const pathname = usePathname(); 

  return (
    <div
      className={clsx("fixed z-50 w-full px-[12rem] py-8 flex items-center justify-between tracking-widest text-base",textColor, background)}>
      <Link href="/" className={`header-nav ${pathname === "/" ? "active" : ""}`}>
        AKU ZELIANG
      </Link>

      <ul className="flex gap-10">
        {links.slice(1).map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={`header-nav ${pathname.startsWith(link.href) ? "active" : "" }`}>        
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
