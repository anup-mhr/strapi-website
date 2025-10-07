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
        "text-white font-semibold py-3 px-8 mt-2 w-max uppercase tracking-widest text-lg rounded-md group",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
