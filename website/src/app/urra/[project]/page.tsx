import React from "react";
import Navigation from "@/components/sections/Navigation";
import Sidebar from "@/components/sections/Sidebar";
import { projects } from "@/constants/constants";
import Button from "@/components/common/Button";
import Image from "next/image";
import Footer from "@/components/sections/Footer";

// export async function generateStaticParams() {
//   // TODO: FUTURE
//   //* RETURN ALL PROJECTS FROM THIS FUNCTION FOR SSG *//
//   //   const blogSlugs = await getAllBlogSlugs();
//   //   return blogSlugs.map((slug) => ({
//   //     id: slug,
//   //   }));
// }

async function page({ params }: { params: Promise<{ project: string }> }) {
  const slug = (await params).project;
  console.log(slug);
  //  const images = projects.find((project)=>project.id===slug)?.images;
  //for now using the 1st itme's images
  const images = projects.find((project) => project.id === '1');



  return (
    <div >
    <p className="text-black text-sm mb-8 tracking-widest leading-7">{images?.description}</p>
    <div className="grid grid-cols-2 gap-2">
      {
        images?.images?.map((img) => (
          <div key={img.id} className="group relative w-full aspect-square flex items-center justify-center">
            <div className="absolute z-2 w-[82%] h-[82%] flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <h1 className="uppercase font-semibold text-lg">{img.title}</h1>
              <h1>URRA DESIGN STUDIO</h1>
              <Button href={`/urra/${slug}/${img.id}`}>
                VIEW IMAGE
              </Button>
            </div>
            <Image src={img.image} alt={img.title} fill className="object-cover" />
          </div>
        ))
      }
    </div>
    </div>
  )
}

export default page;
