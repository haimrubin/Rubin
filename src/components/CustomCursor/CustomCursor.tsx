"use client";

import { useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import styles from "./CustomCursor.module.scss";

type CursorMode = "default" | "project" | "view";

export default function CustomCursor() {
  const isDesktop = useMediaQuery("(min-width: 1024px) and (pointer: fine)");
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mode, setMode] = useState<CursorMode>("default");
  const [isHovering, setIsHovering] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const target = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    if (!isDesktop) {
      document.body.classList.remove("custom-cursor-active");
      return;
    }

    document.body.classList.add("custom-cursor-active");

    const handleMouseMove = (e: MouseEvent) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      const card = target.closest("[data-cursor='project']");

      if (cursorEl?.dataset.cursor === "view") {
        setMode("view");
        setIsHovering(true);
      } else if (card) {
        setMode("project");
        setIsHovering(true);
      } else {
        setMode("default");
        setIsHovering(false);
      }
    };

    const animate = () => {
      position.current.x += (target.current.x - position.current.x) * 0.15;
      position.current.y += (target.current.y - position.current.y) * 0.15;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate(${position.current.x}px, ${position.current.y}px)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    rafId.current = requestAnimationFrame(animate);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      cancelAnimationFrame(rafId.current);
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  const labelText = mode === "view" ? "OPEN ↗" : mode === "project" ? "VIEW" : "";

  return (
    <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
      <div className={`${styles.dot} ${isHovering ? styles.hovering : ""}`} />
      <span className={`${styles.label} ${isHovering ? styles.visible : ""}`}>
        {labelText}
      </span>
    </div>
  );
}
