"use client";

import Lucide from "@/components/ui/Lucide";
import { getImageUrl } from "@/lib/helper";
import { File } from "@/types/heroslide";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function ImageSlider({ images }: { images: File[] }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const pathname = usePathname();

  const parentPath = pathname.split("/").slice(0, -1).join("/") || "/";

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
    <div className="w-full relative">
      <div
        className="relative aspect-video overflow-hidden"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative min-w-full aspect-video">
              <Image
                src={getImageUrl(img)}
                alt={img.name}
                fill
                sizes="(max-width: 640px) 100vw, 
         (max-width: 1024px) 50vw, 
         33vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Invisible left/right click zones */}
        <button
          onClick={prevImage}
          className="absolute left-0 top-0 h-full w-1/4 bg-transparent cursor-pointer"
        />
        <button
          onClick={nextImage}
          className="absolute right-0 top-0 h-full w-1/4 bg-transparent cursor-pointer"
        />
      </div>

      {/* Controls */}
      <div className="flex items-center py-6 lg:py-4 justify-end text-xs gap-6 lg:gap-10">
        <Link className="hover:opacity-70 transition-opacity" href={parentPath}>
          BACK TO PROJECT
        </Link>

        <div className="inline-flex gap-4 md:gap-6">
          <button
            onClick={prevImage}
            className="inline-flex items-center uppercase cursor-pointer hover:opacity-70 transition-opacity"
          >
            <Lucide icon={"ChevronLeft"} size={6} />
            <p className="hidden sm:block">PREVIOUS</p>
          </button>

          <button
            onClick={nextImage}
            className="inline-flex items-center  uppercase cursor-pointer hover:opacity-70 transition-opacity"
          >
            <p className="hidden sm:block">NEXT</p>
            <Lucide icon={"ChevronRight"} size={6} />
          </button>
        </div>
      </div>
    </div>
  );
}
