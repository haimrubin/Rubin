import type { Language } from "@/context/LanguageContext";

export type LocalizedText = string | Record<Language, string>;

export interface Project {
  id: string;
  slug: string;
  title: string;
  client: string;
  year: string;
  category: string;
  description: string;
  url?: string;
  technologies: string[];
  featured: boolean;
  iframe: boolean;
  preview: string;
  // Future extensibility
  role?: string;
  duration?: string;
  location?: string;
  services?: string[];
  video?: string;
  gallery?: string[];
}

export interface LocalizedProject
  extends Omit<Project, "title" | "client" | "category" | "description"> {
  title: LocalizedText;
  client: LocalizedText;
  category: LocalizedText;
  description: LocalizedText;
}

export interface SiteStats {
  yearsExperience?: string;
  technologiesCount?: string | null;
}

export interface SiteConfig {
  name: string;
  logo?: string;
  logoLight?: string;
  title: string;
  description: string;
  email: string;
  phone?: string;
  linkedin: string;
  github: string;
  stats?: SiteStats;
}

export interface LocalizedSiteConfig
  extends Omit<SiteConfig, "title" | "description"> {
  title: LocalizedText;
  description: LocalizedText;
}

export interface ProjectsData {
  projects: LocalizedProject[];
}
