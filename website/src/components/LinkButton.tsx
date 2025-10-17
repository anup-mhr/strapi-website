import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "../lib/utils";

interface LinkButtonProps {
  children: ReactNode;
  href?: string;
  newTab?: boolean;
  className?: string;
}

const LinkButton = ({
  children,
  href = "/shop",
  newTab = false,
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : "_self"}
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
