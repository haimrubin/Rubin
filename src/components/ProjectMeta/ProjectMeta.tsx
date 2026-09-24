"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { getUi } from "@/lib/translations";
import styles from "./ProjectMeta.module.scss";

interface ProjectMetaProps {
  title: string;
  client: string;
  year: string;
  description?: string;
  technologies?: string[];
  url?: string;
}

export default function ProjectMeta({
  title,
  client,
  year,
  description,
  technologies,
  url,
}: ProjectMetaProps) {
  const { language } = useLanguage();
  const copy = getUi(language);

  return (
    <div className={styles.meta}>
      <h3 className={`${styles.title} project-title`}>{title}</h3>
      <p className={styles.clientYear}>
        {client} · {year}
      </p>
      {description && <p className={styles.description}>{description}</p>}
      {technologies && technologies.length > 0 && (
        <ul className={styles.technologies} aria-label={copy.projects.technologiesLabel}>
          {technologies.map((tech) => (
            <li key={tech} className={styles.tech}>
              {tech}
            </li>
          ))}
        </ul>
      )}
      {url && (
        <a
          href={url}
          className={`${styles.link} project-link`}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="view"
        >
          {copy.projects.viewLive}
          <span className={styles.arrow} aria-hidden="true">
            ↗
          </span>
        </a>
      )}
    </div>
  );
}
