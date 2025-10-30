"use client";

import { ProjectSorter } from "@/components/common/ProjectSorter";
import FilterSidebar, { Filters } from "@/components/sections/FilterSidebar";
import ProductList from "@/components/sections/ProductList";
import { shopSortOptions } from "@/constants/sorter";
import { CategoryItem, getProducts } from "@/lib/shopify";
import { ShopifyProductPreview } from "@/types/shopify";
import { Filter } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import ProductListSkeleton from "./common/ProjectListSkeleton";
import Pagination from "./common/Pagination";

export const ITEMS_PER_PAGE = 12;

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

interface ShopClientProps {
  categories: CategoryItem[];
}

export default function ShopClient({ categories }: ShopClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse URL params once
  const urlParams = useMemo(() => {
    const rawSortBy = searchParams.get("sort");
    const minPrice = searchParams.get("minPrice")
      ? parseFloat(searchParams.get("minPrice")!)
      : undefined;
    const maxPrice = searchParams.get("maxPrice")
      ? parseFloat(searchParams.get("maxPrice")!)
      : undefined;

    return {
      sortBy: rawSortBy || "PRICE_ASC",
      minPrice,
      maxPrice,
      category: searchParams.get("category") || "",
      subcategory: searchParams.get("subcategory") || "",
    };
  }, [searchParams]);

  // State
  const [products, setProducts] = useState<ShopifyProductPreview[]>([]);
  const [priceRange, setPriceRange] = useState<{
    min: number | undefined;
    max: number | undefined;
  }>({ min: undefined, max: undefined });
  const [totalCount, setTotalCount] = useState(0);
  const [pageInfo, setPageInfo] = useState({
    hasNextPage: false,
    hasPreviousPage: false,
    endCursor: null as string | null,
    startCursor: null as string | null,
  });
  const [allPageCursors, setAllPageCursors] = useState<(string | null)[]>([
    null,
  ]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const prevFiltersRef = useRef("");
  const filterKey = `${urlParams.category}-${urlParams.subcategory}-${urlParams.minPrice}-${urlParams.maxPrice}-${urlParams.sortBy}`;

  const filters: Filters = {
    minPrice: urlParams.minPrice,
    maxPrice: urlParams.maxPrice,
    category: urlParams.category,
    subcategory: urlParams.subcategory,
  };

  // Update URL helper
  const updateURL = useCallback(
    (
      updates: Record<string, string | number | undefined | null>,
      resetPage = false
    ) => {
      const params = new URLSearchParams(searchParams.toString());

      if (resetPage) params.delete("page");

      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === "" || value === null) {
          params.delete(key);
        } else {
          params.set(key, String(value));
        }
      });

      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  // Reset pagination when filters change
  useEffect(() => {
    if (prevFiltersRef.current !== filterKey) {
      setCursor(null);
      setCurrentPage(1);
      setAllPageCursors([null]);
      prevFiltersRef.current = filterKey;
    }
  }, [filterKey]);

  // Fetch products
  useEffect(() => {
    let isMounted = true;

    async function fetchProducts() {
      setIsLoading(true);
      const sortingOption = resolveSortOption(urlParams.sortBy);

      const query = {
        first: ITEMS_PER_PAGE,
        after: cursor,
        minPrice: urlParams.minPrice,
        maxPrice: urlParams.maxPrice,
        collection: urlParams.category,
        subcategory: urlParams.subcategory,
        sortBy: sortingOption,
      };

      try {
        const {
          products,
          priceRange: fetchedRange,
          totalCount,
          pageInfo,
          pageCursors,
        } = await getProducts(query);

        if (!isMounted) return;

        setProducts(products);
        setTotalCount(totalCount);
        setPageInfo(pageInfo);
        setAllPageCursors(pageCursors);

        // Update price range only on first load or category change
        if (
          fetchedRange?.min !== undefined &&
          fetchedRange?.max !== undefined
        ) {
          setPriceRange(fetchedRange);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    }

    fetchProducts();

    return () => {
      isMounted = false;
    };
  }, [cursor, urlParams]);

  // Handlers
  const handleCategoryChange = useCallback(
    (newCategory: string, newSubcategory: string) => {
      setCursor(null);
      setCurrentPage(1);
      setAllPageCursors([null]);
      updateURL(
        {
          category: newCategory,
          subcategory: newSubcategory,
          minPrice: undefined,
          maxPrice: undefined,
        },
        true
      );
    },
    [updateURL]
  );

  const handleApplyPriceFilter = useCallback(
    (newMinPrice?: number, newMaxPrice?: number) => {
      setCursor(null);
      setCurrentPage(1);
      setAllPageCursors([null]);
      updateURL({ minPrice: newMinPrice, maxPrice: newMaxPrice }, true);
      setIsMobileFilterOpen(false);
    },
    [updateURL]
  );

  const handleSortChange = useCallback(
    (newSort: string) => {
      setCursor(null);
      setCurrentPage(1);
      setAllPageCursors([null]);
      updateURL({ sort: newSort }, true);
    },
    [updateURL]
  );

  const handlePageChange = useCallback(
    (page: number) => {
      if (page === currentPage) return;

      const targetCursor = allPageCursors[page - 1];
      setCursor(targetCursor);
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [currentPage, allPageCursors]
  );

  // Calculate display values
  const totalPages = Math.ceil(totalCount / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = Math.min(startIndex + products.length, totalCount);

  return (
    <div>
      <main className="py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-8 xl:gap-16">
          {/* Desktop Sidebar */}
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
            {/* Filter Bar */}
            <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-6 sm:mb-8 md:mb-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="hidden md:flex lg:hidden items-center gap-2 cursor-pointer px-4 py-2 uppercase text-xs text-black tracking-normal bg-white border border-gray-200 hover:bg-gray-50 transition-colors duration-200"
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
                <ProjectSorter
                  sortBy={urlParams.sortBy}
                  setSortBy={handleSortChange}
                  sortOptions={shopSortOptions}
                />
                <Filter
                  className="w-5 h-5 ml-2 sm:hidden cursor-pointer"
                  onClick={() => setIsMobileFilterOpen(true)}
                />
              </div>
            </div>

            {/* Products Grid */}
            {isLoading ? (
              <ProductListSkeleton
                count={ITEMS_PER_PAGE}
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
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                hasNextPage={pageInfo.hasNextPage}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
