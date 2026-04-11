'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [hasVisited, setHasVisited] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const roleRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const visited = sessionStorage.getItem('portfolio-visited');
      if (visited) {
        setHasVisited(true);
        setIsLoading(false);
        return;
      }
    }

    const tl = gsap.timeline({
      onComplete: () => {
        sessionStorage.setItem('portfolio-visited', 'true');
        setIsLoading(false);
      },
    });

    // Phase 1: Line draws across
    tl.fromTo(
      lineRef.current,
      { scaleX: 0 },
      { scaleX: 1, duration: 0.8, ease: 'power3.inOut' }
    );

    // Phase 2: Name characters cascade up
    const chars = nameRef.current?.querySelectorAll('.char');
    if (chars) {
      tl.fromTo(
        chars,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.04,
          duration: 0.6,
          ease: 'power3.out',
        },
        '-=0.3'
      );
    }

    // Phase 3: Role text fades in
    tl.fromTo(
      roleRef.current,
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' },
      '-=0.2'
    );

    // Phase 4: Counter runs
    const counter = { val: 0 };
    tl.to(
      counter,
      {
        val: 100,
        duration: 1.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          if (counterRef.current) {
            counterRef.current.textContent = Math.round(counter.val).toString().padStart(3, '0');
          }
        },
      },
      '-=0.6'
    );

    // Phase 5: Hold briefly
    tl.to({}, { duration: 0.3 });

    // Phase 6: Everything slides up and out
    tl.to(containerRef.current, {
      yPercent: -100,
      duration: 0.8,
      ease: 'power3.inOut',
    });
  }, []);

  if (hasVisited) return null;

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="preloader"
          ref={containerRef}
          className="fixed inset-0 z-[10000] bg-bg flex items-center justify-center"
          exit={{ opacity: 0, transition: { duration: 0.2, delay: 0.05 } }}
        >
          <div className="flex flex-col items-center gap-8">
            {/* Horizontal line */}
            <div
              ref={lineRef}
              className="w-16 h-[1px] bg-accent origin-left"
              style={{ transform: 'scaleX(0)' }}
            />

            {/* Name */}
            <div ref={nameRef} className="overflow-hidden">
              <div className="flex items-baseline gap-[1px]">
                {'ADITYA ROY'.split('').map((char, i) => (
                  <span
                    key={i}
                    className="char inline-block font-display text-4xl md:text-6xl tracking-[0.1em] text-text-primary font-light"
                    style={{ opacity: 0 }}
                  >
                    {char === ' ' ? '\u00A0\u00A0' : char}
                  </span>
                ))}
              </div>
            </div>

            {/* Role */}
            <div ref={roleRef} style={{ opacity: 0 }}>
              <p className="text-xs font-mono uppercase tracking-[0.3em] text-text-muted">
                Full Stack Web Developer &bull; Cybersecurity
              </p>
            </div>

            {/* Counter */}
            <div className="absolute bottom-12 right-12">
              <span
                ref={counterRef}
                className="font-mono text-sm text-text-muted tabular-nums tracking-widest"
              >
                000
              </span>
            </div>

            {/* Corner decoration */}
            <div className="absolute top-12 left-12 w-8 h-8 border-l border-t border-accent/30" />
            <div className="absolute bottom-12 left-12 w-8 h-8 border-l border-b border-accent/30" />
            <div className="absolute top-12 right-12 w-8 h-8 border-r border-t border-accent/30" />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
