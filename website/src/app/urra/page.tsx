import Button from "@/components/common/LinkButton";
import { projects } from "@/constants/constants";
import Image from "next/image";

function page() {
  return (
    <div className="grid grid-cols-2 gap-2">
      {projects.map((project) => (
        <div
          key={project.id}
          className="group relative w-full aspect-square flex items-center justify-center"
        >
          <div className="absolute z-2 w-[82%] h-[82%] flex flex-col items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <h1 className="uppercase font-semibold text-lg">{project.title}</h1>
            <h1>URRA DESIGN STUDIO</h1>
            <Button href={`/urra/${project.id}`}>VIEW IMAGE</Button>
          </div>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
          />
        </div>
      ))}
    </div>
  );
}

export default page;
