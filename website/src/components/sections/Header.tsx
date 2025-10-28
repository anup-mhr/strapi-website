"use client";

import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";
import { useCart } from "../cart-test/CartProvider";

const navLinks = [
  { label: "SHOP", href: "/shop" },
  { label: "JOURNAL", href: "/journal" },
  { label: "ABOUT", href: "/about" },
  { label: "CONTACT", href: "/contact" },
];

const Header = ({ className = "" }: { className?: string }) => {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const { cartCount } = useCart();

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on ESC or outside click
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) =>
      e.key === "Escape" && setIsMobileMenuOpen(false);
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(".mobile-menu") && !target.closest(".hamburger")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <header
      className={cn(
        "fixed w-full z-50 transition-all duration-600 py-4 sm:py-5 md:py-6",
        "flex items-center justify-between padding font-semibold",
        isScrolled
          ? "bg-white/50 shadow-md backdrop-blur-md py-2 sm:py-2.5 md:py-3"
          : "bg-transparent",
        className
      )}
    >
      <Link
        href="/"
        className="w-32 sm:w-36 md:w-40 lg:w-50 h-12 sm:h-13 md:h-14 relative"
      >
        <Image
          src="/images/logo.png"
          alt="Hierloom Naga Logo"
          fill
          className="object-contain"
        />
      </Link>

      <ul className="hidden md:flex gap-4 lg:gap-6 text-primary text-sm lg:text-base">
        {navLinks.map(({ label, href }) => (
          <li key={href}>
            <Link
              href={href}
              className={cn(
                "font-bold transition-all duration-500 ease-in-out hover:-translate-y-0.5 uppercase",
                pathname.startsWith(href) && "text-primary-pink"
              )}
            >
              {label}
            </Link>
          </li>
        ))}
        <li>
          <Link
            href={"/cart"}
            className={cn(
              "font-bold transition-all duration-500 ease-in-out hover:-translate-y-0.5 uppercase",
              pathname.startsWith("/cart") && "text-primary-pink"
            )}
          >
            CART <span>({cartCount})</span>
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden hamburger p-2 rounded-md focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        aria-label="Toggle menu"
      >
        <Menu size={20} className="sm:w-6 sm:h-6" />
      </button>

      {/* Mobile Menu */}
      <div
        className={cn(
          "mobile-menu fixed top-0 right-0 w-screen h-screen bg-white shadow-lg transform transition-transform duration-600 md:hidden flex flex-col gap-4 sm:gap-6 text-xs sm:text-sm",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="padding py-6 sm:py-8 flex justify-between items-center pb-3 sm:pb-4 border-b-[1px] border-primary">
          <h1 className="font-bold text-sm sm:text-base">MENU</h1>
          <button
            className="md:hidden hamburger p-2 rounded-md focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} className="sm:w-6 sm:h-6" />
          </button>
        </div>

        <div className="padding flex flex-col gap-6 sm:gap-8 py-6 sm:py-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-sm sm:text-base font-semibold uppercase",
                pathname === href && "text-primary-pink"
              )}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
          <Link
            href={"/cart"}
            className={cn(
              "text-sm sm:text-base font-semibold uppercase",
              pathname === "/cart" && "text-primary-pink"
            )}
            onClick={() => setIsMobileMenuOpen(false)}
          >
            CART <span>({cartCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
