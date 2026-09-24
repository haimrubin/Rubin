"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import styles from "./Intro.module.scss";

interface IntroProps {
  projectCount: number;
  techCount: string;
  years: string | null;
}

export default function Intro({ projectCount, techCount, years }: IntroProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();

  return (
    <section
      id="about"
      ref={ref}
      className={styles.intro}
      aria-labelledby="intro-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <p className={styles.label}>Selected Work</p>
          <h2 id="intro-heading" className={styles.heading}>
            Websites, products and digital experiences built from scratch.
          </h2>
          <p className={styles.subtext}>
            Each project represents a complete digital product — from strategy
            and design through development and launch.
          </p>
        </div>

        <div className={styles.stats} role="list" aria-label="Portfolio statistics">
          <div
            className={`${styles.stat} ${isVisible ? styles.visible : ""}`}
            style={{ "--delay": "0.1s" } as React.CSSProperties}
            role="listitem"
          >
            <p className={styles.statValue}>{projectCount}</p>
            <p className={styles.statLabel}>Projects</p>
          </div>
          {years && (
            <div
              className={`${styles.stat} ${isVisible ? styles.visible : ""}`}
              style={{ "--delay": "0.2s" } as React.CSSProperties}
              role="listitem"
            >
              <p className={styles.statValue}>{years}</p>
              <p className={styles.statLabel}>Years</p>
            </div>
          )}
          <div
            className={`${styles.stat} ${isVisible ? styles.visible : ""}`}
            style={{ "--delay": years ? "0.3s" : "0.2s" } as React.CSSProperties}
            role="listitem"
          >
            <p className={styles.statValue}>{techCount}</p>
            <p className={styles.statLabel}>Technologies</p>
          </div>
        </div>
      </div>
    </section>
  );
}
