"use client";

import { useMemo, useRef, useState } from "react";
import type { Project } from "@/types";
import ProjectCard from "@/components/ProjectCard/ProjectCard";
import ProjectFilters from "@/components/ProjectFilters/ProjectFilters";
import styles from "./ProjectGrid.module.scss";

interface ProjectGridProps {
  projects: Project[];
  categories: string[];
}

export default function ProjectGrid({ projects, categories }: ProjectGridProps) {
  const [activeCategory, setActiveCategory] = useState("All");
  const sectionRef = useRef<HTMLElement>(null);

  const counts = useMemo(() => {
    const map: Record<string, number> = {};
    projects.forEach((p) => {
      map[p.category] = (map[p.category] ?? 0) + 1;
    });
    return map;
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "All") return projects;
    return projects.filter((p) => p.category === activeCategory);
  }, [projects, activeCategory]);

  const handleCategoryChange = (category: string) => {
    if (category === activeCategory) return;

    setActiveCategory(category);

    requestAnimationFrame(() => {
      sectionRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  };

  return (
    <section
      ref={sectionRef}
      id="work"
      className={styles.section}
      aria-labelledby="work-heading"
    >
      <h2 id="work-heading" className="sr-only">
        Portfolio Projects
      </h2>

      <ProjectFilters
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
        counts={counts}
        totalCount={projects.length}
      />

      <div className={styles.inner}>
        <div key={activeCategory} className={styles.list} role="list">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isEntering
            />
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <p className={styles.empty} role="status">
            No projects in this category.
          </p>
        )}
      </div>
    </section>
  );
}
