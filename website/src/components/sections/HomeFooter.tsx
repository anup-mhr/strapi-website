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
        "absolute px-[12rem] text-sm tracking-widest py-4 bottom-0 w-full border border-t-1 flex gap-10 items-center justify-between",
        className,
        theme === "light"
          ? "text-black border-t-black/50"
          : "text-white border-t-gray-200/50"
      )}
    >
      <div className="flex gap-8">
        <p>Heirloom Naga</p>
        <p>Cane Concept</p>
      </div>

      <Link href={"/"}>Follow us on Instagram</Link>

      <p>contact@akuzeliang.com</p>
    </footer>
  );
}

export default HomeFooter;
