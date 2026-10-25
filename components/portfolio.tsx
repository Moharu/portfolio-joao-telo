import { ThemeToggle } from "./theme-toggle";
import Image from "next/image";
import {
  profile,
  projects,
  experience,
  skills,
  type Project,
} from "@/content/portfolio";
export function Arrow() {
  return <span aria-hidden="true">↗</span>;
}
export function SiteHeader() {
  return (
    <header className="shell header" id="top">
      <a className="wordmark" href="#top">
        João Teló<span aria-hidden="true">.</span>
      </a>
      <nav aria-label="Main navigation">
        {["Projects", "Experience", "About", "Contact"].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}>
            {item}
          </a>
        ))}
        <a href={profile.resume}>
          Résumé <span className="muted">(PDF)</span> <Arrow />
        </a>
        <ThemeToggle />
      </nav>
    </header>
  );
}
export function Hero() {
  return (
    <section className="hero shell" aria-labelledby="hero-title">
      <p className="eyebrow">
        <span className="blue-line" />
        React · TypeScript · Front-end development
      </p>
      <h1 id="hero-title">
        I build interfaces.
        <br />
        <span>And pay attention to the details.</span>
      </h1>
      <div className="hero-bottom">
        <div>
          <p className="intro">{profile.intro}</p>
          <div className="flex flex-wrap gap-3 mt-7">
            <a className="button primary" href="#projects">
              View my work <span aria-hidden="true">↓</span>
            </a>
            <a className="button secondary" href={profile.resume}>
              View résumé (PDF) <Arrow />
            </a>
          </div>
        </div>
        <div className="hero-aside">
          <p>
            Based in Novo Hamburgo, Brazil. Fluent in English and native in
            Portuguese. Open to remote roles and nearby hybrid opportunities.
          </p>
          <a className="text-link" href={`mailto:${profile.email}`}>
            {profile.email} <Arrow />
          </a>
        </div>
      </div>
    </section>
  );
}
function SectionHeading({
  number,
  title,
  note,
}: {
  number: string;
  title: string;
  note?: string;
}) {
  return (
    <div className="section-heading">
      <div>
        <span className="section-number">{number} /</span>
        <h2>{title}</h2>
      </div>
      {note && <p>{note}</p>}
    </div>
  );
}
function ProjectCard({ project, index }: { project: Project; index: number }) {
  if (project.compact) {
    return (
      <article className="compact-project">
        <div>
          <p className="eyebrow">{project.label}</p>
          <h3>{project.title}</h3>
          <ul className="tags" aria-label="Technologies">
            {project.tags.map((tag) => (
              <li key={tag}>{tag}</li>
            ))}
          </ul>
        </div>
        <div>
          <p>{project.description}</p>
          {project.links.map((link) => (
            <a className="text-link" key={link.href} href={link.href}>
              {link.label} <Arrow />
            </a>
          ))}
          <p className="disclosure">{project.disclosure}</p>
        </div>
      </article>
    );
  }
  return (
    <article className="project">
      <div className="project-title">
        <p className="eyebrow">{project.label}</p>
        <h3>{project.title}</h3>
      </div>
      <div className={`project-media media-${index}`}>
        {project.image ? (
          <Image
            src={project.image}
            alt="Updated gameplay review demo with recording playback beside timestamped feedback and category controls"
            width={1440}
            height={1000}
            sizes="(min-width: 1200px) 620px, (min-width: 768px) 52vw, calc(100vw - 40px)"
          />
        ) : index === 0 ? (
          <div className="asset-placeholder">
            <span className="panel-kicker">PROJECT CAPTURE</span>
            <p>
              Gameplay Video
              <br />
              Review Tool
            </p>
            <span>
              Development placeholder
              <br />
              Genuine demo capture pending
            </span>
          </div>
        ) : (
          <div className="test-panel">
            <span className="panel-kicker">
              TESTING SCOPE / PERSONAL PROJECT
            </span>
            <p>
              Confidence,
              <br />
              one check at a time.
            </p>
            <ul>
              {[
                "API checks",
                "UI smoke tests",
                "Known-defect regressions",
                "Boundary-value checks",
              ].map((x, i) => (
                <li key={x}>
                  <span>0{i + 1}</span>
                  {x}
                </li>
              ))}
            </ul>
            <small>Testing scope</small>
          </div>
        )}
      </div>
      <div className="project-body">
        <p>{project.description}</p>
        <ul className="highlights">
          {project.highlights.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <ul className="tags" aria-label="Technologies">
          {project.tags.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
        <div className="project-links">
          {project.links.map((x) => (
            <a className="text-link" key={x.href} href={x.href}>
              {x.label} <Arrow />
            </a>
          ))}
        </div>
        {project.disclosure && (
          <p className="disclosure">{project.disclosure}</p>
        )}
      </div>
    </article>
  );
}
export function ProjectsSection() {
  return (
    <section id="projects" className="section shell">
      <SectionHeading
        number="01"
        title="Selected projects"
        note="Recent work, from interface to verification."
      />
      {projects.map((p, i) => (
        <ProjectCard key={p.title} project={p} index={i} />
      ))}
    </section>
  );
}
export function ExperienceSection() {
  return (
    <section id="experience" className="section shell">
      <SectionHeading number="02" title="Professional experience" />
      <div className="experience-list">
        {experience.map((x) => (
          <article className="experience" key={x.company}>
            <p className="dates">{x.dates}</p>
            <div>
              <h3>{x.company}</h3>
              <p className="role">{x.role}</p>
              <p>{x.description}</p>
            </div>
          </article>
        ))}
      </div>
      <details>
        <summary>Earlier side work · OnePercent.IO</summary>
        <p>
          <strong>
            Partner and Ethereum Developer · November 2017–October 2019.
          </strong>{" "}
          Part-time alongside regular employment. Experimental smart-contract
          work and a React rental-marketplace prototype; project concluded at
          the prototype stage.
        </p>
      </details>
      <p className="career-note">
        I took a career break for family caregiving and personal time, and
        resumed hands-on personal development projects in October 2026.
      </p>
    </section>
  );
}
export function AboutSection() {
  return (
    <section id="about" className="section about">
      <div className="shell">
        <SectionHeading number="03" title="A little about me" />
        <div className="about-grid">
          <p className="about-copy">
            My background spans front-end interfaces, APIs, and internal
            business tools. I enjoy turning product requirements into reusable
            components, handling the details around forms and data, and checking
            that interactions behave as intended.
          </p>
          <div>
            {Object.entries(skills).map(([key, items]) => (
              <div className="skill-group" key={key}>
                <h3>
                  {key === "professional"
                    ? "Professional experience"
                    : "Recent personal-project work"}
                </h3>
                <ul className="tags">
                  {items.map((x) => (
                    <li key={x}>{x}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export function ContactSection() {
  return (
    <section id="contact" className="section shell contact">
      <p className="eyebrow">04 / CONTACT</p>
      <h2>
        Have a role in mind<span>?</span>
      </h2>
      <p>
        I’m looking for a React and TypeScript frontend role, or a full-stack
        position where my Node.js experience can contribute.
      </p>
      <a className="contact-email" href={`mailto:${profile.email}`}>
        {profile.email} <Arrow />
      </a>
      <div className="flex gap-7 mt-7">
        <a className="text-link" href={profile.linkedin}>
          LinkedIn <Arrow />
        </a>
        <a className="text-link" href={profile.github}>
          GitHub <Arrow />
        </a>
      </div>
    </section>
  );
}
export function SiteFooter() {
  return (
    <footer className="shell footer">
      <p>
        João Teló <span>· Front-end developer</span>
      </p>
      <a href="#top">
        Back to top <span aria-hidden="true">↑</span>
      </a>
    </footer>
  );
}
