"use client";

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useLanguage } from "@/hooks/useLanguage";
import { getUi } from "@/lib/translations";
import styles from "./Intro.module.scss";

interface IntroProps {
  techCount: string;
  years: string | null;
}

export default function Intro({ techCount, years }: IntroProps) {
  const { ref, isVisible } = useIntersectionObserver<HTMLElement>();
  const { language } = useLanguage();
  const copy = getUi(language);

  return (
    <section
      id="about"
      ref={ref}
      className={styles.intro}
      aria-labelledby="intro-heading"
    >
      <div className={styles.inner}>
        <div className={`${styles.header} ${isVisible ? styles.visible : ""}`}>
          <p className={styles.label}>{copy.intro.label}</p>
          <h2 id="intro-heading" className={styles.heading}>
            {copy.intro.heading}
          </h2>
          <p className={styles.subtext}>
            {copy.intro.subtext}
          </p>
        </div>

        <div className={styles.stats} role="list" aria-label={copy.intro.statsLabel}>
          <div
            className={`${styles.stat} ${isVisible ? styles.visible : ""}`}
            style={{ "--delay": "0.1s" } as React.CSSProperties}
            role="listitem"
          >
            <p className={styles.statValue}>∞</p>
            <p className={styles.statLabel}>{copy.intro.ideas}</p>
          </div>
          {years && (
            <div
              className={`${styles.stat} ${isVisible ? styles.visible : ""}`}
              style={{ "--delay": "0.2s" } as React.CSSProperties}
              role="listitem"
            >
              <p className={styles.statValue}>{years}</p>
              <p className={styles.statLabel}>{copy.intro.years}</p>
            </div>
          )}
          <div
            className={`${styles.stat} ${isVisible ? styles.visible : ""}`}
            style={{ "--delay": years ? "0.3s" : "0.2s" } as React.CSSProperties}
            role="listitem"
          >
            <p className={styles.statValue}>{techCount}</p>
            <p className={styles.statLabel}>{copy.intro.technologies}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
