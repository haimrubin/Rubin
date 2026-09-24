"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import type { Project } from "@/types";
import BrowserPreview from "@/components/BrowserPreview/BrowserPreview";
import ProjectMeta from "@/components/ProjectMeta/ProjectMeta";
import styles from "./ProjectCard.module.scss";

interface ProjectCardProps {
  project: Project;
  index: number;
  isEntering?: boolean;
}

export default function ProjectCard({
  project,
  index,
  isEntering = false,
}: ProjectCardProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>({
    threshold: 0.1,
    rootMargin: "100px 0px",
  });

  const { ref: previewRef, isVisible: isNearViewport } =
    useIntersectionObserver<HTMLDivElement>({
      threshold: 0,
      rootMargin: "300px 0px 120vh 0px",
    });

  const eagerPreview = index < 2;

  const delay = `${Math.min(index * 0.08, 0.4)}s`;

  return (
    <article
      ref={ref}
      className={`${styles.card} ${isVisible ? styles.visible : ""} ${isEntering ? styles.entering : ""}`}
      style={{ "--delay": delay } as React.CSSProperties}
      data-cursor="project"
    >
      <div ref={previewRef} className={styles.previewWrap}>
        <BrowserPreview
          url={project.url}
          preview={project.preview}
          title={project.title}
          iframeEnabled={project.iframe}
          isNearViewport={isNearViewport}
          eager={eagerPreview}
        />
      </div>
      <div className={styles.metaWrap}>
        <ProjectMeta
          title={project.title}
          client={project.client}
          year={project.year}
          description={project.description}
          technologies={project.technologies}
          url={project.url}
        />
      </div>
    </article>
  );
}
