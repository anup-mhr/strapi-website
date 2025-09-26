"use client";
import ModifiedImage from "@/components/common/ModifiedImage";
import { useSort } from "@/context/SortContext";
import { sortProjects } from "@/lib/helper";
import { ProjectList } from "@/types/project";
import { ProjectSorter } from "./ProjectShorter";

interface ProjectGridProps {
  projects: ProjectList[];
}

function ProjectGrid({ projects }: ProjectGridProps) {
  const { currentSort } = useSort();

  if (!projects) return <div>Loading</div>;

  const sortedProjects = sortProjects(projects, currentSort);

  return (
    <div className="space-y-4">
      {/* Mobile sorting control */}
      <div className="flex px-5 justify-between items-center md:hidden">
        <span className="text-2xs uppercase tracking-[2px] text-gray-700">
          {projects.length} Projects
        </span>
        {projects.length > 0 && <ProjectSorter />}
      </div>

      {/* Desktop sorting control */}
      <div className="hidden md:flex justify-end mb-4">
        {projects.length > 0 && <ProjectSorter />}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 gap-2">
        {projects.length === 0 && (
          <div className="text-black">We will be updating soon.</div>
        )}
        {sortedProjects.map((project) => (
          <ModifiedImage
            key={project.slug}
            project={project}
            ctaLabel="VIEW WORK"
            href={`/urra/${project.slug}`}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectGrid;
