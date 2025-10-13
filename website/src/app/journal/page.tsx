"use client";
import Heading from "@/components/Heading";
import LinkButton from "@/components/LinkButton";
import { Filters } from "@/components/sections/FilterSidebar";
import { journal, products } from "@/constants/constants";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

const itemsPerPage = 9;
function JournalPage() {
  const [currentPage, setCurrentPage] = useState<number>(1);

  const [filters, setFilters] = useState<Filters>({
    minPrice: 500,
    maxPrice: 10000,
    selectedCategories: [],
    selectedSubcategories: [],
  });
  const [appliedFilters, setAppliedFilters] = useState<Filters>(filters);
  const [sortBy, setSortBy] = useState<string>("default");

  const filteredAndSortedProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const priceMatch =
        product.price >= appliedFilters.minPrice &&
        product.price <= appliedFilters.maxPrice;
      const categoryMatch =
        appliedFilters.selectedCategories.length === 0 ||
        appliedFilters.selectedCategories.includes(product.category);
      const subcategoryMatch =
        appliedFilters.selectedSubcategories.length === 0 ||
        appliedFilters.selectedSubcategories.includes(product.subcategory);
      return priceMatch && categoryMatch && subcategoryMatch;
    });

    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filtered.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }

    return filtered;
  }, [appliedFilters, sortBy]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / itemsPerPage);

  return (
    <>
      <Heading
        title="JOURNAL"
        subtitle="Stories of Craft, Culture and Change"
      />

      <div className="flex justify-between items-center mb-10">
        <p className="text-xs text-gray-600">SHOWING 1-9 OF 16 RESULTS</p>
        <select className="border border-black/20 text-primary rounded-md font-bold tracking-normal pl-6 px-2 py-2">
          <option>FILTER BY</option>
        </select>
      </div>

      <section className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-24 text-gray-700">
        {Array(6)
          .fill(journal[0])
          .map((journal, index) => (
            <div key={index}>
              <Image
                src={journal.image}
                alt={journal.title}
                width={600}
                height={600}
                className="aspect-[3/3.7] w-full mb-6"
              />

              <h1 className="text-lg font-semibold text-black">
                {journal.title}
              </h1>
              <h2 className="text-primary-pink">{journal.subtitle}</h2>
              <p className="mt-4 mb-8 line-clamp-2">{journal.description}</p>

              <LinkButton
                href={"/journal/3"}
                className="bg-black hover:bg-gray-900 text-base tracking-normal"
              >
                READ STORY
              </LinkButton>
            </div>
          ))}
      </section>

      {/* Pagination */}
      <div className="flex justify-center space-x-2 mt-26">
        {[...Array(4)].map((_, i) => (
          <button
            key={i + 1}
            onClick={() => setCurrentPage(i + 1)}
            className={`w-10 h-10 rounded-full cursor-pointer ${
              currentPage === i + 1
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
    </>
  );
}

export default JournalPage;
