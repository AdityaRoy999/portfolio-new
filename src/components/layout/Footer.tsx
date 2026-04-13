'use client';

import { ArrowUp } from 'lucide-react';
import ParticleWord from '@/components/ui/ParticleWord';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-border">
      <div className="container-main pt-6 pb-8 md:pt-8 md:pb-10">
        <div className="mb-3 h-[18px]" aria-hidden="true" />
        <div className="relative h-[84px] sm:h-[104px] md:h-[132px]" data-cursor="default">
          <ParticleWord text="ADITYA" />
        </div>
      </div>

      <div className="border-t border-border py-6">
        <div className="container-main flex items-center justify-between">
          <p className="text-sm text-text-muted font-mono">
            © {new Date().getFullYear()} Aditya Roy. All rights reserved.
          </p>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 text-sm text-text-secondary hover:text-accent transition-colors duration-300"
            aria-label="Back to top"
            data-cursor="link"
            data-cursor-label="Top"
          >
            <span className="hidden sm:inline font-mono text-xs uppercase tracking-widest">Back to top</span>
            <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300">
              <ArrowUp
                size={16}
                className="transition-transform duration-300 group-hover:-translate-y-0.5"
              />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}
