"use client";

import { ProjectSorter } from "@/components/common/ProjectSorter";
import FilterSidebar, { Filters } from "@/components/sections/FilterSidebar";
import ProductList from "@/components/sections/ProductList";
import { CategoryItem, getProducts } from "@/lib/shopify";
import { ShopifyProductPreview } from "@/types/shopify";
import { ChevronsLeft, ChevronsRight, Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import ProductListSkeleton from "./common/ProjectListSkeleton";

export const itemsPerPage = 12;

function resolveSortOption(sortBy: string) {
  switch (sortBy) {
    case "PRICE_ASC":
      return { sortKey: "PRICE", reverse: false };
    case "PRICE_DESC":
      return { sortKey: "PRICE", reverse: true };
    case "CREATED":
      return { sortKey: "CREATED_AT", reverse: true };
    case "TITLE_ASC":
      return { sortKey: "TITLE", reverse: false };
    case "TITLE_DESC":
      return { sortKey: "TITLE", reverse: true };
    default:
      return { sortKey: "PRICE", reverse: false };
  }
}

export default function ShopPage({
  categories,
}: {
  categories: CategoryItem[];
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [allPageCursors, setAllPageCursors] = useState<(string | null)[]>([
    null,
  ]);

  const [products, setProducts] = useState<ShopifyProductPreview[]>([]);
  const [priceRange, setPriceRange] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({
    min: undefined,
    max: undefined,
  });
  const [totalCount, setTotalCount] = useState<number>(0);
  const [pageInfo, setPageInfo] = useState<{
    hasNextPage: boolean;
    hasPreviousPage: boolean;
    endCursor: string | null;
    startCursor: string | null;
  }>({
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: null,
    startCursor: null,
  });

  const [cursor, setCursor] = useState<string | null>(null);
  const [cursorHistory, setCursorHistory] = useState<(string | null)[]>([null]);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const rawSortBy = searchParams.get("sort");
  const sortBy = rawSortBy || "PRICE_ASC";
  const minPrice = searchParams.get("minPrice")
    ? parseFloat(searchParams.get("minPrice")!)
    : undefined;
  const maxPrice = searchParams.get("maxPrice")
    ? parseFloat(searchParams.get("maxPrice")!)
    : undefined;
  const category = searchParams.get("category") || "";
  const subcategory = searchParams.get("subcategory") || "";

  const filters: Filters = { minPrice, maxPrice, category, subcategory };

  const prevFiltersRef = useRef<string>("");
  const filterKey = `${category}-${subcategory}-${minPrice}-${maxPrice}-${sortBy}`;

  const updateURL = (
    updates: Record<string, string | number | undefined | null>,
    resetPage = false
  ) => {
    const params = new URLSearchParams(searchParams.toString());

    if (resetPage) params.delete("page");

    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "" || value === null)
        params.delete(key);
      else params.set(key, String(value));
    });

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // Now you can jump to any page!
  const handlePageClick = (page: number) => {
    if (page === currentPage) return;

    const targetCursor = allPageCursors[page - 1]; // ← Use the stored cursor!
    setCursor(targetCursor);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Reset pagination when filters change
  useEffect(() => {
    if (prevFiltersRef.current !== filterKey) {
      setCursor(null);
      setCursorHistory([null]);
      setCurrentPage(1);
      prevFiltersRef.current = filterKey;
    }
  }, [filterKey]);

  useEffect(() => {
    async function fetchProducts(options?: { skipPriceRange?: boolean }) {
      setIsLoading(true);
      const sortingOption = resolveSortOption(sortBy);

      const query = {
        first: itemsPerPage,
        after: cursor,
        minPrice,
        maxPrice,
        collection: category,
        subcategory,
        sortBy: sortingOption,
      };

      try {
        const {
          products,
          priceRange: fetchedRange,
          totalCount,
          pageInfo,
          pageCursors, // ← Get the cursors!
        } = await getProducts(query);

        setProducts(products);
        setTotalCount(totalCount);
        setPageInfo(pageInfo);
        setAllPageCursors(pageCursors); // ← Store them!

        if (
          !options?.skipPriceRange &&
          fetchedRange?.min !== undefined &&
          fetchedRange?.max !== undefined
        )
          setPriceRange(fetchedRange);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProducts({ skipPriceRange: true });
  }, [minPrice, maxPrice, sortBy, cursor, category, subcategory]);

  // Refresh price range when category/subcategory changes
  useEffect(() => {
    async function refreshPriceRange() {
      try {
        const sortingOption = resolveSortOption(sortBy);
        const query = {
          first: 1,
          after: null,
          collection: category,
          subcategory,
          sortBy: sortingOption,
        };

        const { priceRange: newRange } = await getProducts(query);

        if (newRange?.min !== undefined && newRange?.max !== undefined)
          setPriceRange(newRange);
      } catch (error) {
        console.error("Error refreshing price range:", error);
      }
    }

    refreshPriceRange();
  }, [category, sortBy, subcategory]);

  const handleCategoryChange = (
    newCategory: string,
    newSubcategory: string
  ) => {
    setCursor(null);
    setCursorHistory([null]);
    setCurrentPage(1);
    updateURL(
      {
        category: newCategory,
        subcategory: newSubcategory,
        minPrice: undefined,
        maxPrice: undefined,
      },
      true
    );
  };

  const handleApplyPriceFilter = (
    newMinPrice?: number,
    newMaxPrice?: number
  ) => {
    setCursor(null);
    setCursorHistory([null]);
    setCurrentPage(1);
    updateURL({ minPrice: newMinPrice, maxPrice: newMaxPrice }, true);
    setIsMobileFilterOpen(false);
  };

  const handleSortChange = (newSort: string) => {
    setCursor(null);
    setCursorHistory([null]);
    setCurrentPage(1);
    updateURL({ sort: newSort }, true);
  };

  const handleNextPage = () => {
    if (pageInfo.hasNextPage && pageInfo.endCursor) {
      setCursorHistory((prev) => [...prev, pageInfo.endCursor]);
      setCursor(pageInfo.endCursor);
      setCurrentPage((p) => p + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      const prevCursor = cursorHistory[newPage - 1] || null;
      setCursor(prevCursor);
      setCurrentPage(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const totalPages = Math.ceil(totalCount / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + products.length, totalCount);

  // Compute pagination buttons (show up to 4)
  const getVisiblePages = () => {
    const pages: number[] = [];
    const maxVisible = 4;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else if (currentPage <= 2) {
      pages.push(1, 2, 3, 4);
    } else if (currentPage >= totalPages - 1) {
      pages.push(totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
    } else {
      pages.push(
        currentPage - 1,
        currentPage,
        currentPage + 1,
        currentPage + 2
      );
    }

    return pages.filter((p) => p >= 1 && p <= totalPages);
  };

  const visiblePages = getVisiblePages();

  return (
    <div>
      <main className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8 xl:gap-16">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              onCategoryChange={handleCategoryChange}
              onApplyPriceFilter={handleApplyPriceFilter}
              priceRange={priceRange}
              categories={categories}
              isLoading={isLoading}
            />
          </div>

          {/* Mobile Filter Overlay */}
          {isMobileFilterOpen && (
            <div
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
              onClick={() => setIsMobileFilterOpen(false)}
            >
              <div
                className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <FilterSidebar
                  filters={filters}
                  onCategoryChange={handleCategoryChange}
                  onApplyPriceFilter={handleApplyPriceFilter}
                  isMobile={true}
                  onClose={() => setIsMobileFilterOpen(false)}
                  priceRange={priceRange}
                  categories={categories}
                  isLoading={isLoading}
                />
              </div>
            </div>
          )}

          {/* Product List + Sorting */}
          <div>
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="hidden md:flex lg:hidden items-center gap-2  cursor-pointer px-4 py-2 uppercase text-xs text-black tracking-normal bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
                >
                  <Filter className="w-4 h-4" />
                  <span className="text-xs font-medium">FILTERS</span>
                </button>
                <p className="text-xs text-gray-600 uppercase">
                  SHOWING {products.length > 0 ? startIndex + 1 : 0}-{endIndex}{" "}
                  OF {totalCount} RESULTS
                </p>
              </div>

              <div className="flex items-center">
                <ProjectSorter sortBy={sortBy} setSortBy={handleSortChange} />
                <Filter
                  className="w-5 h-5 ml-2 sm:hidden cursor-pointer"
                  onClick={() => setIsMobileFilterOpen(true)}
                />
              </div>
            </div>

            {isLoading ? (
              <ProductListSkeleton
                count={itemsPerPage}
                className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
              />
            ) : (
              <div className="min-h-screen">
                <ProductList
                  products={products}
                  className="grid-cols-2 xl:grid-cols-3"
                />
                {products.length === 0 && (
                  <div className="text-center py-12 text-gray-500 text-lg">
                    No products found matching your filters.
                  </div>
                )}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && !isLoading && (
              <div className="flex justify-center lg:justify-start items-center space-x-2 mt-10">
                <button
                  onClick={handlePreviousPage}
                  disabled={currentPage === 1}
                  className={`w-10 h-10 flex items-center justify-center text-gray-500  ${
                    currentPage === 1
                      ? "opacity-50 cursor-not-allowed"
                      : "cursor-pointer"
                  }`}
                >
                  <ChevronsLeft />
                </button>

                {visiblePages.map((page) => (
                  <button
                    key={page}
                    onClick={() => handlePageClick(page)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer ${
                      currentPage === page
                        ? "bg-primary-pink text-white border-primary-pink"
                        : "border-black/20 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={handleNextPage}
                  disabled={!pageInfo.hasNextPage}
                  className={`w-10 h-10 flex items-center justify-center text-gray-500 ${
                    pageInfo.hasNextPage
                      ? "cursor-pointer"
                      : "opacity-50 cursor-not-allowed"
                  }`}
                >
                  <ChevronsRight />
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
