"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Lucide from "../ui/Lucide";

export default function HeroSlider({ slides = [] }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [logoColor, setLogoColor] = useState("black");

  useEffect(() => {
    if (slides.length === 0) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [slides.length]);

  if (slides.length === 0) return null;

  return (
    <section className="relative h-screen overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <Image
            src={`/furniture.jpg`}
            alt={"alt"}
            fill
            className="object-cover"
            priority={index === 0}
            onLoad={() => {
              // Logic to determine logo color based on image brightness
              setLogoColor(index === currentSlide ? "white" : "black");
            }}
          />

          {/* Slide Content */}
          <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
            <div className="text-center text-white max-w-4xl px-4">
              <h1 className="text-6xl font-light uppercase tracking-wide mb-4">
                This is title
              </h1>
              <div className="text-xl mb-8 font-light">
                This is Discriptions
              </div>
              <Link
                href={"/"}
                className="inline-block border border-white px-8 py-3 uppercase tracking-wide font-light hover:bg-white hover:text-black transition-colors duration-300"
              >
                View Project
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation */}
      <div className="absolute right-8 top-1/2 transform -translate-x-1/2 flex">
        <Lucide
          icon="ChevronLeft"
          className="font-bold h-10 w-10 cursor-pointer hover:scale-120 transition-transform duration-300"
          onClick={() =>
            setCurrentSlide(
              (prev) => (prev - 1 + slides.length) % slides.length
            )
          }
        />
        <Lucide
          icon="ChevronRight"
          className="font-bold h-10 w-10 cursor-pointer hover:scale-120 transition-transform duration-300"
          onClick={() => setCurrentSlide((prev) => (prev + 1) % slides.length)}
        />
      </div>
    </section>
  );
}
