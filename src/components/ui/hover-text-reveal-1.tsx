"use client";

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const PROXIMITY_RADIUS = 200;

const defaultItemsArr = ['S', 'E', 'C', 'R', 'E', 'T'];

export interface SecretProps {
  items?: string[];
  className?: string;
  onClick?: () => void;
}

export const Secret: React.FC<SecretProps> = ({
  items = defaultItemsArr,
  className = '',
  onClick,
}) => {
  const containerRef = useRef<HTMLUListElement | null>(null);
  const itemRefs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const { mapRange, clamp } = gsap.utils;
    const containerElement = containerRef.current;
    const revealableElements = itemRefs.current.filter((el): el is HTMLLIElement => el !== null);

    if (!containerElement || revealableElements.length !== items.length || items.length === 0) {
      itemRefs.current.forEach(el => {
        if (el) gsap.set(el, { '--active': 0 });
      });
      return;
    }

    const DISTANCE_MAPPER = mapRange(250, 50, 0, 90);

    const updateItemsVisibility = (event: PointerEvent) => {
      const { clientX: x, clientY: y } = event;

      if (!containerElement) return;

      const containerBounds = containerElement.getBoundingClientRect();
      const containerCenterX = containerBounds.x + containerBounds.width * 0.5;
      const containerCenterY = containerBounds.y + containerBounds.height * 0.5;
      const distToContainerCenter = Math.hypot(x - containerCenterX, y - containerCenterY);

      if (distToContainerCenter > Math.max(containerBounds.width, containerBounds.height) * 0.5 + PROXIMITY_RADIUS) {
        revealableElements.forEach((itemEl) => {
          if (itemEl) gsap.to(itemEl, { '--active': 0, duration: 0.3, ease: 'power1.out' });
        });
        return;
      }

      revealableElements.forEach((itemEl) => {
        if (!itemEl) return;
        const itemBounds = itemEl.getBoundingClientRect();
        const itemCenterX = itemBounds.x + itemBounds.width * 0.5;
        const itemCenterY = itemBounds.y + itemBounds.height * 0.5;
        const distToItem = Math.hypot(x - itemCenterX, y - itemCenterY);
        
        const activeAngleDeg = clamp(0, 90, DISTANCE_MAPPER(distToItem));
        const activeAngleRad = activeAngleDeg * (Math.PI / 180);
        const activeValue = Math.sin(activeAngleRad);

        gsap.to(itemEl, {
          '--active': activeValue.toFixed(4),
          duration: 0.1,
          ease: 'power1.out'
        });
      });
    };

    revealableElements.forEach((itemEl) => {
      if (itemEl) {
        gsap.set(itemEl, { '--active': 0 });
      }
    });
    
    document.body.addEventListener('pointermove', updateItemsVisibility);

    return () => {
      document.body.removeEventListener('pointermove', updateItemsVisibility);
    };
  }, [items]);

  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, items.length);
  }, [items.length]);

  const assignRef = (el: HTMLLIElement | null, index: number) => {
    itemRefs.current[index] = el;
  };

  if (items.length === 0) {
    return <p className="text-neutral-500 text-center">No items to display.</p>;
  }

  return (
    <ul
      ref={containerRef}
      onClick={onClick}
      className={`p-0 m-0 flex flex-nowrap 
                 rounded-2xl sm:rounded-3xl bg-black/60 backdrop-blur-xl justify-center items-center
                 border border-cyan-500/25
                 shadow-[inset_0_1px_1px_rgba(255,255,255,0.1),0_10px_30px_rgba(0,0,0,0.5)]
                 py-10 sm:py-14 px-3 sm:px-6 select-none list-none w-full overflow-x-auto
                 transition-all duration-300 hover:border-cyan-400/50 hover:shadow-[0_0_35px_rgba(6,182,212,0.25)]
                 ${className}`}
    >
      {items.map((item, index) => (
        <li
          key={index}
          ref={(el) => assignRef(el, index)}
          tabIndex={0}
          className="flex items-center justify-center h-full p-1 sm:p-2 md:p-3 outline-none
                     focus-visible:outline-2 focus-visible:outline-cyan-400 focus-visible:outline-offset-4 focus-visible:rounded-md
                     flex-shrink-0"
          style={{ '--active': 0 } as React.CSSProperties}
        >
          <span
            className="text-transparent bg-gradient-to-b from-white via-cyan-100 to-cyan-400 bg-clip-text
                       transform-gpu font-bold font-['Syne'] tracking-wider
                       focus:outline-none
                       scale-[calc(var(--active,0)*0.5+0.5)] 
                       blur-[calc((1-var(--active,0))*1rem)]
                       text-xl sm:text-2xl md:text-3xl lg:text-4xl 
                       whitespace-nowrap px-1 transition-transform"
          >
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
};
