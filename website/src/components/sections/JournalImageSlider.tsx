"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LinkButton from "../LinkButton";

type ImageData = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

export default function JournalImageSlider({
  journals,
}: {
  journals: ImageData[];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 5000;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % journals.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + journals.length) % journals.length);

  // Auto-slide
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextImage, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  // Swipe handling
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) =>
    setTouchStart(e.targetTouches[0].clientX);
  const handleTouchMove = (e: React.TouchEvent) =>
    setTouchEnd(e.targetTouches[0].clientX);
  const handleTouchEnd = () => {
    if (touchStart !== null && touchEnd !== null) {
      const distance = touchStart - touchEnd;
      if (distance > 50) nextImage();
      else if (distance < -50) prevImage();
    }
    setTouchStart(null);
    setTouchEnd(null);
  };

  if (journals.length === 0) return null;

  return (
    <div
      className="group relative w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {journals.map((img, index) => (
        <div
          key={index}
          className={`transition-opacity duration-1000 ease-in-out ${
            index === currentIndex
              ? "opacity-100"
              : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 custom-lg:grid-cols-[1fr_1.1fr] gap-4 sm:gap-6 lg:gap-12 items-center p-3 sm:p-4">
            <div className="relative w-full h-[20rem] sm:h-[22rem] md:h-[25rem] lg:h-[28rem] xl:h-[30rem]">
              <Image
                src={img.image}
                alt={img.title}
                fill
                className="object-cover object-center"
                priority={index === 0}
              />
            </div>

            <div className="flex flex-col gap-3 sm:gap-4 justify-center px-2 sm:px-0">
              <h1 className="!text-black tagline font-semibold text-base sm:text-lg md:text-xl">
                {img.title}
              </h1>
              <div>
                <h2 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2">
                  {img.subtitle}
                </h2>
                <p className="font-extralight leading-5 sm:leading-6 text-xs sm:text-sm md:text-base">
                  {img.description}
                </p>
              </div>
              <LinkButton
                // href={`/journal/${img.slug || ""}`}
                className="px-0 tracking-normal border-b-1 rounded-none py-0 text-black text-sm sm:text-base"
              >
                Read Story
              </LinkButton>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="group-hover:block z-50 absolute top-1/2 left-2 sm:left-3 md:left-4 -translate-y-1/2 bg-black/50 hover:bg-black/40 text-white p-1.5 sm:p-2 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
        aria-label="Previous story"
      >
        <ChevronLeft
          size={24}
          strokeWidth={0.8}
          className="sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      </button>

      <button
        onClick={nextImage}
        className="z-50 absolute top-1/2 right-2 sm:right-3 md:right-4 -translate-y-1/2 bg-black/50 hover:bg-black/40 text-white p-1.5 sm:p-2 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
        aria-label="Next story"
      >
        <ChevronRight
          size={24}
          strokeWidth={0.8}
          className="sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      </button>
    </div>
  );
}
