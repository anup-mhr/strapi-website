"use client";
import { useSort } from "@/context/SortContext";
import { sortProjects } from "@/lib/helper";
import { ProjectTitleList } from "@/types/project";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface SidebarProps {
  projects: ProjectTitleList[];
  all?: string;
}

function Sidebar({ projects, all = "ALL WORKS" }: SidebarProps) {
  const pathname = usePathname();
  const { currentSort } = useSort();

  const segment = pathname.split("/").filter(Boolean);
  const allWorks = segment.length === 1;
  const slug = segment[1];

  const sortedProjects = sortProjects(projects, currentSort);

  return (
    <div className="text-black z-25 bg-white top-20 md:top-36 hidden md:block md:sticky self-start uppercase">
      <div className="flex items-center justify-between mb-4">
        <div className="hover:font-semibold transition-transform duration-500 ease-in-out hover:transform hover:translate-x-2">
          {sortedProjects.length > 0 && (
            <Link
              href={`/${segment[0]}`}
              className={clsx("text-xs", allWorks && !slug && "font-semibold")}
            >
              {all}
            </Link>
          )}
        </div>
      </div>

      <ul className="mt-1 flex flex-col gap-2 text-gray-700 text-xs">
        {sortedProjects.map((project) => (
          <li
            key={project.slug}
            className="hover:font-semibold transition-transform duration-500 ease-in-out hover:transform hover:translate-x-2"
          >
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
