import DisplayCards, { type DisplayCardProps } from "@/components/ui/display-cards";
import { Bot, Orbit, FileText, Calendar } from "lucide-react";

const defaultPortfolioDisplayCards: DisplayCardProps[] = [
  {
    className:
      "[grid-area:stack] -translate-x-6 sm:-translate-x-12 -translate-y-7 sm:-translate-y-9 hover:-translate-y-12 hover:scale-105 hover:z-50 z-10",
    icon: <Bot className="size-4 text-cyan-400" />,
    title: "Student Chaos Dossier",
    description: "Interactive broadsheet dossier & kinetic AI challenge dashboard for IEEE Day.",
    date: "IEEE AI Challenge",
    href: "https://chaos-rho-lovat.vercel.app/",
    tag: "Next.js · AI",
    titleClassName: "text-cyan-200",
  },
  {
    className:
      "[grid-area:stack] -translate-x-2 sm:-translate-x-4 -translate-y-2 sm:-translate-y-3 hover:-translate-y-6 hover:scale-105 hover:z-50 z-20",
    icon: <Orbit className="size-4 text-cyan-400" />,
    title: "Cosmic Explorer",
    description: "Immersive 3D solar system with Three.js real-time orbital physics & AI astronomy.",
    date: "Three.js · WebGL",
    href: "https://cosmic-explorer-ten.vercel.app/",
    tag: "3D Universe",
    titleClassName: "text-cyan-200",
  },
  {
    className:
      "[grid-area:stack] translate-x-2 sm:translate-x-4 translate-y-3 sm:translate-y-3 hover:translate-y-0 hover:scale-105 hover:z-50 z-30",
    icon: <FileText className="size-4 text-cyan-400" />,
    title: "ResumeIQ",
    description: "Intelligent AI resume analyzer parsing PDFs, scoring ATS matches & rewrites.",
    date: "React · NLP",
    href: "https://mohammedafraaz5227-oss.github.io/resume-analyzer/",
    tag: "AI Tool",
    titleClassName: "text-cyan-200",
  },
  {
    className:
      "[grid-area:stack] translate-x-6 sm:translate-x-12 translate-y-8 sm:translate-y-9 hover:translate-y-6 hover:scale-105 hover:z-50 z-40",
    icon: <Calendar className="size-4 text-cyan-400" />,
    title: "SmileCare Dental",
    description: "Modern clinical landing page with online booking, WhatsApp confirmation & portal.",
    date: "Web Platform",
    href: "https://dentaldemo-theta.vercel.app/",
    tag: "Client Demo",
    titleClassName: "text-cyan-200",
  },
];

export default function DisplayCardsDemo() {
  return (
    <div className="flex min-h-[400px] w-full items-center justify-center p-4">
      <DisplayCards cards={defaultPortfolioDisplayCards} />
    </div>
  );
}
