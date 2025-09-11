import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface HomeFooterProps {
  theme?: "light" | "dark";
  className?: string;
}

function HomeFooter({ theme = "light", className }: HomeFooterProps) {
  return (
    <footer
      className={cn(
        "absolute px-4 sm:px-8 md:px-16 lg:px-32 xl:px-48 text-xs sm:text-sm tracking-widest py-4 md:py-6 bottom-0 w-full border-t border-solid",
        className,
        theme === "light"
          ? "text-black border-t-black/50"
          : "text-white border-t-gray-200/50"
      )}
    >
      {/* Desktop Layout */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-10 items-center justify-between">
        <div className="flex gap-6 lg:gap-8">
          <p className="hover:opacity-70 transition-opacity cursor-pointer">
            Heirloom Naga
          </p>
          <p className="hover:opacity-70 transition-opacity cursor-pointer">
            Cane Concept
          </p>
        </div>

        <Link href="/" className="hover:opacity-70 transition-opacity">
          Follow us on Instagram
        </Link>

        <p className="hover:opacity-70 transition-opacity cursor-pointer">
          contact@akuzeliang.com
        </p>
      </div>

      {/* Mobile Layout */}
      {/* <div className="md:hidden space-y-3">
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
          <p className="hover:opacity-70 transition-opacity cursor-pointer">
            Heirloom Naga
          </p>
          <p className="hover:opacity-70 transition-opacity cursor-pointer">
            Cane Concept
          </p>
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <Link href="/" className="hover:opacity-70 transition-opacity">
            Follow us on Instagram
          </Link>
          <p className="hover:opacity-70 transition-opacity cursor-pointer text-xs sm:text-sm">
            contact@akuzeliang.com
          </p>
        </div>
      </div> */}
    </footer>
  );
}

export default HomeFooter;
