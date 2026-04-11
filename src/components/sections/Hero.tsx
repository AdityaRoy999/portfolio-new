'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import SplitText from '@/components/ui/SplitText';
import FillButton from '@/components/ui/FillButton';
import { ArrowDown, Download } from 'lucide-react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subtextRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollIndicatorRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.5 });

      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        tl.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: 15 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.06,
            duration: 1.2,
            ease: 'power3.out',
          }
        );
      }

      tl.fromTo(
        subtextRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.4'
      );

      tl.fromTo(
        scrollIndicatorRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.5 },
        '-=0.2'
      );

      // Differential Parallax on scroll
      const scrubConfig = {
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      };

      gsap.to(headlineRef.current, {
        y: -150,
        scrollTrigger: scrubConfig,
      });

      gsap.to(subtextRef.current, {
        y: -100,
        scrollTrigger: scrubConfig,
      });

      gsap.to(ctaRef.current, {
        y: -50,
        scrollTrigger: scrubConfig,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden pb-40 pt-24"
      id="hero"
    >
      {/* Subtle grid background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
          }}
        />
      </div>

      <div className="container-main relative z-10 flex flex-col items-center text-center max-w-5xl w-full">
        {/* Intro label */}
        <div className="mb-8 overflow-hidden">
          <p className="text-label text-text-secondary">
            Full Stack Web Developer &amp; Cybersecurity Enthusiast
          </p>
        </div>

        {/* Headline */}
        <div ref={headlineRef} className="mb-8">
          <SplitText
            className="text-display font-display text-text-primary leading-[0.9] max-w-5xl"
            type="words"
          >
            Hi, I&apos;m Aditya
          </SplitText>
        </div>

        {/* Sub text — concise, no jargon */}
        <p
          ref={subtextRef}
          className="text-lg md:text-xl text-text-secondary max-w-lg mb-10 leading-relaxed opacity-0"
        >
          I build secure backend systems and web apps with Python, Node.js, and React.
          Based in Mumbai, India.
        </p>

        {/* CTA buttons */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 opacity-0 z-20">
          <FillButton
            href="#work"
            className="primary"
            data-cursor="link"
            onClick={(e: Event) => {
              e.preventDefault();
              const el = document.getElementById('work');
              const lenis = (window as any).__lenis;
              if (el && lenis) lenis.scrollTo(el, { offset: -80, duration: 1.2 });
              else if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            <span>View My Work</span>
            <ArrowDown size={16} />
          </FillButton>
          <FillButton href="/resume.pdf" download="Aditya-Roy-Resume.pdf" className="primary" data-cursor="link">
            <Download size={14} />
            <span>Download Resume</span>
          </FillButton>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollIndicatorRef}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-text-muted">
          Scroll
        </span>
        <div className="w-[1px] h-8 bg-text-muted relative overflow-hidden">
          <div
            className="absolute top-0 left-0 w-full bg-accent"
            style={{
              height: '50%',
              animation: 'scroll-line 1.5s ease-in-out infinite',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll-line {
          0% { top: -50%; }
          100% { top: 100%; }
        }
      `}</style>
    </section>
  );
}
