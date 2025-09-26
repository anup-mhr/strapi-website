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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 60);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu when clicking outside or on escape
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false);
      }
    };

    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Element;
      if (!target.closest(".mobile-menu") && !target.closest(".hamburger")) {
        setIsMobileMenuOpen(false);
      }
    };

    if (isMobileMenuOpen) {
      document.addEventListener("keydown", handleEscape);
      document.addEventListener("click", handleClickOutside);
      document.body.style.overflow = "hidden"; // Prevent scrolling when menu is open
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("click", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      <div
        className={cn(
          "fixed z-50 w-full font-dosis px-4 sm:px-8 custom-md:px-16 custom-lg:px-32 xl:px-44  py-4 md:py-8 flex items-center justify-between tracking-widest transition-all border-transparent duration-300 ease-in-out",
          className,
          theme === "light" ? "text-black" : "text-white",
          isScrolled && [
            theme === "light"
              ? "bg-white/50 backdrop-blur-md shadow-lg border-b border-gray-200/50"
              : "bg-black/50 backdrop-blur-md shadow-lg border-b border-white/10",
            "py-2 md:py-4",
          ]
        )}
      >
        {/* Logo */}
        <Link
          href="/"
          className={cn(
            "header-nav !font-semibold transition-all duration-300 text-sm lg:text-base",
            theme === "light" ? "nav-light" : "nav-dark",
            pathname === "/" && "active"
          )}
        >
          AKU ZELIANG
        </Link>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex text-xs gap-5 lg:gap-6">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className={cn(
                  "header-nav transition-all duration-300",
                  theme === "light" ? "nav-light" : "nav-dark",
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href)
                    ? "active"
                    : ""
                )}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Mobile Hamburger Menu */}
        <button
          className="hamburger md:hidden flex flex-col items-center justify-center w-8 h-8 space-y-1.5 transition-all duration-300"
          onClick={toggleMobileMenu}
          aria-label="Toggle mobile menu"
        >
          <span
            className={cn(
              "block w-5 h-[1px] transition-all duration-300",
              theme === "light" ? "bg-black" : "bg-white",
              isMobileMenuOpen && "rotate-45 translate-y-2"
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1px] transition-all duration-300",
              theme === "light" ? "bg-black" : "bg-white",
              isMobileMenuOpen && "opacity-0"
            )}
          />
          <span
            className={cn(
              "block w-5 h-[1px] transition-all duration-300",
              theme === "light" ? "bg-black" : "bg-white",
              isMobileMenuOpen && "-rotate-45 -translate-y-2"
            )}
          />
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <div className="fixed inset-0 z-50 md:hidden pointer-events-none">
        {/* Backdrop */}
        <div
          className={cn(
            "absolute inset-0 backdrop-blur-sm transition-opacity duration-300",
            theme === "light" ? "bg-white/80" : "bg-black/80",
            isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0"
          )}
        />

        {/* Sliding Menu */}
        <div
          className={cn(
            "mobile-menu absolute top-0 right-0 h-full w-80 max-w-[80vw] transform transition-transform duration-300 ease-in-out shadow-2xl pointer-events-auto",
            theme === "light"
              ? "bg-white border-l border-gray-200"
              : "bg-black border-l border-white/10",
            isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div
              className={cn(
                "flex items-center justify-between p-6 border-b",
                theme === "light" ? "border-black-200/20" : "border-gray-200/20"
              )}
            >
              <span
                className={cn(
                  "font-semibold text-xs uppercase",
                  theme === "light" ? "text-black" : "text-white"
                )}
              >
                Menu
              </span>
              <button
                onClick={toggleMobileMenu}
                className={cn(
                  "w-8 h-8 flex items-center justify-center rounded-full transition-colors",
                  theme === "light"
                    ? "hover:bg-gray-100 text-black"
                    : "hover:bg-white/10 text-white"
                )}
                aria-label="Close mobile menu"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Menu Items */}
            <nav className="flex-1 p-6">
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className={cn(
                        "block text-xs font-medium transition-all duration-300 py-2",
                        theme === "light"
                          ? "text-gray-800 hover:text-black"
                          : "text-gray-200 hover:text-white",
                        pathname.startsWith(link.href) &&
                          (theme === "light"
                            ? "text-black border-l-4 border-black pl-4"
                            : "text-white border-l-4 border-white pl-4")
                      )}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navigation;
