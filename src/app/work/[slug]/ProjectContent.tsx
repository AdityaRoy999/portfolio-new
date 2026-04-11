'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { Link } from 'next-view-transitions';
import type { Project } from '@/data/projects';
import SplitText from '@/components/ui/SplitText';
import LivePreview from '@/components/ui/LivePreview';
import Footer from '@/components/layout/Footer';
import { ArrowLeft, ArrowUpRight, ExternalLink, Code } from 'lucide-react';

interface ProjectContentProps {
  project: Project;
  nextProject: Project;
}

export default function ProjectContent({ project, nextProject }: ProjectContentProps) {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const metaRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  // Find a live preview URL from links
  const liveUrl = project.links?.find(l => 
    /live|site|version|platform|demo/i.test(l.label)
  )?.url;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 });

      // Title reveal
      const words = titleRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { y: 80, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 1.2,
            ease: 'power3.out',
          }
        );
      }

      // Meta reveal
      tl.fromTo(
        metaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.6'
      );

      // Body reveal
      const sections = bodyRef.current?.querySelectorAll('.content-block');
      if (sections) {
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { y: 40, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.8,
              ease: 'power3.out',
              scrollTrigger: {
                trigger: section,
                start: 'top 85%',
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <main id="main-content">
      {/* Hero */}
      <section
        ref={heroRef}
        className="relative min-h-[70vh] flex items-end pb-16 pt-32"
      >
        <div className="container-main relative z-10 w-full">
          {/* Back link */}
          <Link
            href="/#work"
            className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.15em] text-text-secondary hover:text-accent transition-colors duration-300 mb-12"
            data-cursor="link"
          >
            <ArrowLeft size={14} />
            Back to work
          </Link>

          {/* Category + Year */}
          <div className="flex items-center gap-4 mb-6">
            <span
              className="text-xs font-mono uppercase tracking-[0.2em] px-3 py-1 rounded-full border"
              style={{ borderColor: project.color, color: project.color }}
            >
              {project.category}
            </span>
            <span className="text-mono text-sm text-text-muted">{project.year}</span>
          </div>

          {/* Title */}
          <div ref={titleRef}>
            <SplitText
              className="text-h1 font-display text-text-primary max-w-4xl"
              type="words"
            >
              {project.title}
            </SplitText>
          </div>
        </div>
      </section>

      {/* Meta row */}
      <div ref={metaRef} className="border-y border-border py-8">
        <div className="container-main grid grid-cols-2 md:grid-cols-4 gap-8">
          <div>
            <p className="text-label mb-2">Role</p>
            <p className="text-text-primary font-medium">{project.role}</p>
          </div>
          <div>
            <p className="text-label mb-2">Year</p>
            <p className="text-text-primary font-medium">{project.year}</p>
          </div>
          <div>
            <p className="text-label mb-2">Tech Stack</p>
            <div className="flex flex-wrap gap-2">
              {project.tech.flatMap((cat) => cat.items).slice(0, 5).map((t) => (
                <span
                  key={t}
                  className="text-xs font-mono px-2 py-1 rounded bg-surface text-text-secondary"
                >
                  {t}
                </span>
              ))}
              {project.tech.flatMap((cat) => cat.items).length > 5 && (
                <span className="text-xs font-mono px-2 py-1 text-text-muted">
                  +{project.tech.flatMap((cat) => cat.items).length - 5}
                </span>
              )}
            </div>
          </div>
          <div>
            <p className="text-label mb-2">Links</p>
            <div className="flex flex-col gap-2">
              {project.links && project.links.length > 0 ? (
                project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent hover:underline text-sm"
                    data-cursor="link"
                  >
                    {link.label} <ExternalLink size={12} />
                  </a>
                ))
              ) : (
                <span className="text-text-muted text-sm">Coming soon</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Body content */}
      <div ref={bodyRef} className="section-spacing">
        <div className="container-main">
          {/* Project image or Live Preview */}
          {liveUrl ? (
            <LivePreview 
              url={liveUrl} 
              poster={project.image} 
              title={project.title} 
            />
          ) : (
            <div className="content-block rounded-xl overflow-hidden mb-16 relative">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-auto block"
              />
            </div>
          )}

          {/* Long description */}
          <div className="content-block space-y-6">
            <h2 className="text-h2 font-display text-text-primary">About This Project</h2>
            <p className="text-lg text-text-secondary leading-relaxed">
              {project.longDescription}
            </p>
          </div>

          {/* Tech details */}
          <div className="content-block mt-16">
            <h3 className="text-label mb-8">Tech Stack</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {project.tech.map((categoryGroup) => (
                <div key={categoryGroup.category}>
                  <p className="text-sm font-bold text-text-primary mb-4 uppercase tracking-widest">
                    {categoryGroup.category}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {categoryGroup.items.map((item) => (
                      <span
                        key={item}
                        className="text-sm font-mono px-4 py-2 rounded-full border border-border text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next project teaser */}
      <Link
        href={`/work/${nextProject.slug}`}
        className="block section-spacing relative group no-underline"
        data-cursor="image"
      >
        <div className="container-main text-center">
          <p className="text-label mb-6">Next Project</p>
          <h2 className="text-h1 font-display text-text-primary group-hover:text-accent transition-colors duration-500">
            {nextProject.title}
          </h2>
          <span className="inline-flex items-center gap-2 mt-6 text-sm font-mono text-text-muted group-hover:text-accent transition-colors duration-300">
            View Project{' '}
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:rotate-45"
            />
          </span>
        </div>
      </Link>

      <Footer />
    </main>
  );
}
