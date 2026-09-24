import type { Language } from "@/context/LanguageContext";

export const ui = {
  en: {
    navigation: {
      label: "Main navigation",
      work: "Work",
      about: "About",
      contact: "Contact",
    },
    language: {
      label: "Switch language to Hebrew",
      short: "עב",
    },
    theme: {
      dark: "Switch to dark mode",
      light: "Switch to light mode",
      toggle: "Toggle theme",
    },
    hero: {
      scroll: "Scroll to explore",
    },
    intro: {
      label: "Selected Work",
      heading: "Websites, products and digital experiences built from scratch.",
      subtext:
        "Each project represents a complete digital product — from strategy and design through development and launch.",
      statsLabel: "Portfolio statistics",
      ideas: "Ideas Turned Into Digital",
      years: "Years",
      technologies: "Technologies",
    },
    projects: {
      heading: "Portfolio Projects",
      filterLabel: "Filter projects by category",
      all: "All",
      empty: "No projects in this category.",
      technologiesLabel: "Technologies used",
      viewLive: "View Live Website",
      preview: "Preview of",
      livePreview: "Live preview of",
      unavailable: "Live preview unavailable",
      loading: "Loading preview…",
      previewUnavailable: "Preview unavailable",
    },
    contact: {
      label: "Get in Touch",
      headingLineOne: "Have a project in mind?",
      headingLineTwo: "Let’s build it.",
      linksLabel: "Contact links",
      email: "Email",
      phone: "Phone",
    },
  },
  he: {
    navigation: {
      label: "ניווט ראשי",
      work: "עבודות",
      about: "אודות",
      contact: "יצירת קשר",
    },
    language: {
      label: "החלפת שפה לאנגלית",
      short: "EN",
    },
    theme: {
      dark: "מעבר למצב כהה",
      light: "מעבר למצב בהיר",
      toggle: "החלפת ערכת צבעים",
    },
    hero: {
      scroll: "גלו את העבודות",
    },
    intro: {
      label: "עבודות נבחרות",
      heading: "אתרים, מוצרים וחוויות דיגיטליות שנבנו מאפס.",
      subtext:
        "כל פרויקט הוא מוצר דיגיטלי שלם — משלב האסטרטגיה והעיצוב ועד לפיתוח ולהשקה.",
      statsLabel: "נתוני תיק העבודות",
      ideas: "רעיונות שהפכו לדיגיטל",
      years: "שנות ניסיון",
      technologies: "טכנולוגיות",
    },
    projects: {
      heading: "פרויקטים בתיק העבודות",
      filterLabel: "סינון פרויקטים לפי קטגוריה",
      all: "הכול",
      empty: "אין פרויקטים בקטגוריה הזאת.",
      technologiesLabel: "טכנולוגיות בפרויקט",
      viewLive: "לצפייה באתר",
      preview: "תצוגה מקדימה של",
      livePreview: "תצוגה חיה של",
      unavailable: "התצוגה החיה אינה זמינה",
      loading: "התצוגה נטענת…",
      previewUnavailable: "אין תצוגה מקדימה",
    },
    contact: {
      label: "דברו איתי",
      headingLineOne: "יש לכם פרויקט בראש?",
      headingLineTwo: "בואו נבנה אותו.",
      linksLabel: "קישורים ליצירת קשר",
      email: "אימייל",
      phone: "טלפון",
    },
  },
} as const;

export function getUi(language: Language) {
  return ui[language];
}
