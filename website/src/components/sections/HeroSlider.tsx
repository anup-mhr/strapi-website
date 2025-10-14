"use client";

import { getImageUrl } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { HeroSlide } from "@/types/heroslide";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Lucide from "../ui/Lucide";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides = [] }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logoColor, setLogoColor] = useState("dark");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [slides?.length]);

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) return;

    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      // swipe left → next
      nextSlide();
    }
    if (distance < -50) {
      // swipe right → prev
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
  };

  return (
    <section
      className="relative h-svh overflow-hidden group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Image slides with cross-dissolve effect */}
      {slides &&
        slides.length > 0 &&
        slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPrevious =
            index === (currentSlide - 1 + slides.length) % slides.length;
          const isNext = index === (currentSlide + 1) % slides.length;

          // Show current slide and adjacent slides for smooth transition
          const shouldRender = isActive || isPrevious || isNext;

          return shouldRender ? (
            <div
              key={index}
              className={cn(
                "absolute inset-0 transition-opacity duration-1500 ease-in-out",
                isActive ? "opacity-100 z-20" : "opacity-0 z-10"
              )}
              style={{
                transitionDelay: isActive ? "0ms" : "0ms",
              }}
            >
              {/* Desktop Image */}
              {slide.backgroundImage.mime.includes("video") ? (
                <video
                  src={getImageUrl(slide.backgroundImage)}
                  autoPlay
                  muted
                  loop
                  className={cn(
                    "hidden custom-md:block object-cover object-center w-full h-full",
                    "transition-all duration-1000 ease-in-out",
                    isActive ? "scale-100" : "scale-105"
                  )}
                />
              ) : (
                <Image
                  src={getImageUrl(slide.backgroundImage)}
                  alt={slide.title}
                  fill
                  className={cn(
                    "hidden custom-md:block object-cover object-center",
                    "transition-all duration-1000 ease-in-out",
                    isActive ? "scale-100" : "scale-105"
                  )}
                  priority={index === 0 || isActive}
                  // onLoad={() => {
                  //   if (isActive) {
                  //     setLogoColor("light");
                  //   }
                  // }}
                />
              )}

              {/* Mobile Image */}
              {slide.mobileViewImage.mime.includes("video") ? (
                <video
                  src={getImageUrl(slide.mobileViewImage)}
                  autoPlay
                  muted
                  loop
                  className={cn(
                    "block custom-md:hidden object-cover object-center w-full h-full",
                    "transition-all duration-1000 ease-in-out",
                    isActive ? "scale-100" : "scale-105"
                  )}
                />
              ) : (
                <Image
                  src={getImageUrl(slide.mobileViewImage)}
                  alt={slide.title}
                  fill
                  className={cn(
                    "block custom-md:hidden object-cover object-center",
                    "transition-all duration-1000 ease-in-out",
                    isActive ? "scale-100" : "scale-105"
                  )}
                  priority={index === 0 || isActive}
                />
              )}

              {/* Content with staggered animation */}

              <div
                className={cn(
                  "absolute tracking-widest md:min-w-36 z-30 cursor-default",
                  "bottom-1/5 right-1/2 transform translate-x-1/2 md:translate-x-0 md:right-8 lg:right-[12rem] pr-0 md:pr-8 lg:pr-[2rem]",
                  "sm:bottom-1/4",
                  "transition-all duration-800 ease-out",
                  isActive
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-4"
                )}
                style={{
                  transitionDelay: isActive ? "300ms" : "0ms",
                }}
              >
                <h1
                  className={cn(
                    "font-semibold uppercase transition-all duration-500 ease-out",
                    "text-xs sm:text-sm",
                    "hover:translate-x-2",
                    logoColor === "light" ? "text-black" : "text-white",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    transitionDelay: isActive ? "400ms" : "0ms",
                  }}
                >
                  {slide.title}
                </h1>

                <p
                  className={cn(
                    "mb-2 uppercase transition-all duration-500 ease-out",
                    "text-2xs sm:text-xs",
                    "hover:translate-x-1",
                    logoColor === "light" ? "text-black/80" : "text-white/80",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  // style={{
                  //   transitionDelay: isActive ? "500ms" : "0ms",
                  // }}
                >
                  {slide.subTitle}
                </p>

                <Link
                  href={slide?.CTA?.href ?? "#"}
                  className={cn(
                    "font-light items-center flex gap-3 group/link hover:gap-5 transition-all duration-500 ease-out relative overflow-hidden",
                    "py-1 md:py-2 text-2xs sm:text-xs",
                    logoColor === "light" ? "text-black" : "text-white",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    transitionDelay: isActive ? "600ms" : "0ms",
                  }}
                >
                  <span className="relative z-10 group-hover/link:tracking-wider transition-all duration-300 uppercase">
                    {slide?.CTA?.label ?? "view work"}
                  </span>

                  <Lucide
                    icon="ChevronRight"
                    size={4}
                    className="transform group-hover/link:translate-x-1 group-hover/link:scale-110 transition-all duration-300 relative z-10 w-3 h-3 sm:w-4 sm:h-4"
                  />

                  {/* Animated underline */}
                  <div
                    className={cn(
                      "absolute bottom-0 left-0 h-0.5 w-0 group-hover/link:w-full transition-all duration-500 ease-out",
                      logoColor === "light" ? "bg-black" : "bg-white"
                    )}
                  />
                </Link>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40 z-10" />
            </div>
          ) : null;
        })}

      {/* Navigation */}
      <div className="absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 right-4 sm:right-6 md:right-8 z-40">
        <div className="backdrop-blur-md flex items-center justify-center bg-black/30 hover:bg-black/50 transition-all duration-300 hover:scale-110 border border-white/20 rounded-full w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20">
          <Lucide
            icon="ChevronLeft"
            className="cursor-pointer hover:scale-125 transition-all duration-300 text-white hover:text-white/80 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
            onClick={prevSlide}
          />
          <Lucide
            icon="ChevronRight"
            className="cursor-pointer hover:scale-125 transition-all duration-300 text-white hover:text-white/80 w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8"
            onClick={nextSlide}
          />
        </div>
      </div>
    </section>
  );
}
