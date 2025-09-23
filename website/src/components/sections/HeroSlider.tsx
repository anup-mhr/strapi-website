"use client";

import Image from "next/image";
import LinkButton from "../LinkButton";
import { useEffect, useRef, useState } from "react";
import { ChevronsLeft, ChevronsRight } from "lucide-react";

type ImageData = {
  url: string;
};

export default function HeroSlider({ images }: { images: ImageData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 5000;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

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

  return (
    <div
      className="w-full h-screen relative overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {images.map((img, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100 z-20" : "opacity-0 z-10"
          }`}
        >
          <Image
            src={img.url}
            alt="hero"
            fill
            sizes="100vw"
            className="object-cover"
            priority={index === 0}
          />

          <LinkButton className="absolute bottom-1/4 -translate-y-1 left-1/2 -translate-x-1/2 z-30 bg-primary-brown-dark/50">
            SHOP ALL
          </LinkButton>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="z-50 absolute bottom-1/4 left-6 sm:left-12 md:left-24 lg:left-32 xl:left-48  bg-primary-brown-dark/50 hover:bg-black/40 text-white p-3 rounded-full flex items-center justify-center transition"
      >
        <ChevronsLeft size={32} strokeWidth={0.8}  />
      </button>

      <button
        onClick={nextImage}
        className="z-50 absolute bottom-1/4  right-6 sm:right-12 md:right-24 lg:right-32 xl:right-48 bg-primary-brown-dark/50 hover:bg-black/40 text-white p-3 rounded-full flex items-center justify-center transition"
      >
        <ChevronsRight size={32} strokeWidth={0.8}  />
      </button>

      <div className="bg-black h-screen w-full absolute -z-10"></div>
    </div>
  );
}
