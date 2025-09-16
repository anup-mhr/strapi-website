"use client";
import { useState, useEffect } from "react";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type projectData = { slug: string; title: string };

function Sidebar({ projects }: { projects: projectData[] }) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null; // render nothing on first render

  const segment = pathname.split("/").filter(Boolean);
  const allWorks = segment.length === 1;
  const slug = segment[1];

  return (
    <div className="text-black z-25 bg-white top-[5rem] md:top-[12rem] hidden md:block sticky self-start uppercase">
      <Link
        href={`/${segment[0]}`}
        className={clsx("text-sm", allWorks && !slug && "font-semibold")}
      >
        ALL WORKS
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
