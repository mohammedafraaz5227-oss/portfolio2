import React from 'react';
import { portfolioData } from '@/data/portfolio';

/**
 * Strict Requirement:
 * "Keep the Experience section completely empty.
 * If the original website has an Experience section, preserve its heading and navigation placement 
 * but remove all experience entries, company names, job titles, descriptions, timelines, dates, 
 * and empty-state messages. Do not write 'No experience yet' or insert placeholder cards."
 */
export const ExperienceSection: React.FC = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="relative py-16 md:py-24 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Section Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="type-caption text-cyan-400 font-mono tracking-widest text-xs">
          {experience.badge}
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
      </div>

      {/* Section Heading */}
      <div className="mb-4">
        <h2 className="type-heading text-white">
          {experience.heading}
        </h2>
      </div>

      {/* Deliberately empty container with no entries, no company names, no placeholder text */}
      <div className="experience-container" aria-hidden="true" />
    </section>
  );
};
