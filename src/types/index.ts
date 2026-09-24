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

export interface ProjectsData {
  projects: Project[];
}
