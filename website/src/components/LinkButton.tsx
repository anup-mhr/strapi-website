import { cn } from "../lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface LinkButtonProps {
  children: ReactNode;
  href?: string;
  className?: string;
}

const LinkButton = ({
  children,
  href = "/contact",
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      className={cn(
        "text-white font-semibold py-2 sm:py-2.5 md:py-3 px-6 sm:px-7 md:px-8 mt-2 w-max uppercase tracking-wide sm:tracking-wider md:tracking-widest text-xs md:text-sm rounded-md group",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
