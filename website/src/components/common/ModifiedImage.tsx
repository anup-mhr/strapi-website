import React from "react";
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
  console.log("project in modified image", project);
  return (
    <div className="group relative w-full aspect-square overflow-hidden shadow-lg flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 z-10 w-full h-full group-hover:w-[82%] group-hover:h-[82%] -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-500 ease-in-out">
        <h1 className="uppercase text-base font-semibold text-white translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">
          {"name" in project ? project?.name : project?.title}
        </h1>
        <h1 className="text-white/80 font-medium text-sm uppercase translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-200">
          {"category" in project ? project?.category : category}
        </h1>
        <LinkButton
          href={href}
          className="scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-500 delay-300 uppercase"
        >
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
