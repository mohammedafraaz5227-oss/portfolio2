import React, { useState } from 'react';
import { Mail, Check, ArrowUpRight, Send } from 'lucide-react';
import { portfolioData } from '@/data/portfolio';

export const ContactSection: React.FC = () => {
  const { contact } = portfolioData;

  const [formState, setFormState] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate submission state
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setIsSubmitted(false), 5000);
    }, 700);
  };

  return (
    <section id="contact" className="relative py-28 md:py-36 px-6 md:px-12 max-w-4xl mx-auto z-10">
      {/* Section Badge */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500/50" />
        <span className="type-caption text-cyan-400 font-mono tracking-widest text-xs">
          {contact.badge}
        </span>
        <div className="h-[1px] w-12 bg-gradient-to-r from-cyan-500/50 to-transparent" />
      </div>

      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="type-heading text-white mb-4">
          {contact.heading}
        </h2>
        <p className="type-subheading text-base md:text-lg max-w-xl mx-auto">
          {contact.prompt}
        </p>
      </div>

      {/* Contact Form Card */}
      <div className="glass-card rounded-3xl p-8 md:p-12 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="type-caption block mb-2 text-cyan-300/70 text-[11px]">
                Your Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formState.name}
                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                placeholder="Alex Morgan"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.07] transition-all"
              />
            </div>

            <div>
              <label htmlFor="email" className="type-caption block mb-2 text-cyan-300/70 text-[11px]">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formState.email}
                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                placeholder="alex@example.com"
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.07] transition-all"
              />
            </div>
          </div>

          <div>
            <label htmlFor="message" className="type-caption block mb-2 text-cyan-300/70 text-[11px]">
              Project Details
            </label>
            <textarea
              id="message"
              name="message"
              required
              rows={4}
              value={formState.message}
              onChange={(e) => setFormState({ ...formState, message: e.target.value })}
              placeholder="Tell me about your vision, timeline, and goals..."
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-500 focus:outline-none focus:border-cyan-400/60 focus:bg-white/[0.07] resize-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500/20 to-teal-500/20 border border-cyan-400/40 text-cyan-100 font-['Space_Grotesk'] font-medium text-sm tracking-wide uppercase transition-all duration-300 hover:from-cyan-500/30 hover:to-teal-500/30 hover:border-cyan-400 hover:shadow-[0_0_25px_rgba(6,182,212,0.25)] flex items-center justify-center gap-2"
          >
            {isSubmitted ? (
              <span className="flex items-center gap-2 text-emerald-400 font-semibold">
                <Check className="w-4 h-4" /> Message Sent
              </span>
            ) : isSubmitting ? (
              <span>Sending...</span>
            ) : (
              <span className="flex items-center gap-2">
                Send Message <Send className="w-4 h-4" />
              </span>
            )}
          </button>
        </form>

        {/* Direct Email link */}
        <div className="mt-10 pt-8 border-t border-white/5 text-center space-y-2">
          <p className="font-['Space_Grotesk'] text-xs text-gray-400">
            {contact.reachOutText}
          </p>
          <a
            href={`mailto:${contact.email}`}
            className="inline-flex items-center gap-2 font-mono text-sm md:text-base text-cyan-300 hover:text-white transition-colors border-b border-cyan-400/30 pb-0.5"
          >
            <Mail className="w-4 h-4 text-cyan-400" />
            <span>{contact.email}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </section>
  );
};
