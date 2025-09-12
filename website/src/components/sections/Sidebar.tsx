"use client";
import clsx from "clsx";
import Link from "next/link";
import { usePathname } from "next/navigation";

type projectData = {
  id: string;
  title: string;
};
function Sidebar({ projects }: { projects: projectData[] }) {
  const pathname = usePathname();

  const segment = pathname.split("/").filter(Boolean);

  const allWorks = segment.length === 1;
  const slug = segment[1];
  console.log(segment);

  return (
    <div className="text-black sticky top-[12rem] self-start  uppercase">
      <Link
        href="/urra"
        className={clsx("text-sm", allWorks && !slug && "font-semibold")}
      >
        ALL WORKS
      </Link>
      <ul className="mt-2 flex flex-col gap-2 text-gray-700 text-sm">
        {projects.map((project) => (
          <li key={project.id}>
            <Link
              href={`/urra/${project.id}`}
              className={clsx(slug === project.id && "font-semibold")}
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
