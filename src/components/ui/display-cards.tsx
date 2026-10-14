"use client";

import type { ReactNode, KeyboardEvent } from "react";
import { cn } from "@/lib/utils";
import { Sparkles, SquareArrowOutUpRight } from "lucide-react";

export interface DisplayCardProps {
  className?: string;
  icon?: ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
  href?: string;
  tag?: string;
}

export function DisplayCard({
  className,
  icon = <Sparkles className="size-3.5 text-cyan-300" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Live Demo",
  titleClassName = "text-cyan-300",
  href,
  tag,
}: DisplayCardProps) {
  const handleClick = () => {
    if (href) {
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (href && (e.key === "Enter" || e.key === " ")) {
      e.preventDefault();
      window.open(href, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <div
      role={href ? "link" : "article"}
      tabIndex={href ? 0 : undefined}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={cn(
        "group relative flex h-36 w-[21rem] sm:h-40 sm:w-[25rem] md:w-[28rem] -skew-y-[6deg] select-none flex-col justify-between rounded-2xl border border-cyan-500/20 bg-[#020813]/65 backdrop-blur-md px-5 py-4 transition-all duration-300 hover:border-cyan-400/60 hover:bg-[#030e20]/80 hover:shadow-[0_0_35px_rgba(6,182,212,0.35)] focus:outline-none focus:ring-2 focus:ring-cyan-400/60",
        href && "cursor-pointer active:scale-[0.98]",
        className
      )}
    >
      {/* Top Header: Icon, Title & Tag */}
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center gap-2.5">
          <span className="relative inline-flex items-center justify-center rounded-lg bg-cyan-950/80 border border-cyan-500/30 p-2 shadow-sm text-cyan-300">
            {icon}
          </span>
          <p className={cn("text-base font-semibold font-['Syne'] tracking-wide text-cyan-100 group-hover:text-white transition-colors", titleClassName)}>
            {title}
          </p>
        </div>

        {tag ? (
          <span className="font-mono text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-cyan-950/80 border border-cyan-400/30 text-cyan-300">
            {tag}
          </span>
        ) : (
          href && (
            <SquareArrowOutUpRight className="w-4 h-4 text-cyan-400/70 group-hover:text-cyan-200 transition-colors" />
          )
        )}
      </div>

      {/* Description */}
      <p className="line-clamp-2 text-xs sm:text-sm text-slate-300 group-hover:text-cyan-50 font-['Space_Grotesk'] leading-relaxed transition-colors">
        {description}
      </p>

      {/* Footer Meta */}
      <div className="flex items-center justify-between text-[11px] font-mono text-cyan-300/70 pt-2 border-t border-cyan-500/10">
        <span>{date}</span>
        {href && (
          <span className="text-cyan-400 flex items-center gap-1 group-hover:text-cyan-200 group-hover:underline font-medium drop-shadow-[0_0_8px_rgba(6,182,212,0.4)] transition-colors">
            Open ↗
          </span>
        )}
      </div>
    </div>
  );
}

export interface DisplayCardsProps {
  cards?: DisplayCardProps[];
  className?: string;
}

export default function DisplayCards({ cards, className }: DisplayCardsProps) {
  const defaultCards: DisplayCardProps[] = [
    {
      className: "[grid-area:stack] hover:-translate-y-8 before:absolute before:w-full before:rounded-2xl before:outline-1 before:outline-white/10 before:h-full before:bg-blend-overlay before:bg-black/30 hover:before:opacity-0 before:transition-opacity before:duration-500 hover:scale-105 z-10",
      title: "Featured",
      description: "Discover modern web architecture and 3D experiences.",
    },
    {
      className: "[grid-area:stack] translate-x-12 translate-y-8 hover:-translate-y-2 before:absolute before:w-full before:rounded-2xl before:outline-1 before:outline-white/10 before:h-full before:bg-blend-overlay before:bg-black/30 hover:before:opacity-0 before:transition-opacity before:duration-500 hover:scale-105 z-20",
      title: "Popular",
      description: "Explore AI tools and real-time interactive systems.",
    },
    {
      className: "[grid-area:stack] translate-x-24 translate-y-16 hover:translate-y-6 hover:scale-105 z-30",
      title: "New",
      description: "Latest applications and digital creations.",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className={cn("grid [grid-template-areas:'stack'] place-items-center opacity-100 py-6 animate-in fade-in-0 duration-700", className)}>
      {displayCards.map((cardProps, index) => (
        <DisplayCard key={index} {...cardProps} />
      ))}
    </div>
  );
}
