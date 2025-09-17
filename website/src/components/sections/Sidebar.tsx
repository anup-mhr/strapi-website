"use client";
import { ProjectTitleList } from "@/types/project";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

function Sidebar({ projects , all="ALL WORKS" }: { projects: ProjectTitleList[] , all?:string}) {
  const pathname = usePathname();

  const segment = pathname.split("/").filter(Boolean);

  const allWorks = segment.length === 1;
  const slug = segment[1];

  return (
    <div className="text-black z-25 bg-white top-[5rem] md:top-[12rem] hidden md:block sticky self-start uppercase">
      <Link
        href={`/${segment[0]}`}
        className={clsx("text-sm", allWorks && !slug && "font-semibold")}
      >
        {all}
      </Link>
      <ul className="mt-2 flex flex-col gap-2 text-gray-700 text-sm">
        {projects.map((project) => (
          <li key={project.slug}>
            <Link
              href={`/${segment[0]}/${project.slug}`}
              className={clsx(slug === project.slug && "font-semibold")}
            >
              {project.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
