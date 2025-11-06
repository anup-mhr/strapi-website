"use client";

import { getImageUrl } from "@/lib/helper";
import { cn } from "@/lib/utils";
import { HeroSlide } from "@/types/heroslide";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState, useRef } from "react";
import Lucide from "../ui/Lucide";

interface HeroSliderProps {
  slides: HeroSlide[];
}

export default function HeroSlider({ slides = [] }: HeroSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [touchEndX, setTouchEndX] = useState<number | null>(null);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(Date.now());
  const SLIDE_DURATION = 8000; // 8 seconds

  // Timer management
  useEffect(() => {
    if (slides.length === 0) return;

    const startTimer = () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      startTimeRef.current = Date.now() - elapsedTime;

      intervalRef.current = setInterval(() => {
        if (!isPaused) {
          const currentElapsed = Date.now() - startTimeRef.current;

          if (currentElapsed >= SLIDE_DURATION) {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
            setElapsedTime(0);
            startTimeRef.current = Date.now();
          } else {
            setElapsedTime(currentElapsed);
          }
        }
      }, 100);
    };

    startTimer();

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [slides.length, isPaused, elapsedTime, currentSlide]);

  const resetTimer = () => {
    setElapsedTime(0);
    startTimeRef.current = Date.now();
  };

  const nextSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev + 1 + slides.length) % slides.length);
    resetTimer(); // Reset timer on manual navigation
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    resetTimer(); // Reset timer on manual navigation
    setTimeout(() => setIsTransitioning(false), 1000);
  };

  // Swipe handling
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.targetTouches[0].clientX);
    setIsPaused(true); // Pause on touch
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStartX || !touchEndX) {
      setIsPaused(false);
      return;
    }

    const distance = touchStartX - touchEndX;

    if (distance > 50) {
      nextSlide();
    }
    if (distance < -50) {
      prevSlide();
    }

    setTouchStartX(null);
    setTouchEndX(null);
    setIsPaused(false); // Resume after touch
  };

  // Mouse down handler for pause
  const handleMouseDown = () => {
    setIsPaused(true);
  };

  const handleMouseUp = () => {
    setIsPaused(false);
  };

  // Content hover handlers
  const handleContentMouseEnter = () => {
    setIsPaused(true);
  };

  const handleContentMouseLeave = () => {
    setIsPaused(false);
  };

  return (
    <section
      className="relative h-svh overflow-hidden group"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Image slides with cross-dissolve effect */}
      {slides &&
        slides.length > 0 &&
        slides.map((slide, index) => {
          const isActive = index === currentSlide;
          const isPrevious =
            index === (currentSlide - 1 + slides.length) % slides.length;
          const isNext = index === (currentSlide + 1) % slides.length;

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
              {slide.backgroundImage?.mime.includes("video") ? (
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
                />
              )}

              {/* Mobile Image */}
              {slide.mobileViewImage?.mime.includes("video") ? (
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
                  "bottom-1/5 right-1/2 transform translate-x-1/2 md:translate-x-0 md:right-8 lg:right-48 pr-0 md:pr-8 lg:pr-8",
                  "sm:bottom-1/4",
                  "transition-all duration-800 ease-out",
                  // Force visibility hidden instead of opacity for inactive slides
                  isActive ? "opacity-100 translate-y-0 visible" : "opacity-0 translate-y-4 invisible"
                )}
                style={{
                  transitionDelay: isActive ? "300ms" : "0ms",
                }}
                onMouseEnter={handleContentMouseEnter}
                onMouseLeave={handleContentMouseLeave}
              >
                <h1
                  className={cn(
                    "font-semibold uppercase drop-shadow-sm drop-shadow-black sm:drop-shadow-none z-30 transition-all duration-500 ease-out text-white",
                    "text-xs sm:text-sm font-semibold sm:font-normal",
                    "hover:translate-x-2",
                    // Force white color and prevent any color transition
                    "!text-white",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    transitionDelay: isActive ? "400ms" : "0ms",
                    color: 'white', // Inline style for extra guarantee
                  }}
                >
                  {slide.title}
                </h1>

                <p
                  className={cn(
                    "mb-2 uppercase drop-shadow-sm drop-shadow-black sm:drop-shadow-none transition-all z-30 duration-500 ease-out text-white",
                    "text-2xs sm:text-xs font-[500] sm:font-normal",
                    "hover:translate-x-1",
                    "!text-white",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    color: 'white',
                  }}
                >
                  {slide.subTitle}
                </p>

                <Link
                  href={slide?.CTA?.href ?? "#"}
                  className={cn(
                    "font-light items-center flex gap-3 group/link hover:gap-5 transition-all duration-500 ease-out relative overflow-hidden",
                    "py-1 md:py-2 text-2xs sm:text-xs text-white",
                    isActive
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-2"
                  )}
                  style={{
                    transitionDelay: isActive ? "600ms" : "0ms",
                  }}
                >
                  <span className="relative font-[500] drop-shadow-sm drop-shadow-black sm:drop-shadow-none sm:font-normal group-hover/link:tracking-wider transition-all duration-300 uppercase">
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
                      "absolute bottom-0 left-0 h-0.5 w-0 group-hover/link:w-full transition-all duration-500 ease-out text-white"
                    )}
                  />
                </Link>
              </div>

              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-linear-to-r from-black/20 via-transparent to-black/40 z-10" />
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