"use client";
import Loader from "@/components/common/Loader";
import Heading from "@/components/Heading";
import LinkButton from "@/components/LinkButton";
import { ChevronsRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

const ITEMS_PER_PAGE = 9;

const FILTER_OPTIONS = [
  { value: "default", label: "FILTER BY" },
  { value: "date-newest", label: "NEWEST FIRST" },
  { value: "date-oldest", label: "OLDEST FIRST" },
  { value: "title-asc", label: "TITLE: A-Z" },
  { value: "title-desc", label: "TITLE: Z-A" },
];

interface JournalEntry {
  id: string | number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  date?: string;
}

function JournalPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("default");
  const [journal, setJournal] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch journal entries from API
  useEffect(() => {
    const fetchJournal = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch("/api/journal", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(
            `Failed to fetch journal entries: ${response.statusText}`
          );
        }

        const data = await response.json();
        setJournal(data.journal || data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load journal entries"
        );
        console.error("Error fetching journal:", err);
      } finally {
        setIsLoading(false);
      }
    };

    // fetchJournal();
  }, []);

  // Filter and sort journal entries
  const filteredAndSortedJournal = useMemo(() => {
    const sorted = [...journal];

    switch (sortBy) {
      case "date-newest":
        sorted.sort(
          (a, b) =>
            new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
        );
        break;
      case "date-oldest":
        sorted.sort(
          (a, b) =>
            new Date(a.date || 0).getTime() - new Date(b.date || 0).getTime()
        );
        break;
      case "title-asc":
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case "title-desc":
        sorted.sort((a, b) => b.title.localeCompare(a.title));
        break;
      default:
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
        <div className="flex flex-col justify-center items-center min-h-[400px] space-y-4">
          <p className="text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-primary-pink text-white rounded-md hover:bg-opacity-90 transition-all duration-300"
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
        <div className="flex justify-center items-center min-h-[400px]">
          <p className="text-gray-600 text-lg">No journal entries found.</p>
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

      <div className="flex justify-between items-center mb-10">
        <p className="text-xs text-gray-600">
          SHOWING {displayStart}-{displayEnd} OF{" "}
          {filteredAndSortedJournal.length} RESULTS
        </p>
        <select
          value={sortBy}
          onChange={(e) => handleSortChange(e.target.value)}
          className="border border-black/20 text-primary rounded-md font-bold tracking-normal pl-6 px-2 py-2 transition-all duration-300 hover:border-black/40 cursor-pointer"
        >
          {FILTER_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 gap-y-24 text-gray-700">
        {currentItems.map((item, index) => (
          <div
            key={`${item.id}-${startIndex + index}`}
            className="group opacity-0 animate-fadeInUp"
            style={{
              animationDelay: `${index * 150}ms`,
              animationFillMode: "forwards",
            }}
          >
            <div className="overflow-hidden rounded-sm mb-6">
              <Image
                src={item.image}
                alt={item.title}
                width={600}
                height={600}
                className="aspect-[3/3.7] w-full transition-all duration-700 ease-out group-hover:scale-110 group-hover:brightness-95"
              />
            </div>

            <h1 className="text-lg font-semibold text-black">{item.title}</h1>
            <h2 className="text-primary-pink">{item.subtitle}</h2>
            <p className="mt-4 mb-8 line-clamp-2">{item.description}</p>

            <LinkButton
              href={`/journal/${item.id}`}
              className="bg-black hover:bg-gray-900 text-base tracking-normal transition-all duration-300 hover:translate-x-1"
            >
              READ STORY
            </LinkButton>
          </div>
        ))}
      </section>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-26">
          {pageNumbers.map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`w-10 h-10 rounded-full cursor-pointer transition-all duration-300 ${
                currentPage === pageNum
                  ? "bg-primary-pink text-white"
                  : "border border-black/20 text-gray-600 hover:border-black/40 hover:scale-105"
              }`}
            >
              {pageNum}
            </button>
          ))}
          {currentPage < totalPages && (
            <button
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="text-gray-600 cursor-pointer transition-transform duration-300 hover:translate-x-1"
              aria-label="Next page"
            >
              <ChevronsRight />
            </button>
          )}
        </div>
      )}
    </>
  );
}

export default JournalPage;
