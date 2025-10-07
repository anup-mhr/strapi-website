"use client";

import Image from "next/image";
import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  name: string;
};

export default function ProductGallery({ images, name }: ProductGalleryProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  return (
    <div className="w-full flex flex-col items-center">
      {/* Main Image */}
      <div className="w-full aspect-[3/3.7] relative">
        <Image
          src={images[selectedImageIndex]}
          alt={name}
          fill
          className="object-cover rounded"
        />
      </div>

      {/* Thumbnails */}
      <div className="w-full flex gap-2 mt-2">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setSelectedImageIndex(index)}
            className={`w-36 aspect-[3/4] relative border-2 ${
              selectedImageIndex === index
                ? "border-black"
                : "border-transparent"
            } hover:border-black`}
          >
            <Image
              src={img}
              alt={`${name} ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
