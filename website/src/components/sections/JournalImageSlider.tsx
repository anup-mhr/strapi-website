"use client";

import Image from "next/image";
import LinkButton from "../LinkButton";
import { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type ImageData = {
  image: string;
  title: string;
  subtitle: string;
  description: string;
};

export default function JournalImageSlider({ images }: { images: ImageData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 5000;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  // Auto-slide
  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(nextImage, interval);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
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

  if (images.length === 0) return null;

  return (
    <div
      className="group relative w-full overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((img, index) => (
        <div
          key={index}
          className={`transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0 pointer-events-none absolute inset-0"
          }`}
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 custom-lg:grid-cols-[1fr_1.1fr] gap-6 lg:gap-12 items-center p-4">
            <div className="relative w-full h-[25rem] lg:h-[30rem]">
              <Image
                src={img.image}
                alt={img.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </div>

            <div className="flex flex-col gap-4 justify-center">
              <h1 className="!text-black tagline font-semibold text-xl">{img.title}</h1>
              <div>
                <h2 className="font-semibold">{img.subtitle}</h2>
                <p className="font-extralight leading-6">{img.description}</p>
              </div>
              <LinkButton className="px-0 tracking-normal border-b-1 rounded-none py-0 text-black text-base">
                Read Story
              </LinkButton>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="group-hover:block z-50 absolute top-1/2 left-4 -translate-y-1/2 bg-primary/50 hover:bg-black/40 text-white p-3 rounded-full flex items-center justify-center transition"
      >
        <ChevronsLeft size={32} strokeWidth={0.8} />
      </button>

      <button
        onClick={nextImage}
        className="z-50 absolute top-1/2 right-4 -translate-y-1/2 bg-primary/50 hover:bg-black/40 text-white p-3 rounded-full flex items-center justify-center transition"
      >
        <ChevronsRight size={32} strokeWidth={0.8} />
      </button>
    </div>
  );
}
