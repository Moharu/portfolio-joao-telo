import {
  SiteHeader,
  Hero,
  ProjectsSection,
  ExperienceSection,
  AboutSection,
  ContactSection,
  SiteFooter,
} from "@/components/portfolio";
export default function Page() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProjectsSection />
        <ExperienceSection />
        <AboutSection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
