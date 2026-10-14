import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '@/components/ui/social-icons';
import { portfolioData } from '@/data/portfolio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-10 border-t border-white/5 py-12 px-6 md:px-12 max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Copyright */}
        <p className="font-mono text-xs text-gray-500">
          {portfolioData.personal.copyright}
        </p>

        {/* Social Links & Back to top */}
        <div className="flex items-center gap-6">
          <a
            href="https://github.com/mohammedafraaz5227-oss"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-300 transition-colors"
            aria-label="GitHub Profile"
            title="GitHub"
          >
            <GithubIcon className="w-4 h-4" />
          </a>

          <a
            href="https://www.linkedin.com/in/mohammed-afraaz-4b9416344/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-cyan-300 transition-colors"
            aria-label="LinkedIn Profile"
            title="LinkedIn"
          >
            <LinkedinIcon className="w-4 h-4" />
          </a>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 font-mono text-xs text-gray-400 hover:text-white transition-colors ml-4 p-2 rounded-lg bg-white/5 border border-white/5 hover:border-cyan-400/30"
            aria-label="Scroll to top of page"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5 text-cyan-400" />
          </button>
        </div>
      </div>
    </footer>
  );
};
