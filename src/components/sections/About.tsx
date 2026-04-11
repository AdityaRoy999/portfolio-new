'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SplitText from '@/components/ui/SplitText';
import FillButton from '@/components/ui/FillButton';
import { Download } from 'lucide-react';

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline reveal
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Body text reveal
      gsap.fromTo(
        bodyRef.current,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: bodyRef.current,
            start: 'top 85%',
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
            duration: 1.2,
            ease: 'power3.inOut',
            scrollTrigger: {
              trigger: imageRef.current,
              start: 'top 80%',
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
        {/* Section label */}
        <p className="text-label mb-6">About Me</p>

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
            <div ref={headlineRef}>
              <SplitText
                className="text-h2 font-display text-text-primary"
                type="words"
              >
                Security-first developer who writes clean, reliable code
              </SplitText>
            </div>

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
