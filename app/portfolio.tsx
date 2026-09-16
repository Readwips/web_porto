import Navbar from "./navbar";
import { profile } from "./portfolio-data";
import type { ProjectCollection } from "./projects";
import Hero from "./components/hero";
import ScrollReveal from "./components/scroll-reveal";
import {
  AboutSection,
  CertificatesSection,
  ContactSection,
  ExperienceSection,
  ExpertiseSection,
  LearningSection,
  ProjectsSection,
  SkillsSection,
} from "./components/sections";

export default function Portfolio(projects: ProjectCollection) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Lewati ke konten utama
      </a>
      <Navbar />
      <ScrollReveal />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ExpertiseSection />
        <ProjectsSection {...projects} />
        <ExperienceSection />
        <SkillsSection />
        <CertificatesSection />
        <LearningSection />
        <ContactSection />
      </main>
      <footer className="site-footer">
        <div className="container footer-content">
          <p>© 2026 {profile.name}</p>
          <div>
            <a href={profile.github} target="_blank" rel="noreferrer">
              GitHub
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer">
              LinkedIn
            </a>
            <a href="#top">Kembali ke atas ↑</a>
          </div>
        </div>
      </footer>
    </>
  );
}
