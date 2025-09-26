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
// const SWIPE_THRESHOLD = 50;

interface ImageSliderProps {
  images: File[];
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  // const [products, setProducts] = useState<ProductDetails[]>([]);
  // const [touchStart, setTouchStart] = useState<number | null>(null);
  // const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  // const prevImage = () => {
  //   setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  // };

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

  // // Touch handling|| ""
  // const handleTouchStart = (e: React.TouchEvent) => {
  //   setTouchStart(e.targetTouches[0].clientX);
  // };

  // const handleTouchMove = (e: React.TouchEvent) => {
  //   setTouchEnd(e.targetTouches[0].clientX);
  // };

  // const handleTouchEnd = () => {
  //   if (touchStart === null || touchEnd === null) return;

  //   const distance = touchStart - touchEnd;
  //   if (Math.abs(distance) > SWIPE_THRESHOLD) {
  //     // eslint-disable-next-line @typescript-eslint/no-unused-expressions
  //     distance > 0 ? nextImage() : prevImage();
  //   }

  //   setTouchStart(null);
  //   setTouchEnd(null);
  // };

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

  // Fetch products data
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     const projectSlug = currentPath.split("/")?.[2];
  //     if (!projectSlug) return;

  //     try {
  //       const data = await fetchProjectBySlug(projectSlug);
  //       const sortedProducts =
  //         data?.products?.sort((a, b) => a.name.localeCompare(b.name)) || [];
  //       setProducts(sortedProducts);
  //     } catch (error) {
  //       console.error("Failed to fetch products:", error);
  //     }
  //   };

  //   fetchProducts();
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <div className="w-full relative">
      {/* Image Slider */}
      <div
        className="relative h-72 md:h-full md:aspect-video overflow-hidden"
        // onTouchStart={handleTouchStart}
        // onTouchMove={handleTouchMove}
        // onTouchEnd={handleTouchEnd}
      >
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((img, index) => (
            <div
              key={img.id || index}
              className="relative min-w-full h-72 md:h-full md:aspect-video"
            >
              <Image
                src={getImageUrl(img)}
                alt={img.name || `Image ${index + 1}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={index === 0}
              />
            </div>
          ))}
        </div>

        {/* Click zones for navigation */}
        {/* <button
          onClick={prevImage}
          className="absolute left-0 top-0 h-full w-1/4 bg-transparent cursor-pointer"
          aria-label="Previous image"
        />
        <button
          onClick={nextImage}
          className="absolute right-0 top-0 h-full w-1/4 bg-transparent cursor-pointer"
          aria-label="Next image"
        /> */}
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
