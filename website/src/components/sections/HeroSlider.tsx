"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import LinkButton from "../LinkButton";

type ImageData = {
  url: string;
};

export default function HeroSlider({ images }: { images: ImageData[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const interval = 5000;
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const nextImage = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

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

          <div className="absolute flex flex-col items-center bottom-1/3 -translate-y-1 left-1/2 -translate-x-1/2 z-30 ">
            <p className="text-4xl font-semibold text-white tracking-widest mb-3 uppercase">
              BENREU COLLECTION
            </p>
            <LinkButton href="/shop" className="bg-black uppercase">
              SHOP ALL
            </LinkButton>
          </div>
        </div>
      ))}

      {/* Navigation buttons */}
      <button
        onClick={prevImage}
        className="z-50 absolute bottom-1/3 left-6 sm:left-12 md:left-24 lg:left-32 xl:left-48  bg-black/70 hover:bg-black/30 text-white p-2 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
      >
        <ChevronLeft size={32} strokeWidth={0.8} />
      </button>

      <button
        onClick={nextImage}
        className="z-50 absolute bottom-1/3  right-6 sm:right-12 md:right-24 lg:right-32 xl:right-48 bg-black/70 hover:bg-black/30 text-white p-2 rounded-full flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer"
      >
        <ChevronRight size={32} strokeWidth={0.8} />
      </button>

      <div className="bg-black h-screen w-full absolute -z-10"></div>
    </div>
  );
}
