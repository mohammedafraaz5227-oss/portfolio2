"use client";

import * as React from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { SquareArrowOutUpRight, ChevronLeft, ChevronRight } from "lucide-react";

function cn(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(" ");
}

export type CardStackItem = {
  id: string | number;
  title: string;
  description?: string;
  imageSrc?: string;
  href?: string;
  ctaLabel?: string;
  tag?: string;
};

export type CardStackProps<T extends CardStackItem> = {
  items: T[];

  /** Selected index on mount */
  initialIndex?: number;

  /** How many cards are visible around the active (odd recommended) */
  maxVisible?: number;

  /** Card sizing */
  cardWidth?: number;
  cardHeight?: number;

  /** How much cards overlap each other (0..0.8). Higher = more overlap */
  overlap?: number;

  /** Total fan angle (deg). Higher = wider arc */
  spreadDeg?: number;

  /** 3D / depth feel */
  perspectivePx?: number;
  depthPx?: number;
  tiltXDeg?: number;

  /** Active emphasis */
  activeLiftPx?: number;
  activeScale?: number;
  inactiveScale?: number;

  /** Motion */
  springStiffness?: number;
  springDamping?: number;

  /** Behavior */
  loop?: boolean;
  autoAdvance?: boolean;
  intervalMs?: number;
  pauseOnHover?: boolean;

  /** UI */
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;

  /** Hooks */
  onChangeIndex?: (index: number, item: T) => void;

  /** Custom renderer (optional) */
  renderCard?: (item: T, state: { active: boolean }) => React.ReactNode;
};

function wrapIndex(n: number, len: number) {
  if (len <= 0) return 0;
  return ((n % len) + len) % len;
}

function signedOffset(i: number, active: number, len: number, loop: boolean) {
  const raw = i - active;
  if (!loop || len <= 1) return raw;
  const alt = raw > 0 ? raw - len : raw + len;
  return Math.abs(alt) < Math.abs(raw) ? alt : raw;
}

