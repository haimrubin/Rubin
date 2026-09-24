"use client";

import { useLanguage } from "@/hooks/useLanguage";
import { getUi } from "@/lib/translations";
import styles from "./Hero.module.scss";

interface HeroProps {
  name: string;
  title: string;
  description: string;
}

export default function Hero({ name, title, description }: HeroProps) {
  const { language } = useLanguage();
  const copy = getUi(language);

  return (
    <section id="hero" className={styles.hero} aria-labelledby="hero-heading">
      <div className={styles.line} aria-hidden="true" />
      <div className={styles.inner}>
        <div className={styles.content}>
          <h1 id="hero-heading" className={styles.name}>
            {name.toUpperCase()}
          </h1>
          <p className={styles.title}>{title}</p>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
      <div className={styles.scrollHint} aria-hidden="true">
        <span>{copy.hero.scroll}</span>
        <span className={styles.arrow}>↓</span>
      </div>
    </section>
  );
}
