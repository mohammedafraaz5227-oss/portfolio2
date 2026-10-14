import React from 'react';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '@/components/ui/social-icons';
import { portfolioData, type ProjectItem } from '@/data/portfolio';

export const ProjectsSection: React.FC = () => {
  const { projects } = portfolioData;

  const handleCardClick = (project: ProjectItem) => {
    if (project.url) {
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, project: ProjectItem) => {
    if (project.url && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      window.open(project.url, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <section id="projects" className="relative py-28 md:py-36 px-6 md:px-12 max-w-6xl mx-auto z-10">
      {/* Section Badge */}
      <div className="flex items-center gap-3 mb-6">
        <span className="type-caption text-cyan-400 font-mono tracking-widest text-xs">
          {projects.badge}
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
        <div>
          <h2 className="type-heading text-white mb-3">
            {projects.heading}
          </h2>
          <p className="type-subheading text-base max-w-xl">
            Real-world digital architectures, WebGL environments, and software solutions built for production.
          </p>
        </div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.items.map((project) => {
          const isClickable = Boolean(project.url);

          return (
            <div
              key={project.id}
              role={isClickable ? 'link' : 'article'}
              tabIndex={isClickable ? 0 : undefined}
              aria-label={isClickable ? `Open project ${project.title}` : project.title}
              onClick={() => handleCardClick(project)}
              onKeyDown={(e) => handleKeyDown(e, project)}
              className={`group glass-card relative rounded-3xl p-8 md:p-10 flex flex-col justify-between overflow-hidden border border-white/10 transition-all duration-500 ${
                isClickable 
                  ? 'cursor-pointer hover:border-cyan-400/40 hover:-translate-y-1.5 focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2 focus:ring-offset-[#050507]' 
                  : 'cursor-default opacity-85'
              }`}
              style={{
                background: project.gradient || undefined,
              }}
            >
              {/* Top Meta: Category & Year */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[11px] text-cyan-300 tracking-wider uppercase px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/30">
                      {project.category}
                    </span>
                    <span className="font-mono text-xs text-gray-400">
                      {project.year}
                    </span>
                  </div>

                  {/* External Links */}
                  <div className="flex items-center gap-3">
                    {/* Independent GitHub Link */}
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="p-2 rounded-xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 hover:border-cyan-400/40 transition-all z-20"
                        aria-label={`View ${project.title} source code on GitHub`}
                        title="View Source on GitHub"
                      >
                        <GithubIcon className="w-4 h-4" />
                      </a>
                    )}

                    {/* Primary project external link icon */}
                    {isClickable && (
                      <div 
                        className="p-2 rounded-xl bg-cyan-500/15 border border-cyan-400/30 text-cyan-300 group-hover:bg-cyan-500/25 group-hover:text-white group-hover:border-cyan-400/60 transition-all"
                        aria-hidden="true"
                        title="Open Live Project"
                      >
                        <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-['Syne'] font-bold text-2xl md:text-3xl text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="font-['Space_Grotesk'] text-sm md:text-base text-gray-300 leading-relaxed mb-6">
                  {project.description}
                </p>
              </div>

              {/* Bottom Meta: Tech Tags and Role */}
              <div className="pt-6 border-t border-white/5 space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((t, idx) => (
                    <span 
                      key={idx}
                      className="font-mono text-[11px] text-gray-300 bg-white/5 px-2.5 py-1 rounded-md border border-white/5"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-xs font-mono text-gray-400 pt-1">
                  <span>{project.role}</span>
                  {isClickable ? (
                    <span className="text-cyan-400 group-hover:underline flex items-center gap-1">
                      View Live Project
                      <ExternalLink className="w-3 h-3 inline" />
                    </span>
                  ) : (
                    <span className="text-gray-500 italic">In Development</span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
