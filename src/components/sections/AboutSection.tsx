import React from 'react';
import { Quote, Layers, Cpu } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const AboutSection: React.FC = () => {
  const { about } = portfolioData;

  return (
    <section id="about" className="relative py-28 md:py-36 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Section Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="type-caption text-cyan-400 font-mono tracking-widest text-xs">
          {about.badge}
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        {/* Left Column: Heading and Highlight cards */}
        <div className="lg:col-span-6 space-y-8">
          <h2 className="type-heading text-white">
            {about.heading}
          </h2>
          
          <p className="type-subheading">
            {about.subtitle}
          </p>

          {/* Craft Philosophy Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="glass-card p-5 rounded-2xl flex flex-col gap-3">
              <div className="w-9 h-9 rounded-xl bg-cyan-500/10 border border-cyan-400/20 flex items-center justify-center text-cyan-300">
                <Layers className="w-4 h-4" />
              </div>
              <h3 className="font-['Syne'] font-bold text-white text-base">3D & Interactive</h3>
              <p className="font-['Space_Grotesk'] text-xs text-gray-400 leading-relaxed">
                Seamless WebGL & Three.js shaders engineered for fluid 60fps performance.
              </p>
            </div>

            <div className="glass-card p-5 rounded-2xl flex flex-col gap-3">
              <div className="w-9 h-9 rounded-xl bg-teal-500/10 border border-teal-400/20 flex items-center justify-center text-teal-300">
                <Cpu className="w-4 h-4" />
              </div>
              <h3 className="font-['Syne'] font-bold text-white text-base">Full-Stack Depth</h3>
              <p className="font-['Space_Grotesk'] text-xs text-gray-400 leading-relaxed">
                Modern React, Next.js, and TypeScript architectures crafted with precision.
              </p>
            </div>
          </div>
        </div>

        {/* Right Column: Original paragraphs & Quote */}
        <div className="lg:col-span-6 space-y-6 pt-2">
          {about.paragraphs.map((p, idx) => (
            <p key={idx} className="type-body text-base md:text-lg">
              {p}
            </p>
          ))}

          {/* Steve Jobs Quote Card */}
          <div className="glass-card p-6 md:p-8 rounded-2xl border-cyan-500/20 mt-8 relative overflow-hidden">
            <div className="absolute -right-4 -bottom-4 text-cyan-500/5 pointer-events-none">
              <Quote className="w-32 h-32" />
            </div>
            <div className="relative z-10 space-y-3">
              <p className="font-['Space_Grotesk'] italic text-white/90 text-base md:text-lg leading-relaxed">
                "{about.quote.text}"
              </p>
              <div className="flex items-center gap-2">
                <div className="w-4 h-[1px] bg-cyan-400" />
                <span className="font-mono text-xs text-cyan-300 tracking-wider">
                  {about.quote.author}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
