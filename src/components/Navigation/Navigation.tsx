"use client";

import { useCallback, useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { useLanguage } from "@/hooks/useLanguage";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { useTheme } from "@/hooks/useTheme";
import { getUi } from "@/lib/translations";
import styles from "./Navigation.module.scss";

interface NavigationProps {
  name: string;
  logo?: string;
  logoLight?: string;
}

const MENU_ID = "mobile-menu";

export default function Navigation({ name, logo, logoLight }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const { theme } = useTheme();
  const { language, toggleLanguage } = useLanguage();
  const copy = getUi(language);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close the menu when switching to desktop
  useEffect(() => {
    if (isDesktop) setMenuOpen(false);
  }, [isDesktop]);

  // Lock scroll + close on Escape while open
  useEffect(() => {
    if (!menuOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [menuOpen]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (menuOpen) {
      setMenuOpen(false);
      // Let the panel start closing before scrolling so the scroll lock is released
      window.setTimeout(() => scrollTo(id), 50);
      return;
    }
    scrollTo(id);
  };

  const activeLogo =
    theme === "light" && logoLight ? logoLight : logo;

  const navLinks = [
    { id: "work", label: copy.navigation.work },
    { id: "about", label: copy.navigation.about },
    { id: "contact", label: copy.navigation.contact },
  ];

  return (
    <>
      <nav
        className={`${styles.nav} ${scrolled ? styles.scrolled : ""} ${menuOpen ? styles.menuOpen : ""}`}
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
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    className={styles.link}
                    onClick={(e) => handleClick(e, link.id)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
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
            <button
              type="button"
              className={`${styles.hamburger} ${menuOpen ? styles.open : ""}`}
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? copy.navigation.closeMenu : copy.navigation.openMenu}
              aria-expanded={menuOpen}
              aria-controls={MENU_ID}
            >
              <span className={styles.hamburgerLine} aria-hidden="true" />
              <span className={styles.hamburgerLine} aria-hidden="true" />
              <span className={styles.hamburgerLine} aria-hidden="true" />
            </button>
          </div>
        </div>
      </nav>

      <div
        id={MENU_ID}
        className={`${styles.menu} ${menuOpen ? styles.menuVisible : ""}`}
        aria-hidden={!menuOpen}
      >
        <ul className={styles.menuList}>
          {navLinks.map((link, index) => (
            <li
              key={link.id}
              className={styles.menuItem}
              style={{ "--i": index } as React.CSSProperties}
            >
              <a
                href={`#${link.id}`}
                className={styles.menuLink}
                onClick={(e) => handleClick(e, link.id)}
                tabIndex={menuOpen ? 0 : -1}
              >
                <span className={styles.menuIndex} aria-hidden="true">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
