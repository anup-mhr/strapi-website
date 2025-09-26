"use client";
import { SortProvider } from "@/context/SortContext";
import { ReactNode } from "react";

interface SortWrapperProps {
  children: ReactNode;
}

function SortWrapper({ children }: SortWrapperProps) {
  return <SortProvider>{children}</SortProvider>;
}

export default SortWrapper;
