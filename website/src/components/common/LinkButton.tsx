import { cn } from "@/lib/utils";
import Link from "next/link";
import { ReactNode } from "react";

interface LinkButtonProps {
  children: ReactNode;
  href?: string;
  newTab?: boolean;
  className?: string;
}

const LinkButton = ({
  children,
  href = "/contact",
  newTab = false,
  className,
}: LinkButtonProps) => {
  return (
    <Link
      href={href}
      target={newTab ? "_blank" : "_self"}
      className={cn(
        "bg-black text-white py-4 px-10 mt-2 w-max uppercase font-light tracking-widest text-xs group",
        className
      )}
    >
      {children}
    </Link>
  );
};

export default LinkButton;
