"use client";

import { ChevronsLeft, ChevronsRight } from "lucide-react";
import { useMemo } from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  maxVisible?: number;
  className?: string;
}

export default function Pagination({
  currentPage,
  totalPages,
  hasNextPage,
  onPageChange,
  maxVisible = 4,
  className = "",
}: PaginationProps) {
  const visiblePages = useMemo(() => {
    const pages: number[] = [];

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 2) {
      for (let i = 1; i <= maxVisible; i++) pages.push(i);
    } else if (currentPage >= totalPages - 1) {
      for (let i = totalPages - maxVisible + 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
    }

    return pages.filter((p) => p >= 1 && p <= totalPages);
  }, [currentPage, totalPages, maxVisible]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage && currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div
      className={`flex justify-center lg:justify-start items-center gap-1.5 sm:gap-2 mt-10 ${className}`}
    >
      {/* Previous Button */}
      <button
        onClick={handlePrevious}
        disabled={currentPage === 1}
        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 transition-transform duration-300 ${
          currentPage === 1
            ? "opacity-50 cursor-not-allowed"
            : "cursor-pointer hover:-translate-x-1"
        }`}
        aria-label="Previous page"
      >
        <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>

      {/* Page Numbers */}
      {visiblePages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border cursor-pointer transition-all duration-300 text-xs sm:text-sm font-medium ${
            currentPage === page
              ? "bg-primary-pink text-white border-primary-pink scale-105"
              : "border-black/20 text-gray-600 hover:border-black/40 hover:bg-gray-100 hover:scale-105"
          }`}
          aria-label={`Page ${page}`}
          aria-current={currentPage === page ? "page" : undefined}
        >
          {page}
        </button>
      ))}

      {/* Next Button */}
      <button
        onClick={handleNext}
        disabled={!hasNextPage || currentPage >= totalPages}
        className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-500 transition-transform duration-300 ${
          hasNextPage && currentPage < totalPages
            ? "cursor-pointer hover:translate-x-1"
            : "opacity-50 cursor-not-allowed"
        }`}
        aria-label="Next page"
      >
        <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6" />
      </button>
    </div>
  );
}
