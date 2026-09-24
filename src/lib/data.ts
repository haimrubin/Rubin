import projectsData from "../../data/projects.json";
import siteData from "../../data/site.json";
import type { Project, ProjectsData, SiteConfig } from "@/types";

export function getSiteConfig(): SiteConfig {
  return siteData as SiteConfig;
}

export function getProjects(): Project[] {
  const { projects } = projectsData as ProjectsData;
  return [...projects].sort((a, b) => {
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
