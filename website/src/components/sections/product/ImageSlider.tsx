"use client";

import Lucide from "@/components/ui/Lucide";
import { useNavigationHistory } from "@/hooks/useNavigationHistory";
import { getImageUrl } from "@/lib/helper";
import { useProduct } from "@/lib/strapiApiCall";
import { File } from "@/types/heroslide";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ImageSliderProps {
  images: File;
}

export default function ImageSlider({ images }: ImageSliderProps) {
  const { currentPath } = useNavigationHistory();
  const router = useRouter();

  const projectSlug = currentPath.split("/")?.[2];
  const { data } = useProduct(projectSlug);
  const products = data?.products || [];

  const parentPath = currentPath.split("/").slice(0, -1).join("/");
  const currentSlug = currentPath.split("/").pop();

  // Navigation functions

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

  return (
    <div className="w-full relative">
      {/* Image Slider */}
      <div className="relative w-full h-full overflow-hidden">
        <div className="flex transition-transform duration-500 ease-in-out">
          <div className="relative min-w-full h-full">
            <Image
              src={getImageUrl(images)}
              alt={images.name}
              // fill
              width={600}
              height={600}
              className="object-center w-full h-full"
              priority
            />
          </div>
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
