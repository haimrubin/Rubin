"use client";

import Navigation from "@/components/Navigation/Navigation";
import Hero from "@/components/Hero/Hero";
import Intro from "@/components/Intro/Intro";
import ProjectGrid from "@/components/ProjectGrid/ProjectGrid";
import Contact from "@/components/Contact/Contact";
import Footer from "@/components/Footer/Footer";
import {
  getSiteConfig,
  getProjects,
  getCategories,
  getProjectStats,
} from "@/lib/data";
import { useLanguage } from "@/hooks/useLanguage";

export default function HomePage() {
  const { language } = useLanguage();
  const site = getSiteConfig(language);
  const projects = getProjects(language);
  const categories = getCategories(projects);
  const stats = getProjectStats(projects, site);

  return (
    <>
      <Navigation
        name={site.name}
        logo={site.logo}
        logoLight={site.logoLight}
      />
      <main>
        <Hero
          name={site.name}
          title={site.title}
          description={site.description}
        />
        <Intro
          techCount={stats.techCount}
          years={stats.years}
        />
        <ProjectGrid projects={projects} categories={categories} />
        <Contact
          email={site.email}
          phone={site.phone}
          linkedin={site.linkedin}
          github={site.github}
        />
      </main>
      <Footer name={site.name} title={site.title} />
    </>
  );
}
