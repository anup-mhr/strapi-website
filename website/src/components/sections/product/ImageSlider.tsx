"use client";

import Lucide from "@/components/ui/Lucide";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { getImageUrl } from "@/lib/helper";
import { useProduct } from "@/lib/strapiApiCall";
import { File } from "@/types/heroslide";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const SLIDE_INTERVAL = 5000;

interface ImageSliderProps {
  images: File[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const { currentPath } = useNavigationHistory();
  const router = useRouter();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const projectSlug = currentPath.split("/")?.[2];
  const { data } = useProduct(projectSlug);
  const products = data?.products || [];

  const parentPath = currentPath.split("/").slice(0, -1).join("/");
  const currentSlug = currentPath.split("/").pop();

  // Navigation functions
  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const navigateToProduct = (direction: "next" | "previous") => {
    if (products.length < 2) return;

    const currentIndex = products.findIndex((p: any) => p.slug === currentSlug);
    if (currentIndex === -1) return;

    let targetIndex: number;
    if (direction === "next") {
      targetIndex = (currentIndex + 1) % products.length;
    } else {
      targetIndex = (currentIndex - 1 + products.length) % products.length;
    }

    const targetSlug = products[targetIndex].slug;
    router.push(`${parentPath}/${targetSlug}`);
  };

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = setTimeout(nextImage, SLIDE_INTERVAL);
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentIndex]);

  return (
    <div className="w-full relative">
      {/* Image Slider */}
      <div className="relative w-full h-full overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div key={index} className="relative min-w-full h-full">
              <Image
                src={getImageUrl(img)}
                alt={img.name || `Image ${index + 1}`}
                // fill
                width={600}
                height={600}
                className="object-center w-full h-full"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center py-4 justify-end gap-6 lg:gap-10 px-5 md:px-0">
        <Link
          href={parentPath}
          className="hover:opacity-70 transition-opacity text-2xs tracking-[2px] uppercase"
        >
          Back to Project
        </Link>

        <div className="inline-flex gap-2 md:gap-6 text-2xs">
          <button
            onClick={() => navigateToProduct("previous")}
            className="inline-flex items-center uppercase cursor-pointer hover:opacity-70 transition-opacity"
            disabled={products.length < 2}
          >
            <Lucide icon="ChevronLeft" size={4} />
            <span className="hidden sm:block">Previous</span>
          </button>

          <button
            onClick={() => navigateToProduct("next")}
            className="inline-flex items-center uppercase cursor-pointer hover:opacity-70 transition-opacity"
            disabled={products.length < 2}
          >
            <span className="hidden sm:block">Next</span>
            <Lucide icon="ChevronRight" size={4} />
          </button>
        </div>
      </div>
    </div>
  );
}
