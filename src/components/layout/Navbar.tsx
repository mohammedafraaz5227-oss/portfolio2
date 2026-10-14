import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <header className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
        {/* Brand / Name */}
        <a 
          href="#" 
          className="group flex items-center gap-3"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          aria-label="Afraaz Portfolio Home"
        >
          <span className="font-['Syne'] font-extrabold text-xl md:text-2xl tracking-tighter text-white group-hover:text-cyan-300 transition-colors">
            {portfolioData.personal.name.toUpperCase()}
          </span>
          <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-cyan-400 opacity-60" />
          <span className="hidden sm:inline-block font-mono text-[11px] text-gray-400 tracking-wider">
            {portfolioData.personal.year}
          </span>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main Navigation">
          {portfolioData.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(item.href);
              }}
              className="group font-['Space_Grotesk'] text-sm tracking-wide text-gray-300 hover:text-white transition-colors duration-200 flex items-baseline gap-1.5"
            >
              <span className="font-mono text-[10px] text-cyan-400/50 group-hover:text-cyan-400 transition-colors">
                {item.number}
              </span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right Action / Availability Pill */}
        <div className="hidden lg:flex items-center gap-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-[11px] text-gray-300 tracking-wider">
              {portfolioData.personal.availability}
            </span>
          </div>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 rounded-lg bg-white/5 border border-white/10 text-gray-300 hover:text-white"
          aria-label="Toggle Navigation Menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="w-5 h-5 text-cyan-300" /> : <Menu className="w-5 h-5" />}
        </button>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-999 bg-[#050507]/95 backdrop-blur-2xl flex flex-col justify-center px-8 md:hidden">
          <div className="space-y-6">
            <div className="font-mono text-xs uppercase tracking-widest text-cyan-400/60 mb-6">
              Navigation
            </div>
            {portfolioData.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="flex items-center gap-4 text-2xl font-['Syne'] font-bold text-white hover:text-cyan-300 transition-colors py-2 border-b border-white/10"
              >
                <span className="font-mono text-xs text-cyan-400/60 font-normal">
                  {item.number}
                </span>
                <span>{item.label}</span>
              </a>
            ))}

            <div className="pt-6">
              <a
                href={`mailto:${portfolioData.personal.email}`}
                className="inline-flex items-center justify-center w-full py-3.5 rounded-xl bg-cyan-500/20 border border-cyan-400/40 text-cyan-200 font-medium text-sm tracking-wide"
              >
                {portfolioData.personal.email}
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
