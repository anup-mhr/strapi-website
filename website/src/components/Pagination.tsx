// app/shop/components/Pagination.tsx
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChevronsRight, ChevronsLeft } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalItems: number;
    itemsPerPage?: number;
}

export default function Pagination({
    currentPage,
    totalItems,
    itemsPerPage = 9,
}: PaginationProps) {
    console.log(totalItems)
    const router = useRouter();
    const searchParams = useSearchParams();

    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return null; // Only one page — no pagination needed

    const visiblePages = 4; 
    const startPage = Math.max(
        1,
        Math.min(
            currentPage - Math.floor(visiblePages / 2),
            totalPages - visiblePages + 1
        )
    );

    const endPage = Math.min(startPage + visiblePages - 1, totalPages);

    const pageNumbers = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
    );

    const goToPage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", String(page));
        router.push(`/shop?${params.toString()}`);
    };

    return (
        <div className="flex justify-center space-x-2 mt-10 items-center">
            {currentPage > 1 && (
                <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => goToPage(currentPage - 1)}
                >
                    <ChevronsLeft />
                </button>
            )}

            {pageNumbers.map((pageNum) => (
                <button
                    key={pageNum}
                    onClick={() => goToPage(pageNum)}
                    className={`w-10 h-10 rounded-full transition ${pageNum === currentPage
                            ? "bg-primary-pink text-white"
                            : "border border-black/20 text-gray-600 hover:border-black"
                        }`}
                >
                    {pageNum}
                </button>
            ))}

            {currentPage < totalPages && (
                <button
                    className="text-gray-600 hover:text-black"
                    onClick={() => goToPage(currentPage + 1)}
                >
                    <ChevronsRight />
                </button>
            )}
        </div>
    );
}
