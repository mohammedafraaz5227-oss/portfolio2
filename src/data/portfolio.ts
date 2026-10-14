export interface ProjectItem {
  id: number;
  title: string;
  category: string;
  year: string;
  description: string;
  tech: string[];
  role: string;
  url: string | null;
  githubUrl?: string | null;
  gradient?: string;
}

export interface SkillItem {
  name: string;
  level: number;
  detail: string;
}

export interface SocialLink {
  name: string;
  url: string;
}

export interface NavItem {
  label: string;
  href: string;
  number?: string;
}

export const portfolioData = {
  personal: {
    name: "Afraaz",
    fullName: "Mohammed Afraaz",
    title: "Designer & Developer",
    headline: "Full-Stack Developer & 3D Designer",
    tagline: "at the intersection of design, code & storytelling.",
    availability: "Available for projects",
    email: "mohammedafraaz5227@gmail.com",
    copyright: "© 2026 Afraaz — All rights reserved",
    year: "2026",
  },
  navigation: [
    { label: "About", href: "#about", number: "01" },
    { label: "Skills", href: "#skills", number: "02" },
    { label: "Projects", href: "#projects", number: "03" },
    { label: "Experience", href: "#experience", number: "04" },
    { label: "Contact", href: "#contact", number: "05" },
  ] as NavItem[],
  about: {
    badge: "01 — About",
    heading: "Bridging aesthetics and engineering with cinematic clarity",
    subtitle: "multidisciplinary designer and developer",
    paragraphs: [
      "With a passion for shaping products that feel alive and intentional, who believes the most impactful digital experiences exist at the boundary between art and engineering.",
      "I bring a meticulous eye for detail paired with deep technical fluency across the full stack.",
      "Every project I take on is treated as a film — carefully directed, paced, and crafted to leave a lasting impression on the viewer."
    ],
    quote: {
      text: "Design is not just what it looks like — design is how it works.",
      author: "Steve Jobs"
    }
  },
  skills: {
    badge: "02 — Expertise",
    heading: "Capabilities & Core Technologies",
    items: [
      { name: "UI / UX Design", level: 95, detail: "Figma · Sketch · Prototyping" },
      { name: "Frontend Development", level: 92, detail: "React · Next.js · TypeScript" },
      { name: "Motion & 3D", level: 88, detail: "GSAP · Three.js · After Effects" },
      { name: "Visual Design", level: 90, detail: "Typography · Layout · Color Theory" },
      { name: "Backend & APIs", level: 78, detail: "Node.js · Python · PostgreSQL" },
      { name: "Creative Direction", level: 85, detail: "Branding · Art Direction · Strategy" },
    ] as SkillItem[]
  },
  projects: {
    badge: "03 — Selected Work",
    heading: "Featured Creations",
    items: [
      {
        id: 1,
        title: "Cosmic Explorer",
        category: "3D Interactive Experience",
        year: "2025",
        description: "An immersive 3D solar system built with Three.js — explore planets with real-time orbital mechanics, hand gesture controls, and a built-in AI astronomy assistant. Features WASD navigation and cinematic camera angles.",
        tech: ["Three.js", "JavaScript", "GSAP", "AI Chat"],
        role: "Full-Stack Developer & 3D Designer",
        url: "https://cosmic-explorer-ten.vercel.app/",
        githubUrl: "https://github.com/mohammedafraaz5227-oss",
        gradient: "radial-gradient(ellipse at 30% 40%, rgba(6, 182, 212, 0.15) 0%, rgba(45, 212, 191, 0.08) 40%, transparent 70%)"
      },
      {
        id: 2,
        title: "ResumeIQ",
        category: "AI-Powered Tool",
        year: "2025",
        description: "An intelligent AI resume analyzer that parses PDFs, extracts skills, scores ATS compatibility, and generates actionable rewrite suggestions. Built for job seekers who want data-driven feedback on their resumes.",
        tech: ["React", "AI/NLP", "PDF Parser", "GitHub Pages"],
        role: "Designer & Developer",
        url: "https://mohammedafraaz5227-oss.github.io/resume-analyzer/",
        githubUrl: "https://github.com/mohammedafraaz5227-oss",
        gradient: "radial-gradient(ellipse at 70% 60%, rgba(45, 212, 191, 0.15) 0%, rgba(6, 182, 212, 0.08) 40%, transparent 70%)"
      },
      {
        id: 3,
        title: "SmileCare Dental",
        category: "Web Application",
        year: "2026",
        description: "A modern, responsive dental clinic landing page featuring online appointment booking, WhatsApp integration for instant confirmation, and an administrative dashboard for managing schedules.",
        tech: ["Frontend", "UI/UX", "Web Design", "WhatsApp API"],
        role: "Frontend Developer",
        url: "https://dentaldemo-theta.vercel.app/",
        githubUrl: "https://github.com/mohammedafraaz5227-oss",
        gradient: "radial-gradient(ellipse at 40% 50%, rgba(6, 182, 212, 0.15) 0%, rgba(45, 212, 191, 0.08) 40%, transparent 70%)"
      },
      {
        id: 4,
        title: "More Coming Soon",
        category: "In Development",
        year: "2026",
        description: "Currently working on new projects spanning full-stack applications, creative tools, and interactive experiences. Stay tuned for more.",
        tech: ["Next.js", "TypeScript", "Figma"],
        role: "Building...",
        url: null,
        githubUrl: null,
        gradient: "radial-gradient(ellipse at 50% 50%, rgba(6, 182, 212, 0.08) 0%, transparent 70%)"
      }
    ] as ProjectItem[]
  },
  experience: {
    badge: "04 — Journey",
    heading: "Experience",
    // Strictly left empty per instructions:
    // "Keep the Experience section completely empty.
    // If the original website has an Experience section, preserve its heading and navigation placement
    // but remove all experience entries, company names, job titles, descriptions, timelines, dates, and empty-state messages.
    // Do not write 'No experience yet' or insert placeholder cards."
  },
  contact: {
    badge: "05 — Connect",
    heading: "Something Together",
    prompt: "Have a project in mind? I'd love to hear about it. Let's build something extraordinary",
    email: "mohammedafraaz5227@gmail.com",
    reachOutText: "Or reach me directly at",
  },
  socials: [
    { name: "GitHub", url: "https://github.com/mohammedafraaz5227-oss" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/mohammed-afraaz-4b9416344/" }
  ] as SocialLink[]
}
