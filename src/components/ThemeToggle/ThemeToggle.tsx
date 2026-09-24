"use client";

import { useTheme } from "@/hooks/useTheme";
import { useLanguage } from "@/hooks/useLanguage";
import { getUi } from "@/lib/translations";
import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();
  const { language } = useLanguage();
  const copy = getUi(language);

  const nextMode = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? "◑" : "◐";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={
        mounted
          ? nextMode === "dark"
            ? copy.theme.dark
            : copy.theme.light
          : copy.theme.toggle
      }
      disabled={!mounted}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
