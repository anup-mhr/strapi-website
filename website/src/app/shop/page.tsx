"use client";
import { ProjectSorter, sortOptions } from "@/components/common/ProjectSorter";
import FilterSidebar, { Filters } from "@/components/sections/FilterSidebar";
import ProductList from "@/components/sections/ProductList";
import { getProducts } from "@/lib/shopify";
import { ShopifyProductPreview } from "@/types/shopify";
import { ChevronsRight, Filter } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const itemsPerPage = 9;

export default function ShopPage({
  searchParams,
}: {
  searchParams: { page?: string; cursor?: string };
}) {
  const [products, setProducts] = useState<any>([]);

  const [filters, setFilters] = useState<Filters>({
    minPrice: 0,
    maxPrice: 10000,
    category: "",
    subcategory: "",
    categoryHandle: "",
    categoryId: "",
  });

  const cursor = searchParams?.cursor || null;

  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product: ShopifyProductPreview) => {
      const priceMatch =
        Number(
          product.variants[0]?.compareAtPrice?.amount ||
            product.variants[0].price.amount
        ) >= filters.minPrice &&
        Number(
          product.variants[0]?.compareAtPrice?.amount ||
            product.variants[0].price.amount
        ) <= filters.maxPrice;
      return priceMatch;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort(
          (a: ShopifyProductPreview, b: ShopifyProductPreview) =>
            Number(
              a.variants[0]?.compareAtPrice?.amount ||
                a.variants[0].price.amount
            ) -
            Number(
              b.variants[0]?.compareAtPrice?.amount ||
                b.variants[0].price.amount
            )
        );
        break;
      case "price-high":
        filtered.sort(
          (a: ShopifyProductPreview, b: ShopifyProductPreview) =>
            Number(
              b.variants[0]?.compareAtPrice?.amount ||
                b.variants[0].price.amount
            ) -
            Number(
              a.variants[0]?.compareAtPrice?.amount ||
                a.variants[0].price.amount
            )
        );
        break;
      case "name":
        filtered.sort((a: ShopifyProductPreview, b: ShopifyProductPreview) =>
          a.title.localeCompare(b.title)
        );
        break;
      default:
        break;
    }
    return filtered;
  }, [filters.maxPrice, filters.minPrice, products, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredAndSortedProducts.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleApplyFilters = () => {
    fetchProducts();
    setCurrentPage(1);
    setIsMobileFilterOpen(false);
  };

  async function fetchProducts() {
    console.log("applying filers to applied", filters);
    const query = {
      first: 9,
      after: cursor,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      collection: filters.categoryHandle,
      subcategory: filters.subcategory,
    };

    const { products } = await getProducts(query);
    setProducts(products);
  }

  useEffect(() => {
    fetchProducts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cursor]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-6 md:gap-8 xl:gap-[4rem]">
      <div className="hidden lg:block">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          onApplyFilters={handleApplyFilters}
          // handleCategoryClick={handleCategoryClick}
          // handleSubcategoryClick={handleSubcategoryClick}
        />
      </div>

      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsMobileFilterOpen(false)}
        >
          <div
            className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-white p-4 sm:p-6 overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={handleApplyFilters}
              isMobile={true}
              onClose={() => setIsMobileFilterOpen(false)}
            />
          </div>
        </div>
      )}

      <div>
        <div className="flex gap-0.5 sm:gap-0 justify-between items-center mb-6 sm:mb-8 md:mb-10">
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="hidden md:flex lg:hidden items-center gap-2 px-4 py-2 border border-black/20 rounded-md"
            >
              <Filter className="w-4 h-4" />
              <span className="hidden md:block text-sm font-medium">
                FILTERS
              </span>
            </button>

            <p className="text-2xs sm:text-xs text-gray-600 uppercase">
              Showing {startIndex + 1}-
              {Math.min(
                startIndex + itemsPerPage,
                filteredAndSortedProducts.length
              )}{" "}
              of {filteredAndSortedProducts.length} results
            </p>
          </div>
          <div className="flex items-center justify-end">
            <ProjectSorter sortBy={sortBy} setSortBy={setSortBy} />

            <Filter
              className="h-4 w-4 md:w-5 md:h-5 ml-2 sm:hidden "
              onClick={() => setIsMobileFilterOpen(true)}
            />
          </div>
        </div>

        <ProductList
          products={filteredAndSortedProducts}
          className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
        />

        {filteredAndSortedProducts.length === 0 && (
          <div className="text-center py-8 sm:py-10 md:py-12">
            <p className="text-gray-500 text-sm sm:text-base md:text-lg">
              No products found matching your filters.
            </p>
          </div>
        )}

        {/* Pagination */}
        {totalPages > 1 && filteredAndSortedProducts.length > 0 && (
          <div className="flex justify-start items-center space-x-1.5 sm:space-x-2 mt-8 sm:mt-9 md:mt-10">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full cursor-pointer text-xs sm:text-sm transition-colors duration-200 ${
                  currentPage === i + 1
                    ? "bg-primary-pink text-white"
                    : "border border-black/20 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {i + 1}
              </button>
            ))}
            {currentPage < totalPages && (
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="text-gray-600 cursor-pointer hover:text-black transition-colors duration-200 p-1"
                aria-label="Next page"
              >
                <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
