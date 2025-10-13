"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { cn } from "../../lib/utils";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { shopifyService } from "@/lib/shopify-v2";

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
  const [cartItemCount, setCartItemCount] = useState(0);

  useEffect(() => {
    const updateCartCount = async () => {
      const cart = await shopifyService.getCart();
      const count = cart.lineItems.reduce(
        (total, item) => total + item.quantity,
        0
      );
      setCartItemCount(count);
    };

    updateCartCount();
    const interval = setInterval(updateCartCount, 1000);
    return () => clearInterval(interval);
  }, []);

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
        "fixed w-full z-50 transition-all duration-600 py-6",
        "flex items-center justify-between padding font-semibold",
        isScrolled
          ? "bg-white/50 shadow-md backdrop-blur-md py-3"
          : "bg-transparent ",
        className
      )}
    >
      <Link href="/" className="w-40 lg:w-50 h-14 relative">
        <Image
          src="/images/logo.png"
          alt="Hierloom Naga Logo"
          fill
          className="object-contain"
        />
      </Link>

      <ul className="hidden md:flex gap-6 text-primary">
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
            CART <span>({cartItemCount})</span>
          </Link>
        </li>
      </ul>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden hamburger p-2 rounded-md focus:outline-none"
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
      >
        <Menu size={24} />
      </button>

      {/* Mobile Menu */}
      <div
        className={cn(
          "mobile-menu fixed top-0 right-0 w-screen h-screen bg-white shadow-lg transform transition-transform duration-600 md:hidden flex flex-col gap-6 text-sm",
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="padding py-8 flex justify-between items-center pb-4 border-b-[1px] border-primary">
          <h1 className="font-bold">MENU</h1>
          <button
            className="md:hidden hamburger p-2 rounded-md focus:outline-none"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <X size={24} />
          </button>
        </div>

        <div className="padding flex flex-col gap-8 py-8">
          {navLinks.map(({ label, href }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "text-base font-semibold uppercase",
                pathname === href && "text-primary-pink"
              )}
            >
              {label}
            </Link>
          ))}
          <Link
            href={"/cart"}
            className={cn(
              "text-base font-semibold uppercase",
              pathname === "/cart" && "text-primary-pink"
            )}
          >
            CART <span>({cartItemCount})</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
