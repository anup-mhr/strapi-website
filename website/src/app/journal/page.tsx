"use client";
import Heading from "@/components/common/Heading";
import Loader from "@/components/common/Loader";
import { ProjectSorter } from "@/components/common/ProjectSorter";
import LinkButton from "@/components/LinkButton";
import { journalSortOptions } from "@/constants/sorter";
import { getImageUrl } from "@/lib/helper";
import htmlToPlainText from "@/lib/htmlToPlainText";
import { fetchJournals, IJournal } from "@/lib/strapiApiCall";
import { ChevronsLeft, ChevronsRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 2;

function JournalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("published_date:desc");
  const [journal, setJournal] = useState<IJournal[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch journal entries from API
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const data = await fetchJournals(ITEMS_PER_PAGE, currentPage, sortBy);
        setJournal(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load journal entries"
        );
        console.error("Error fetching journal:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchJournal();
  }, [currentPage, sortBy]);

  // Filter and sort journal entries
  const filteredAndSortedJournal = useMemo(() => {
    if (sortBy === "default") {
      return [...journal];
    }

    const sorted = [...journal];

    switch (sortBy) {
      case "date-newest":
        sorted.sort(
          (a, b) =>
            new Date(b.published_date || 0).getTime() -
            new Date(a.published_date || 0).getTime()
        );
        break;
      case "date-oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.published_date || 0).getTime() -
            new Date(b.published_date || 0).getTime()
        );
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return sorted;
  }, [journal, sortBy]);

  // Calculate pagination
  const totalPages = Math.ceil(
    filteredAndSortedJournal.length / ITEMS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredAndSortedJournal.slice(startIndex, endIndex);

  // Calculate display range
  const displayStart = filteredAndSortedJournal.length > 0 ? startIndex + 1 : 0;
  const displayEnd = Math.min(endIndex, filteredAndSortedJournal.length);

  // Reset to page 1 when filter changes
  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i);
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i);
      } else {
        for (let i = currentPage - 1; i <= currentPage + 1; i++) pages.push(i);
      }
    }

    return pages;
  };

  const pageNumbers = getPageNumbers();

  // Loading state
  if (isLoading) {
    return (
      <>
        <Heading
          title="JOURNAL"
          subtitle="Stories of Craft, Culture and Change"
        />
        <Loader />
      </>
    );
  }

  // Error state
  if (error) {
    return (
      <>
        <Heading
          title="JOURNAL"
          subtitle="Stories of Craft, Culture and Change"
        />
        <div className="flex flex-col justify-center items-center min-h-[300px] sm:min-h-[400px] space-y-4 px-4">
          <p className="text-red-600 text-sm sm:text-base lg:text-lg text-center">
            {error}
          </p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 sm:px-6 py-2 text-sm sm:text-base bg-primary-pink text-white rounded-md hover:bg-opacity-90 transition-all duration-300"
          >
            Retry
          </button>
        </div>
      </>
    );
  }

  // Empty state
  if (journal.length === 0) {
    return (
      <>
        <Heading
          title="JOURNAL"
          subtitle="Stories of Craft, Culture and Change"
        />
        <div className="flex justify-center items-center min-h-[300px] sm:min-h-[400px] px-4">
          <p className="text-gray-600 text-sm sm:text-base lg:text-lg text-center">
            No journal entries found.
          </p>
        </div>
      </>
    );
  }

  return (
    <>
      <Heading
        title="JOURNAL"
        subtitle="Stories of Craft, Culture and Change"
      />

      {/* Filter Bar - Responsive */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-6 sm:mb-8 lg:mb-10">
        <p className="text-[10px] sm:text-xs text-gray-600 whitespace-nowrap">
          SHOWING {displayStart}-{displayEnd} OF{" "}
          {filteredAndSortedJournal.length} RESULTS
        </p>

        <div className="relative w-full sm:w-auto">
          <ProjectSorter
            sortBy={sortBy}
            setSortBy={handleSortChange}
            sortOptions={journalSortOptions}
          />
        </div>
      </div>

      {/* Journal Grid - Responsive */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-12 sm:gap-y-16 lg:gap-y-24 text-gray-700">
        {currentItems.map((item, index) => (
          <div
            key={`${item.id}-${startIndex + index}`}
            className="group opacity-0 animate-fadeInUp"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: "forwards",
            }}
          >
            <div className="overflow-hidden rounded-sm mb-4 sm:mb-5 lg:mb-6">
              <Link href={`/journal/${item.slug}`}>
                <Image
                  src={getImageUrl(item.profile_image)}
                  alt={item.title}
                  width={600}
                  height={600}
                  className="aspect-[3/3.4] md:aspect-[3/3.7] object-cover w-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-95"
                />
              </Link>
            </div>

            <h1 className="text-base sm:text-lg lg:text-xl font-semibold text-black line-clamp-2 capitalize">
              {item.title}
            </h1>
            <h2 className="text-xs gap-3 flex sm:text-sm text-primary-pink capitalize tracking-wider my-1 sm:my-2">
              {item.tags.map((tag) => (
                <p key={tag.id}>{tag.name}</p>
              ))}
            </h2>
            <p className="text-xs text-black sm:text-sm lg:text-base sm:mt-4 mb-4 sm:mb-6 lg:mb-8 line-clamp-3 sm:line-clamp-4 leading-relaxed">
              {htmlToPlainText(item.content).slice(0, 150) + "..."}
            </p>

            <LinkButton
              href={`/journal/${item.slug}`}
              className="bg-black hover:bg-gray-900 text-xs sm:text-sm px-4! transition-all duration-300 hover:translate-x-1 w-full sm:w-auto"
            >
              READ STORY
            </LinkButton>
          </div>
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-12 sm:mt-16 lg:mt-26 px-4">
          {currentPage > 1 && (
            <button
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="text-gray-600 cursor-pointer transition-transform duration-300 hover:-translate-x-1 ml-1 sm:ml-2"
              aria-label="Previous page"
            >
              <ChevronsLeft className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full cursor-pointer transition-all duration-300 text-xs sm:text-sm font-medium ${
                currentPage === pageNum
                  ? "bg-primary-pink text-white scale-105"
                  : "border border-black/20 text-gray-600 hover:border-black/40 hover:scale-105"
              }`}
            >
              {pageNum}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="text-gray-600 cursor-pointer transition-transform duration-300 hover:translate-x-1 ml-1 sm:ml-2"
              aria-label="Next page"
            >
              <ChevronsRight className="w-5 h-5 sm:w-6 sm:h-6" />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default JournalPage;
