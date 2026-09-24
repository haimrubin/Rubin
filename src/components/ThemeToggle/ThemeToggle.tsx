"use client";

import { useTheme } from "@/hooks/useTheme";
import styles from "./ThemeToggle.module.scss";

export default function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  const nextMode = theme === "dark" ? "light" : "dark";
  const icon = theme === "dark" ? "◑" : "◐";

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label={mounted ? `Switch to ${nextMode} mode` : "Toggle theme"}
      disabled={!mounted}
    >
      <span className={styles.icon} aria-hidden="true">
        {icon}
      </span>
    </button>
  );
}
