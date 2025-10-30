"use client";

import { ShopifyImage } from "@/types/shopify";
import Image from "next/image";
import { useRef, useState } from "react";

type ProductGalleryProps = {
  images: ShopifyImage[];
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [mobileZoom, setMobileZoom] = useState(1);
  const [mobilePosition, setMobilePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const initialDistance = useRef(0);
  const initialZoom = useRef(1);
  const lastTouchCount = useRef(0);
  const dragStartX = useRef(0);

  const handleImageChange = (newIndex: number) => {
    if (
      newIndex >= 0 &&
      newIndex < images.length &&
      newIndex !== selectedImageIndex
    ) {
      setSelectedImageIndex(newIndex);
      setMobileZoom(1);
      setMobilePosition({ x: 0, y: 0 });
      setDragOffset(0);
    }
  };

  const getDistance = (touch1: React.Touch, touch2: React.Touch) => {
    const dx = touch1.clientX - touch2.clientX;
    const dy = touch1.clientY - touch2.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStartX.current = e.touches[0].clientX;
      dragStartX.current = e.touches[0].clientX;
      lastTouchCount.current = 1;
      if (mobileZoom === 1) {
        setIsDragging(true);
      }
    } else if (e.touches.length === 2) {
      initialDistance.current = getDistance(e.touches[0], e.touches[1]);
      initialZoom.current = mobileZoom;
      lastTouchCount.current = 2;
      setIsDragging(false);
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 1 && lastTouchCount.current === 1) {
      touchEndX.current = e.touches[0].clientX;

      if (mobileZoom > 1) {
        // Pan when zoomed
        const deltaX = e.touches[0].clientX - touchStartX.current;
        setMobilePosition((prev) => ({
          x: prev.x + deltaX * 0.5,
          y: prev.y,
        }));
        touchStartX.current = e.touches[0].clientX;
      } else if (isDragging) {
        // Slider drag
        const delta = e.touches[0].clientX - dragStartX.current;
        setDragOffset(delta);
      }
    } else if (e.touches.length === 2) {
      e.preventDefault();
      const currentDistance = getDistance(e.touches[0], e.touches[1]);
      const scale = currentDistance / initialDistance.current;
      const newZoom = Math.min(Math.max(initialZoom.current * scale, 1), 3);
      setMobileZoom(newZoom);
      lastTouchCount.current = 2;
    }
  };

  const handleTouchEnd = () => {
    if (lastTouchCount.current === 1 && mobileZoom === 1 && isDragging) {
      const threshold = 50;

      if (dragOffset < -threshold && selectedImageIndex < images.length - 1) {
        handleImageChange(selectedImageIndex + 1);
      } else if (dragOffset > threshold && selectedImageIndex > 0) {
        handleImageChange(selectedImageIndex - 1);
      } else {
        setDragOffset(0);
      }
    }

    setIsDragging(false);

    // Reset zoom if less than 1.2x
    if (mobileZoom < 1.2) {
      setMobileZoom(1);
      setMobilePosition({ x: 0, y: 0 });
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageContainerRef.current || mobileZoom > 1) return;

    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });
  };

  const handlePrevious = () => {
    if (selectedImageIndex > 0) {
      handleImageChange(selectedImageIndex - 1);
    }
  };

  const handleNext = () => {
    if (selectedImageIndex < images.length - 1) {
      handleImageChange(selectedImageIndex + 1);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center">
      {/* Main Image Slider */}
      <div
        ref={imageContainerRef}
        className="w-full aspect-3/4 lg:aspect-[3/3.5] relative overflow-hidden rounded touch-none"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseEnter={() => mobileZoom === 1 && setIsZoomed(true)}
        onMouseLeave={() => setIsZoomed(false)}
        onMouseMove={handleMouseMove}
      >
        {/* Slider Container */}
        <div
          className="flex h-full transition-transform duration-300 ease-out"
          style={{
            transform: `translateX(calc(-${selectedImageIndex * 100}% - ${
              selectedImageIndex * 10
            }px + ${isDragging ? dragOffset : 0}px))`,
            gap: "10px",
          }}
        >
          {images.map((img, index) => (
            <div key={index} className="shrink-0 w-full h-full relative">
              <Image
                src={img.src}
                alt={`${name} ${index + 1}`}
                width={600}
                height={600}
                className="w-full h-auto transition-transform duration-300 ease-out select-none"
                style={{
                  transform:
                    index === selectedImageIndex
                      ? `scale(${isZoomed ? 1.5 : mobileZoom}) translate(${
                          mobilePosition.x
                        }px, ${mobilePosition.y}px)`
                      : "scale(1)",
                  transformOrigin: isZoomed
                    ? `${mousePosition.x}% ${mousePosition.y}%`
                    : "center",
                  pointerEvents: index === selectedImageIndex ? "auto" : "none",
                }}
                draggable={false}
              />
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {selectedImageIndex > 0 && mobileZoom === 1 && (
          <button
            onClick={handlePrevious}
            className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all z-10"
            aria-label="Previous image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
        )}

        {selectedImageIndex < images.length - 1 && mobileZoom === 1 && (
          <button
            onClick={handleNext}
            className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 hover:bg-white rounded-full items-center justify-center shadow-lg transition-all z-10"
            aria-label="Next image"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => handleImageChange(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === selectedImageIndex
                  ? "bg-white w-6"
                  : "bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Zoom Indicator for Mobile */}
      {mobileZoom > 1 && (
        <div className="lg:hidden absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm z-20">
          {mobileZoom.toFixed(1)}x
        </div>
      )}

      {/* Thumbnails */}
      <div className="w-full flex gap-1.5 sm:gap-2 mt-2 overflow-x-auto">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => handleImageChange(index)}
            className={`shrink-0 w-20 sm:w-28 md:w-32 lg:w-36 aspect-3/4 relative border-2 cursor-pointer transition-all duration-200 rounded ${
              selectedImageIndex === index
                ? "border-primary-pink"
                : "border-transparent"
            } hover:border-primary-pink`}
          >
            <Image
              src={img.src}
              alt={`${name} ${index + 1}`}
              fill
              className="object-cover object-center rounded"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
