import { cn } from "@/lib/utils";
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
        "bg-black text-white py-5 px-10 mt-2 w-max uppercase font-light tracking-widest text-sm group",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
