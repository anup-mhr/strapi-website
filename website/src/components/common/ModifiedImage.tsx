"use client";
import React, { useState } from "react";
import LinkButton from "./LinkButton";
import Image from "next/image";
import { getImageUrl } from "@/lib/helper";
import { ProductDetails, ProjectList } from "@/types/project";

function ModifiedImage({
  project,
  href,
  ctaLabel = "VIEW IMAGE",
  category,
}: {
  project: ProjectList | ProductDetails;
  href: string;
  ctaLabel?: string;
  category?: string;
}) {
  const [isTouched, setIsTouched] = useState(false);

  const handleTouchStart = () => {
    setIsTouched(true);
  };

  const handleTouchEnd = () => {
    // Keep the overlay visible for a short time on mobile
    setTimeout(() => setIsTouched(false), 2000);
  };

  return (
    <div
      className="group relative w-full aspect-square md:min-h-[400px] overflow-hidden shadow-lg flex items-center justify-center"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Mobile overlay - always visible on small screens */}
      <div className="absolute top-1/2 left-1/2 z-10 w-full h-full -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/30 opacity-100 md:opacity-0 md:group-hover:opacity-100 md:group-hover:w-[82%] md:group-hover:h-[82%] transition-all duration-500 ease-in-out">
        <h1 className="uppercase text-sm font-semibold text-white translate-y-0 opacity-100 md:translate-y-4 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-100">
          {"name" in project ? project?.name : project?.title}
        </h1>
        <h1 className="text-white/80 font-medium text-xs uppercase translate-y-0 opacity-100 md:translate-y-6 md:opacity-0 md:group-hover:translate-y-0 md:group-hover:opacity-100 transition-all duration-500 delay-200">
          {"category" in project ? project?.category : category}
        </h1>
        <LinkButton
          href={href}
          className="scale-100 opacity-100 md:scale-90 md:opacity-0 md:group-hover:scale-100 md:group-hover:opacity-100 transition-all duration-500 delay-300 uppercase"
        >
          {ctaLabel}
        </LinkButton>
      </div>

      {/* Touch-based overlay for better mobile interaction */}
      <div
        className={`md:hidden absolute top-1/2 left-1/2 z-10 w-[82%] h-[82%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/40 transition-all duration-500 ease-in-out ${
          isTouched ? "opacity-100" : "opacity-0"
        }`}
      >
        <h1 className="uppercase text-sm font-semibold text-white">
          {"name" in project ? project?.name : project?.title}
        </h1>
        <h1 className="text-white/80 font-medium text-xs uppercase">
          {"category" in project ? project?.category : category}
        </h1>
        <LinkButton href={href} className="uppercase mt-2">
          {ctaLabel}
        </LinkButton>
      </div>

      <Image
        src={getImageUrl(project.thumbnail)}
        alt={"name" in project ? project?.name : project?.title}
        fill
        className="object-cover transform group-hover:scale-110 transition-transform duration-700 ease-in-out"
      />
    </div>
  );
}

export default ModifiedImage;
