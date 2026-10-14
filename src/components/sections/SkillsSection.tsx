import React from 'react';
import { portfolioData } from '@/data/portfolio';

export const SkillsSection: React.FC = () => {
  const { skills } = portfolioData;

  return (
    <section id="skills" className="relative py-28 md:py-36 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Section Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="type-caption text-cyan-400 font-mono tracking-widest text-xs">
          {skills.badge}
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="type-heading text-white mb-3">
            {skills.heading}
          </h2>
          <p className="type-subheading text-base max-w-xl">
            A spectrum of craft spanning technical architecture, 3D systems, and brand direction.
          </p>
        </div>
      </div>

      {/* Skills Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skills.items.map((skill, index) => (
          <div 
            key={index} 
            className="glass-card p-6 rounded-2xl flex flex-col justify-between hover:scale-[1.01] transition-transform duration-300"
          >
            <div>
              <div className="flex items-baseline justify-between mb-2">
                <h3 className="font-['Syne'] font-bold text-white text-lg">
                  {skill.name}
                </h3>
                <span className="font-mono text-cyan-300 font-medium text-xs tracking-wider">
                  {skill.level}%
                </span>
              </div>

              <p className="font-mono text-xs text-gray-400 mb-6">
                {skill.detail}
              </p>
            </div>

            {/* Meter Bar */}
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-cyan-500 to-teal-400 rounded-full transition-all duration-1000 ease-out"
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
