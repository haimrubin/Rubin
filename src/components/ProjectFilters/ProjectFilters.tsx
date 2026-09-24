"use client";

import styles from "./ProjectFilters.module.scss";
import { useLanguage } from "@/hooks/useLanguage";
import { getUi } from "@/lib/translations";

interface ProjectFiltersProps {
  categories: string[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  counts: Record<string, number>;
  totalCount: number;
}

export default function ProjectFilters({
  categories,
  activeCategory,
  onCategoryChange,
  counts,
  totalCount,
}: ProjectFiltersProps) {
  const { language } = useLanguage();
  const copy = getUi(language);

  return (
    <div className={styles.filters} role="group" aria-label={copy.projects.filterLabel}>
      <div className={styles.inner}>
        <button
          type="button"
          className={`${styles.button} ${activeCategory === "All" ? styles.active : ""}`}
          onClick={() => onCategoryChange("All")}
          aria-pressed={activeCategory === "All"}
        >
          {copy.projects.all}
          <span className={styles.count} aria-hidden="true">
            {totalCount}
          </span>
        </button>
        {categories.map((category) => (
          <button
            key={category}
            type="button"
            className={`${styles.button} ${activeCategory === category ? styles.active : ""}`}
            onClick={() => onCategoryChange(category)}
            aria-pressed={activeCategory === category}
          >
            {category}
            <span className={styles.count} aria-hidden="true">
              {counts[category] ?? 0}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