export function CardStack<T extends CardStackItem>({
  items,
  initialIndex = 0,
  maxVisible = 7,

  cardWidth = 520,
  cardHeight = 320,

  overlap = 0.45,
  spreadDeg = 44,

  perspectivePx = 1200,
  depthPx = 130,
  tiltXDeg = 10,

  activeLiftPx = 20,
  activeScale = 1.02,
  inactiveScale = 0.94,

  // Silky smooth spring physics
  springStiffness = 180,
  springDamping = 24,

  loop = true,
  autoAdvance = false,
  intervalMs = 3400,
  pauseOnHover = true,

  showDots = true,
  showArrows = true,
  className,

  onChangeIndex,
  renderCard,
}: CardStackProps<T>) {
  const reduceMotion = useReducedMotion();
  const len = items.length;

  const [active, setActive] = React.useState(() => wrapIndex(initialIndex, len));
  const [hovering, setHovering] = React.useState(false);
  const isDraggingRef = React.useRef(false);

  React.useEffect(() => {
    if (active >= len) {
      queueMicrotask(() => {
        setActive((a) => wrapIndex(a, len));
      });
    }
  }, [len, active]);

  React.useEffect(() => {
    if (!len) return;
    onChangeIndex?.(active, items[active]!);
  }, [active, len, items, onChangeIndex]);

  const maxOffset = Math.max(0, Math.floor(maxVisible / 2));

  const effectiveCardWidth = typeof window !== "undefined" && window.innerWidth < cardWidth + 48
    ? Math.max(280, window.innerWidth - 48)
    : cardWidth;
  const effectiveCardHeight = Math.round(effectiveCardWidth * (cardHeight / cardWidth));

  const cardSpacing = Math.max(12, Math.round(effectiveCardWidth * (1 - overlap)));
  const stepDeg = maxOffset > 0 ? spreadDeg / maxOffset : 0;

  const canGoPrev = loop || active > 0;
  const canGoNext = loop || active < len - 1;

  const prev = React.useCallback(() => {
    if (!len || !canGoPrev) return;
    setActive((a) => wrapIndex(a - 1, len));
  }, [canGoPrev, len]);

  const next = React.useCallback(() => {
    if (!len || !canGoNext) return;
    setActive((a) => wrapIndex(a + 1, len));
  }, [canGoNext, len]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };

  // Card click handler: smoothly switches if inactive, opens URL if active
  const handleCardClick = (i: number, item: T) => {
    if (isDraggingRef.current) return;
    
    if (active === i) {
      if (item.href) {
        window.open(item.href, "_blank", "noopener,noreferrer");
      }
    } else {
      setActive(i);
    }
  };

  // Autoplay
  React.useEffect(() => {
    if (!autoAdvance || reduceMotion || !len) return;
    if (pauseOnHover && hovering) return;

    const id = window.setInterval(() => {
      if (loop || active < len - 1) next();
    }, Math.max(1000, intervalMs));

    return () => window.clearInterval(id);
  }, [autoAdvance, intervalMs, hovering, pauseOnHover, reduceMotion, len, loop, active, next]);

  if (!len) return null;

  const activeItem = items[active]!;

  return (
    <div
      className={cn("w-full relative select-none", className)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      {/* Stage Container */}
      <div
        className="relative w-full flex items-center justify-center"
        style={{ height: Math.max(380, effectiveCardHeight + 90) }}
        tabIndex={0}
        onKeyDown={onKeyDown}
      >
        {/* Ambient Back Glow */}
        <div
          className="pointer-events-none absolute inset-x-0 top-4 mx-auto h-52 w-[65%] rounded-full bg-cyan-500/10 blur-3xl"
          aria-hidden="true"
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 mx-auto h-40 w-[70%] rounded-full bg-black/60 blur-3xl"
          aria-hidden="true"
        />

        {/* 3D Perspective Arena */}
        <div
          className="absolute inset-0 flex items-end justify-center"
          style={{ perspective: `${perspectivePx}px` }}
        >
          <AnimatePresence initial={false}>
            {items.map((item, i) => {
              const off = signedOffset(i, active, len, loop);
              const abs = Math.abs(off);
              const visible = abs <= maxOffset;

              if (!visible) return null;

              const rotateZ = off * stepDeg;
              const x = off * cardSpacing;
              const y = abs * 10;
              const z = -abs * depthPx;

              const isActive = off === 0;
              const scale = isActive ? activeScale : inactiveScale;
              const lift = isActive ? -activeLiftPx : 0;
              const rotateX = isActive ? 0 : tiltXDeg;
              const zIndex = 100 - abs;

              const dragProps = isActive
                ? {
                    drag: "x" as const,
                    dragConstraints: { left: 0, right: 0 },
                    dragElastic: 0.16,
                    onDragStart: () => {
                      isDraggingRef.current = true;
                    },
                    onDragEnd: (
                      _e: unknown,
                      info: { offset: { x: number }; velocity: { x: number } }
                    ) => {
                      const travel = info.offset.x;
                      const v = info.velocity.x;
                      const threshold = Math.min(140, effectiveCardWidth * 0.2);

                      if (travel > threshold || v > 500) {
                        prev();
                      } else if (travel < -threshold || v < -500) {
                        next();
                      }

                      // Reset drag lock after small delay to avoid false click
                      setTimeout(() => {
                        isDraggingRef.current = false;
                      }, 80);
                    },
                  }
                : {};

              return (
                <motion.div
                  key={item.id}
                  className={cn(
                    "absolute bottom-0 rounded-3xl border overflow-hidden shadow-2xl transition-colors duration-300",
                    "will-change-transform",
                    isActive
                      ? "cursor-pointer border-cyan-400/50 shadow-[0_15px_50px_rgba(6,182,212,0.25)] ring-1 ring-cyan-400/30"
                      : "cursor-pointer border-white/10 hover:border-white/30 bg-black/80"
                  )}
                  style={{
                    width: effectiveCardWidth,
                    height: effectiveCardHeight,
                    zIndex,
                    transformStyle: "preserve-3d",
                  }}
                  initial={
                    reduceMotion
                      ? false
                      : {
                          opacity: 0,
                          y: y + 35,
                          x,
                          rotateZ,
                          rotateX,
                          scale,
                        }
                  }
                  animate={{
                    opacity: 1,
                    x,
                    y: y + lift,
                    rotateZ,
                    rotateX,
                    scale,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: springStiffness,
                    damping: springDamping,
                    mass: 0.8,
                  }}
                  onClick={() => handleCardClick(i, item)}
                  {...dragProps}
                >
                  <div
                    className="h-full w-full"
                    style={{
                      transform: `translateZ(${z}px)`,
                      transformStyle: "preserve-3d",
                    }}
                  >
                    {renderCard ? (
                      renderCard(item, { active: isActive })
                    ) : (
                      <DefaultFanCard item={item} active={isActive} />
                    )}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Smooth Prev / Next Navigation Arrows */}
        {showArrows && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              className="absolute left-2 md:left-6 z-110 p-3 rounded-full bg-black/60 border border-white/15 text-white/70 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-black/90 backdrop-blur-md transition-all duration-300 focus:outline-none"
              aria-label="Previous project card"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              className="absolute right-2 md:right-6 z-110 p-3 rounded-full bg-black/60 border border-white/15 text-white/70 hover:text-cyan-300 hover:border-cyan-400/50 hover:bg-black/90 backdrop-blur-md transition-all duration-300 focus:outline-none"
              aria-label="Next project card"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </>
        )}
      </div>

      {/* Dots and Active Project Link Bar */}
      {showDots && (
        <div className="mt-8 flex items-center justify-center gap-5">
          <div className="flex items-center gap-2">
            {items.map((it, idx) => {
              const on = idx === active;
              return (
                <button
                  key={it.id}
                  onClick={() => setActive(idx)}
                  className={cn(
                    "h-2 rounded-full transition-all duration-500",
                    on
                      ? "w-7 bg-cyan-400 shadow-[0_0_10px_#22d3ee]"
                      : "w-2 bg-white/20 hover:bg-white/45"
                  )}
                  aria-label={`Jump to ${it.title}`}
                />
              );
            })}
          </div>

          {activeItem.href && (
            <a
              href={activeItem.href}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 hover:bg-cyan-500/35 hover:text-white hover:border-cyan-400 hover:shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all duration-300 font-mono text-xs tracking-wider"
              aria-label={`Open ${activeItem.title} in new tab`}
              title="Open Project"
            >
              <span>Open Project</span>
              <SquareArrowOutUpRight className="h-3.5 w-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

function DefaultFanCard({ item, active }: { item: CardStackItem; active: boolean }) {
  return (
    <div className="relative h-full w-full group overflow-hidden bg-black">
      {/* Background Project Image */}
      <div className="absolute inset-0">
        {item.imageSrc ? (
          <img
            src={item.imageSrc}
            alt={item.title}
            className={cn(
              "h-full w-full object-cover transition-transform duration-700 ease-out",
              active ? "group-hover:scale-105" : "brightness-75"
            )}
            draggable={false}
            loading="eager"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gray-900 text-sm text-gray-500">
            No image
          </div>
        )}
      </div>

      {/* Atmospheric Vignette & Contrast Overlay */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-transparent opacity-80" />

      {/* Tag Badge */}
      {item.tag && (
        <div className="absolute top-5 left-5 z-20">
          <span className="font-mono text-[10px] tracking-wider uppercase px-3 py-1 rounded-full bg-black/75 border border-cyan-400/30 text-cyan-300 backdrop-blur-md shadow-md">
            {item.tag}
          </span>
        </div>
      )}

      {/* Active Indicator Pulse */}
      {active && (
        <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/30 backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-[10px] text-emerald-300 uppercase tracking-wider">
            Live
          </span>
        </div>
      )}

      {/* Content Area */}
      <div className="relative z-10 flex h-full flex-col justify-end p-6 md:p-7">
        <h3 className="text-xl md:text-2xl font-bold font-['Syne'] text-white group-hover:text-cyan-300 transition-colors duration-300">
          {item.title}
        </h3>

        {item.description && (
          <p className="mt-1.5 line-clamp-2 text-xs md:text-sm text-gray-300 font-['Space_Grotesk'] leading-relaxed">
            {item.description}
          </p>
        )}

        {/* Direct Link Action Button */}
        {item.href && (
          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-cyan-300 group-hover:text-white transition-colors">
              <span>{item.ctaLabel || "Launch Project"}</span>
              <SquareArrowOutUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </span>

            <span className="text-[10px] font-mono text-gray-400 group-hover:text-gray-300 transition-colors">
              Click card to open ↗
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
