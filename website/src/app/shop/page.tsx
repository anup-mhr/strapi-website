"use client";
import { ProjectSorter, sortOptions } from "@/components/common/ProjectSorter";
import Heading from "@/components/Heading";
import FilterSidebar, { Filters } from "@/components/sections/FilterSidebar";
import Footer from "@/components/sections/Footer";
import Header from "@/components/sections/Header";
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
    categoryId:"",
  });

  const cursor = searchParams?.cursor || null;



  const [sortBy, setSortBy] = useState<string>(sortOptions[0].value);

  const [currentPage, setCurrentPage] = useState<number>(1);
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product: ShopifyProductPreview) => {

      const priceMatch =
        Number(product.variants[0]?.compareAtPrice?.amount || product.variants[0].price.amount) >= filters.minPrice &&
        Number(product.variants[0]?.compareAtPrice?.amount || product.variants[0].price.amount) <= filters.maxPrice;
      return priceMatch;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a: ShopifyProductPreview, b: ShopifyProductPreview) => Number(
          a.variants[0]?.compareAtPrice?.amount || a.variants[0].price.amount
        ) -
          Number(
            b.variants[0]?.compareAtPrice?.amount || b.variants[0].price.amount
          ));
        break;
      case "price-high":
        filtered.sort((a: ShopifyProductPreview, b: ShopifyProductPreview) => Number(
          b.variants[0]?.compareAtPrice?.amount || b.variants[0].price.amount
        ) -
          Number(
            a.variants[0]?.compareAtPrice?.amount || a.variants[0].price.amount
          ));
        break;
      case "name":
        filtered.sort((a: ShopifyProductPreview, b: ShopifyProductPreview) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return filtered;
  }, [
    products,
    sortBy,
  ]);

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
    const query ={
      first: 9,
      after: cursor,
      minPrice: filters.minPrice,
      maxPrice: filters.maxPrice,
      collection: filters.categoryHandle,
      subcategory: filters.subcategory
    }
    
    const { products } = await getProducts(query);
    setProducts(products);
  }

  useEffect(() => {

    fetchProducts();
  }, [cursor]);

  return (
    <div>
      <Header />
      <main className="padding py-12">
        <Heading title="SHOP" subtitle="Our latest products" />

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-[2rem] xl:gap-[4rem]">
          <div className="hidden lg:block">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              onApplyFilters={handleApplyFilters}
            />
          </div>

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
                  setFilters={setFilters}
                  onApplyFilters={handleApplyFilters}
                  isMobile={true}
                  onClose={() => setIsMobileFilterOpen(false)}
                />
              </div>
            </div>
          )}

          <div>
            <div className="flex gap-0.5 sm:gap-0 justify-between items-center mb-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={() => setIsMobileFilterOpen(true)}
                  className="hidden md:flex lg:hidden  items-center gap-2 px-4 py-2 border border-black/20 rounded-md"
                >
                  <Filter className="w-4 h-4" />
                  <span className="hidden md:block text-sm font-medium">
                    FILTERS
                  </span>
                </button>
                <p className="text-xs text-gray-600 uppercase">
                  SHOWING {startIndex + 1}-
                  {Math.min(
                    startIndex + itemsPerPage,
                    filteredAndSortedProducts.length
                  )}{" "}
                  OF {filteredAndSortedProducts.length} RESULTS
                </p>
              </div>
              <div className="flex items-center">
                <ProjectSorter sortBy={sortBy} setSortBy={setSortBy} />

                <Filter
                  className="w-5 h-5 ml-2 sm:hidden"
                  onClick={() => setIsMobileFilterOpen(true)}
                />
              </div>
            </div>

            <ProductList
              products={filteredAndSortedProducts}
              className="grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            />

            {filteredAndSortedProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  No products found matching your filters.
                </p>
              </div>
            )}

            {/* Pagination */}
            <div className="flex justify-start space-x-2 mt-10">
              {[...Array(4)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-full cursor-pointer ${currentPage === i + 1
                    ? "bg-primary-pink text-white"
                    : "border border-black/20 text-gray-600"
                    }`}
                >
                  {i + 1}
                </button>
              ))}
              {totalPages > 4 && currentPage < totalPages && (
                <button
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  className="text-gray-600 cursor-pointer"
                >
                  <ChevronsRight />
                </button>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
