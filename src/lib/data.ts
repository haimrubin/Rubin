import projectsData from "../../data/projects.json";
import siteData from "../../data/site.json";
import type { Language } from "@/context/LanguageContext";
import type {
  LocalizedSiteConfig,
  LocalizedText,
  Project,
  ProjectsData,
  SiteConfig,
} from "@/types";

function localize(value: LocalizedText, language: Language): string {
  return typeof value === "string" ? value : value[language];
}

export function getSiteConfig(language: Language = "en"): SiteConfig {
  const site = siteData as LocalizedSiteConfig;

  return {
    ...site,
    title: localize(site.title, language),
    description: localize(site.description, language),
  };
}

export function getProjects(language: Language = "en"): Project[] {
  const { projects } = projectsData as ProjectsData;
  const localizedProjects = projects.map((project) => ({
    ...project,
    title: localize(project.title, language),
    client: localize(project.client, language),
    category: localize(project.category, language),
    description: localize(project.description, language),
  }));

  return localizedProjects.sort((a, b) => {
    if (a.featured && !b.featured) return -1;
    if (!a.featured && b.featured) return 1;
    return 0;
  });
}

export function getCategories(projects: Project[]): string[] {
  const categories = new Set(projects.map((p) => p.category));
  return Array.from(categories).sort();
}

export function getUniqueTechnologies(projects: Project[]): string[] {
  const techSet = new Set<string>();
  projects.forEach((p) => p.technologies?.forEach((t) => techSet.add(t)));
  return Array.from(techSet);
}

export function getProjectStats(projects: Project[], siteConfig: SiteConfig) {
  const projectCount = projects.length;
  const techCount =
    siteConfig.stats?.technologiesCount ??
    `${getUniqueTechnologies(projects).length}+`;
  const years = siteConfig.stats?.yearsExperience ?? null;

  return {
    projectCount,
    techCount,
    years,
  };
}

export function getHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}
