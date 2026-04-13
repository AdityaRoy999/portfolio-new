'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import HoverSplitText from '@/components/ui/HoverSplitText';
import FillButton from '@/components/ui/FillButton';
import { Download } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Body text reveal
      gsap.fromTo(
        bodyRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          ease: 'none',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 92%',
            end: 'top 72%',
            scrub: true,
          },
        }
      );

      // Image reveal
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { clipPath: 'inset(100% 0 0 0)' },
          {
            clipPath: 'inset(0% 0 0 0)',
            ease: 'none',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 90%',
              end: 'top 50%',
              scrub: true,
            },
          }
        );
      }

      // Parallax scroll for depth
      gsap.to(imageRef.current, {
        y: -60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });

      gsap.to(bodyRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="section-spacing relative">
      <div className="container-main">
        <div className="mb-12">
          <p className="text-label mb-4">About Me</p>
          <HoverSplitText
            text="About Me"
            className="text-h2 lg:text-h1 font-display text-text-primary"
            defaultColor="text-text-primary"
            hoverColor="text-text-primary"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Image */}
          <div
            ref={imageRef}
            className="relative aspect-[3/4] rounded-lg overflow-hidden group bg-surface border border-border"
            data-cursor="image"
            data-cursor-label="👋"
          >
            <img 
              src="/aditya.jpg" 
              alt="Aditya Roy"
              className="w-full h-full object-cover grayscale-[0.8] opacity-80 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            />
          </div>

          {/* Text content */}
          <div className="flex flex-col gap-8">
            <h3 className="text-h3 lg:text-h2 font-display text-text-primary max-w-[22ch] leading-tight">
              Security-first developer who writes clean, reliable code
            </h3>

            <div ref={bodyRef} className="space-y-6 text-text-secondary leading-relaxed">
              <p>
                I&apos;m a cybersecurity student with 1.5+ years of experience
                in web development. I use Python and Node.js on the backend and
                React/Next.js on the frontend — building apps that work well and stay{' '}
                <span className="text-accent font-medium">secure</span>.
              </p>
              <p>
                My cybersecurity background helps me think about how systems break
                and how to prevent it. I care about{' '}
                <span className="text-accent font-medium">clean code</span>,{' '}
                good architecture, and keeping things simple.
              </p>
              <p>
                Looking for roles as a{' '}
                <span className="text-accent font-medium">Cybersecurity Intern</span>{' '}
                or{' '}
                <span className="text-accent font-medium">Full Stack Developer</span>{' '}
                — happy to contribute and learn.
              </p>
            </div>

            {/* Resume download */}
            <FillButton href="/resume.pdf" download="Aditya-Roy-Resume.pdf" className="primary self-start" data-cursor="link" data-cursor-label="Download">
              <Download size={14} />
              <span>Download Resume</span>
            </FillButton>
          </div>
        </div>
      </div>
    </section>
  );
}
