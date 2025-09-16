"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Lucide from "../ui/Lucide";
import { HeroSlide } from "@/types/heroslide";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides = [] }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logoColor, setLogoColor] = useState("light");
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides?.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 + slides.length) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
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
      {/* Image slides */}
      {slides &&
        slides.length > 0 &&
        slides.map((slide, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-all duration-1000 ease-in-out",
              index === currentSlide ? "opacity-100" : "opacity-0"
            )}
          >
            <Image
              key={index}
              src={`${process.env.NEXT_PUBLIC_BACKEND_URL}${slide.backgroundImage.url}`}
              alt={"alt"}
              fill
              className={cn(
                "object-cover object-center transition-transform duration-[7000ms] ease-out"
              )}
              priority={index === 0}
              onLoad={() => {
                setLogoColor(index === currentSlide ? "light" : "dark");
              }}
            />

            {/* Content */}
            <div
              className={cn(
                "absolute tracking-widest z-10 cursor-default",
                "bottom-1/5 right-4 md:right-8 lg:right-[12rem] pr-4 md:pr-8 lg:pr-[2rem]",
                "sm:bottom-1/4",
                index === currentSlide ? "fadeIn" : ""
              )}
            >
              <h1
                className={cn(
                  "font-semibold capitalize mb-2 group-hover:scale-110 group-hover:tracking-wider transition-all duration-500 ease-out transform hover:translate-x-2",
                  "text-lg sm:text-xl md:text-2xl lg:text-xl",
                  logoColor === "light" ? "text-black" : "text-white"
                )}
              >
                {slide.title}
              </h1>

              <p
                className={cn(
                  "mb-3 uppercase group-hover:scale-105 group-hover:tracking-widest transition-all duration-500 ease-out delay-75 transform hover:translate-x-1",
                  "text-xs sm:text-sm md:text-base lg:text-sm",
                  logoColor === "light" ? "text-black/80" : "text-white/80"
                )}
              >
                {slide.subTitle}
              </p>

              <Link
                href={slide.CTA.href}
                className={cn(
                  "font-light items-center flex gap-3 group/link hover:gap-5 transition-all duration-500 ease-out delay-150 relative overflow-hidden",
                  "py-2 sm:py-3 text-xs sm:text-sm",
                  logoColor === "light" ? "text-black" : "text-white"
                )}
              >
                <span className="relative z-10 group-hover/link:tracking-wider transition-all duration-300">
                  {slide.CTA.label}
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
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/40" />
          </div>
        ))}

      {/* Navigation */}
      <div className="absolute top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500 right-4 sm:right-6 md:right-8">
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
