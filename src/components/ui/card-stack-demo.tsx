"use client";

import { CardStack, type CardStackItem } from "@/components/ui/card-stack";

const items: CardStackItem[] = [
  {
    id: 1,
    title: "Cosmic Explorer",
    description: "Immersive 3D solar system with Three.js — orbital mechanics, hand gesture controls & AI astronomy assistant.",
    imageSrc: "https://images.unsplash.com/photo-1614728894747-a83421e2b9c9?q=80&w=1200&auto=format&fit=crop",
    href: "https://cosmic-explorer-ten.vercel.app/",
    tag: "3D Interactive",
    ctaLabel: "Launch 3D Explorer",
  },
  {
    id: 2,
    title: "ResumeIQ",
    description: "Intelligent AI resume analyzer parsing PDFs, extracting skills, scoring ATS compatibility, and generating actionable rewrites.",
    imageSrc: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?q=80&w=1200&auto=format&fit=crop",
    href: "https://mohammedafraaz5227-oss.github.io/resume-analyzer/",
    tag: "AI Tool",
    ctaLabel: "Analyze Resume",
  },
  {
    id: 3,
    title: "SmileCare Dental",
    description: "Modern dental clinic web application with online appointment scheduling, instant WhatsApp confirmation & administration dashboard.",
    imageSrc: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200&auto=format&fit=crop",
    href: "https://dentaldemo-theta.vercel.app/",
    tag: "Web Platform",
    ctaLabel: "Visit Clinic Demo",
  },
  {
    id: 4,
    title: "Creative Foundry",
    description: "Digital design systems, typography exploration, and interactive micro-animations engineered for modern web craft.",
    imageSrc: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop",
    href: "https://github.com/mohammedafraaz5227-oss",
    tag: "Design System",
    ctaLabel: "View GitHub Repo",
  },
];

export default function CardStackDemoPage() {
  return (
    <div className="w-full">
      <div className="mx-auto w-full max-w-5xl p-8">
        <CardStack
          items={items}
          initialIndex={0}
          autoAdvance
          intervalMs={2800}
          pauseOnHover
          showDots
        />
      </div>
    </div>
  );
}

export { CardStackDemoPage };
