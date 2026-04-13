'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { projects } from '@/data/projects';
import { ArrowUpRight } from 'lucide-react';
import { Link } from 'next-view-transitions';
import HoverSplitText from '@/components/ui/HoverSplitText';

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeProject, setActiveProject] = useState<number | null>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Project rows stagger in
      const rows = listRef.current?.querySelectorAll('.project-row');
      if (rows) {
        gsap.fromTo(
          rows,
          { y: 25, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: 'none',
            scrollTrigger: {
              trigger: listRef.current,
              start: 'top 92%',
              end: 'top 55%',
              scrub: true,
            },
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // Preview image follows mouse
  useEffect(() => {
    if (!previewRef.current) return;

    const xTo = gsap.quickTo(previewRef.current, 'x', {
      duration: 0.4,
      ease: 'power2.out',
    });
    const yTo = gsap.quickTo(previewRef.current, 'y', {
      duration: 0.4,
      ease: 'power2.out',
    });

    const handleMouseMove = (e: MouseEvent) => {
      if (activeProject === null) return;
      xTo(e.clientX - 150);
      yTo(e.clientY - 100);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [activeProject]);

  return (
    <section ref={sectionRef} id="work" className="section-spacing relative">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-16">
          <div>
            <p className="text-label mb-4">Selected Work</p>
            <HoverSplitText
              text="Featured Projects"
              className="text-h2 lg:text-h1 font-display text-text-primary"
              defaultColor="text-text-primary"
              hoverColor="text-text-primary"
            />
          </div>
          <p className="text-mono text-sm text-text-muted">2024 — 2025</p>
        </div>

        {/* Project list */}
        <div ref={listRef} className="relative">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="project-row group block border-t border-border last:border-b py-8 md:py-10 no-underline"
              onMouseEnter={() => setActiveProject(i)}
              onMouseLeave={() => setActiveProject(null)}
              data-cursor="image"
              data-cursor-label={`0${i + 1}`}
            >
              <div className="flex items-center gap-4 md:gap-8">
                {/* Number */}
                <span className="text-mono text-sm text-text-muted w-8 shrink-0">
                  0{i + 1}
                </span>

                {/* Title */}
                <h3 className="text-h3 font-display text-text-primary flex-1 group-hover:text-accent transition-colors duration-300">
                  {project.title}
                </h3>

                {/* Category */}
                <span className="hidden md:inline-block text-label text-text-muted">
                  {project.category}
                </span>

                {/* Year */}
                <span className="hidden sm:inline-block text-mono text-sm text-text-muted w-16 text-right">
                  {project.year}
                </span>

                {/* Arrow */}
                <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300 shrink-0">
                  <ArrowUpRight
                    size={16}
                    className="text-text-secondary group-hover:text-accent transition-all duration-300 group-hover:rotate-45"
                  />
                </span>
              </div>

              {/* Description on mobile */}
              <p className="md:hidden text-sm text-text-muted mt-2 ml-12 line-clamp-2">
                {project.description}
              </p>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <Link
            href="/work"
            className="group inline-flex items-center gap-2"
            data-cursor="link"
            data-cursor-label="All Work"
          >
            <HoverSplitText
              text="View All Work"
              className="text-sm font-mono uppercase tracking-[0.15em]"
              defaultColor="text-text-secondary"
              hoverColor="text-accent"
              underlineClassName="bg-accent"
            />
            <ArrowUpRight size={14} className="text-text-secondary transition-all duration-300 group-hover:text-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>
      </div>

      {/* Floating preview image (desktop only) */}
      <div
        ref={previewRef}
        className="hidden lg:block fixed top-0 left-0 w-[400px] pointer-events-none z-50 rounded-lg overflow-hidden transition-opacity duration-300 shadow-2xl"
        style={{ opacity: activeProject !== null ? 1 : 0 }}
      >
        {activeProject !== null && (
          <div className="w-full relative">
            <img 
              src={projects[activeProject].image} 
              alt={projects[activeProject].title}
              className="w-full h-auto block"
            />
          </div>
        )}
      </div>
    </section>
  );
}
