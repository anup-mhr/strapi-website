"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import Lucide from "../ui/Lucide";

export default function HeroSlider({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logoColor, setLogoColor] = useState("dark");

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1 + slides.length) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  if (slides.length === 0) return null;

  return (
    <section className="relative h-screen overflow-hidden group">
      {/* Image slides */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={cn(
            "absolute inset-0 transition-all duration-1000 ease-in-out",
            index === currentSlide ? "opacity-100" : "opacity-0"
          )}
        >
          <Image
            key={index}
            src={`/furniture.jpg`}
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
              "absolute tracking-widest bottom-1/5 right-[12rem] pr-[2rem] group cursor-default z-10",
              index === currentSlide ? "fadeIn" : ""
            )}
          >
            <h1
              className={cn(
                "font-semibold text-xl mb-2 group-hover:scale-110 group-hover:tracking-wider transition-all duration-500 ease-out transform hover:translate-x-2",
                logoColor === "light" ? "text-black" : "text-white"
              )}
            >
              MOLOK CHAIR
            </h1>

            <p
              className={cn(
                "text-sm mb-3 group-hover:scale-105 group-hover:tracking-widest transition-all duration-500 ease-out delay-75 transform hover:translate-x-1",
                logoColor === "light" ? "text-black/80" : "text-white/80"
              )}
            >
              AKU ZELIANG
            </p>

            <Link
              href={"/"}
              className={cn(
                "text-sm py-3 font-light items-center flex gap-3 group/link hover:gap-5 transition-all duration-500 ease-out delay-150 relative overflow-hidden",
                logoColor === "light" ? "text-black" : "text-white"
              )}
            >
              <span className="relative z-10 text-sm group-hover/link:tracking-wider transition-all duration-300">
                VIEW WORK
              </span>

              <Lucide
                icon="ChevronRight"
                size={4}
                className="transform group-hover/link:translate-x-1 group-hover/link:scale-110 transition-all duration-300 relative z-10"
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
      <div className="absolute right-8 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="backdrop-blur-md flex items-center justify-center bg-black/30 hover:bg-black/50 w-20 h-20 rounded-full transition-all duration-300 hover:scale-110 border border-white/20">
          <Lucide
            icon="ChevronLeft"
            className="h-8 w-8 cursor-pointer hover:scale-125 transition-all duration-300 text-white hover:text-white/80"
            onClick={prevSlide}
          />
          <Lucide
            icon="ChevronRight"
            className="h-8 w-8 cursor-pointer hover:scale-125 transition-all duration-300 text-white hover:text-white/80"
            onClick={nextSlide}
          />
        </div>
      </div>
    </section>
  );
}
