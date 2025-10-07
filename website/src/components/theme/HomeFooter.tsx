import { cn } from "@/lib/utils";

interface HomeFooterProps {
  theme?: "light" | "dark";
  className?: string;
}

function HomeFooter({ theme = "light", className }: HomeFooterProps) {
  return (
    <footer
      className={cn(
        "absolute px-4 sm:px-8 custom-md:px-16 custom-lg:px-32 xl:px-44 text-[10.5px]  tracking-widest py-4 md:py-6 bottom-0 w-full border-none md:border-t md:border-solid",
        className,
        theme === "light"
          ? "text-black/70 border-t-black/35"
          : "text-white/70 border-t-gray-200/35"
      )}
    >
      {/* Desktop Layout */}
      <div className="flex flex-col md:flex-row gap-3 md:gap-6 lg:gap-10 items-center justify-between">
        <div className="flex gap-6 lg:gap-8">
          <a
            href="https://heirloomnaga.com/"
            target="_blank"
            className="hover:opacity-70 transition-opacity cursor-pointer"
          >
            Heirloom Naga
          </a>
          <a
            href="https://caneconcept.com/"
            target="_blank"
            className="hover:opacity-70 transition-opacity cursor-pointer"
          >
            Cane Concept
          </a>
        </div>

        <a
          href="https://www.instagram.com/aku1068"
          target="_blank"
          className="hover:opacity-70 transition-opacity"
        >
          Follow us on Instagram
        </a>

        <p className="hover:opacity-70 transition-opacity cursor-pointer">
          hello@akuzeliang.com
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
            hello@akuzeliang.com
          </p>
        </div>
      </div> */}
    </footer>
  );
}

export default HomeFooter;
