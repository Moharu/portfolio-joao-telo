export const profile = {
  name: "João Teló",
  email: "joaovtelo@gmail.com",
  resume: "/resume/joao-telo-resume.pdf",
  github: "https://github.com/Moharu",
  linkedin: "https://www.linkedin.com/in/joaotelo/",
  intro:
    "I'm João Vítor Bianchi Teló, a front-end developer with a full-stack JavaScript background and 7+ years of professional software development experience. I've built reusable interfaces, integrated APIs, and worked with international remote teams.",
};
export interface Project {
  title: string;
  label: string;
  description: string;
  highlights: string[];
  tags: string[];
  links: { label: string; href: string }[];
  disclosure?: string;
  image?: string;
}
export const projects: Project[] = [
  {
    image: "/projects/gameplay-review-demo.webp",
    title: "Gameplay Video Review Tool",
    label: "Personal project · MVP · October 2026",
    description:
      "A React and TypeScript app for reviewing gameplay recordings with timestamped feedback. Reviewers can jump to moments in a video, edit notes, and filter feedback by category and importance.",
    highlights: [
      "Local persistence and recording reconnection.",
      "A hosted demo isolated from the user's saved review.",
      "Vitest and React Testing Library tests, with GitHub Actions checks.",
    ],
    tags: ["React", "TypeScript", "Vite", "Vitest", "React Testing Library"],
    links: [
      { label: "Try live demo", href: "https://ffxiv-pull-review.vercel.app/" },
      {
        label: "View source",
        href: "https://github.com/Moharu/ffxiv-pull-review",
      },
    ],
    disclosure:
      "Developed with substantial AI assistance. I defined workflows, contributed code and tests, supplied domain knowledge, and verified behavior in the browser and on a phone.",
  },
  {
    title: "Playwright Test Automation Portfolio",
    label: "Personal project · October 2026",
    description:
      "A Playwright and TypeScript testing portfolio for a demo e-commerce application, covering API checks, UI smoke tests, known-defect regressions, and boundary-value checks.",
    highlights: [
      "Documented test cases, expected outcomes, and exploratory findings.",
      "GitHub Actions configured to start the application before running tests.",
    ],
    tags: ["Playwright", "TypeScript", "API testing", "GitHub Actions"],
    links: [
      {
        label: "Explore tests and documentation",
        href: "https://github.com/Moharu/practice-playwright",
      },
    ],
  },
];
export const experience = [
  {
    company: "X-Team",
    role: "Full Stack JavaScript Developer",
    dates: "July 2019–August 2022",
    description:
      "Primarily front-end development with React and TypeScript in international remote teams. Translated Figma designs into reusable components, integrated APIs, and handled complex forms, loading states, and errors. Wrote Jest tests and regression coverage, worked with shared components and Storybook, and reviewed pull requests.",
  },
  {
    company: "DarkShine",
    role: "Full Stack Developer",
    dates: "April 2018–June 2019",
    description:
      "Sole developer of an internal union-dues billing platform supporting operations for hundreds of companies. Built a React dashboard and Node.js/Express API with CSV workflows, payment-slip generation, email delivery, and payment-status synchronization. Deployed the application and scheduled services to AWS; used Docker.",
  },
  {
    company: "Versul Tecnologia de Acesso Inteligente",
    role: "Full Stack Developer",
    dates: "January 2015–April 2018",
    description:
      "Helped move payment functionality from PHP into a Node.js service using MySQL. Built React administration interfaces for payment records and logs, documented and tested APIs, and contributed to a React Native application.",
  },
];
export const skills = {
  professional: [
    "React",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS/Sass",
    "Jest",
    "Storybook",
    "Node.js",
    "Express",
    "MySQL",
  ],
  recent: [
    "Playwright",
    "Vitest",
    "React Testing Library",
    "GitHub Actions",
    "AI-assisted development",
  ],
};
