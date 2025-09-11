"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

type LinkType = {
  href: string;
  label: string;
}

function Navigation({ links }: { links: LinkType[] }) {

  const pathname = usePathname();

  return (
    <div className="fixed z-50 w-full px-[12rem] py-8 flex items-center justify-between tracking-widest text-white text-lg">
      <Link href="/" className={`header-nav ${pathname === "/" ? "active" : ""}`}>
        AKU ZELIANG
      </Link>

      <ul className="flex gap-10">
        {links.slice(1).map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={`header-nav ${pathname === link.href ? "active" : ""}`} >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Navigation;
