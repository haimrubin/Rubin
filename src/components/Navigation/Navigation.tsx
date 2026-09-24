"use client";

import { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useTheme } from "@/hooks/useTheme";
import { getUi } from "@/lib/translations";
import styles from "./Navigation.module.scss";

interface NavigationProps {
  name: string;
  logo?: string;
  logoLight?: string;
}

export default function Navigation({ name, logo, logoLight }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const { theme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const copy = getUi(language);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const activeLogo =
    theme === "light" && logoLight ? logoLight : logo;

  return (
    <nav
      className={`${styles.nav} ${scrolled ? styles.scrolled : ""}`}
      aria-label={copy.navigation.label}
    >
      <div className={styles.inner}>
        <a
          href="#hero"
          className={styles.logo}
          onClick={(e) => handleClick(e, "hero")}
          aria-label={name}
        >
          {activeLogo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              key={activeLogo}
              src={encodeURI(activeLogo)}
              alt={name}
              className={styles.logoImage}
            />
          ) : (
            name.toUpperCase()
          )}
        </a>
        <div className={styles.actions}>
          <ul className={styles.links}>
            <li>
              <a
                href="#work"
                className={styles.link}
                onClick={(e) => handleClick(e, "work")}
              >
                {copy.navigation.work}
              </a>
            </li>
            <li>
              <a
                href="#about"
                className={styles.link}
                onClick={(e) => handleClick(e, "about")}
              >
                {copy.navigation.about}
              </a>
            </li>
            <li>
              <a
                href="#contact"
                className={styles.link}
                onClick={(e) => handleClick(e, "contact")}
              >
                {copy.navigation.contact}
              </a>
            </li>
          </ul>
          <button
            type="button"
            className={styles.languageToggle}
            onClick={toggleLanguage}
            aria-label={copy.language.label}
          >
            {copy.language.short}
          </button>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
