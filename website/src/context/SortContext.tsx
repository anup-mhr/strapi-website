"use client";
import { createContext, useContext, useState, ReactNode } from "react";

export type SortOption = "name-asc" | "name-desc" | "date-asc" | "date-desc";

interface SortContextType {
  currentSort: SortOption;
  setCurrentSort: (sort: SortOption) => void;
}

const SortContext = createContext<SortContextType | undefined>(undefined);

export function SortProvider({ children }: { children: ReactNode }) {
  const [currentSort, setCurrentSort] = useState<SortOption>("name-asc");

  return (
    <SortContext.Provider value={{ currentSort, setCurrentSort }}>
      {children}
    </SortContext.Provider>
  );
}

export function useSort() {
  const context = useContext(SortContext);
  if (context === undefined) {
    throw new Error("useSort must be used within a SortProvider");
  }
  return context;
}
