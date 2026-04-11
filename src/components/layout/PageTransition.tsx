'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from '@/lib/gsap';
import { projects } from '@/data/projects';

export default function PageTransition() {
  const layer1Ref = useRef<HTMLDivElement>(null);
  const layer2Ref = useRef<HTMLDivElement>(null);
  const accentRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const isFirst = useRef(true);
  const prev = useRef(pathname);

  useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false;
      prev.current = pathname;
      return;
    }

    if (prev.current === pathname) return;
    prev.current = pathname;

    const l1 = layer1Ref.current;
    const l2 = layer2Ref.current;
    const accent = accentRef.current;
    const text = textRef.current;
    const counter = counterRef.current;
    const title = titleRef.current;
    const line = lineRef.current;
    if (!l1 || !l2 || !accent || !text || !counter || !title || !line) return;

    // Detect project page, home page, or archive page
    const projectMatch = pathname.match(/^\/work\/(.+)$/);
    let name = '';
    let idx = '';
    
    if (pathname === '/') {
      name = 'Aditya Roy';
      idx = 'Home';
    } else if (pathname === '/work') {
      name = 'All Projects';
      idx = 'Archive';
    } else if (projectMatch) {
      const slug = projectMatch[1];
      const pIdx = projects.findIndex(p => p.slug === slug);
      if (pIdx !== -1) {
        name = projects[pIdx].title;
        idx = `0${pIdx + 1}`;
      }
    }

    // Set text content synchronously via DOM
    title.textContent = name;
    counter.textContent = idx;

    const ease = 'power4.inOut';
    const hasProject = name.length > 0;

    const tl = gsap.timeline();

    // ── SWEEP IN ──
    tl.set([l1, l2, accent], { display: 'block', yPercent: -100 })
      .set(text, { display: hasProject ? 'flex' : 'none' })
      .set([counter, title], { opacity: 0, y: 30 })
      .set(line, { scaleX: 0 })
      // Layer 1: bg
      .to(l1, { yPercent: 0, duration: 0.55, ease })
      // Neon accent stripe
      .to(accent, { yPercent: 0, duration: 0.55, ease }, '-=0.35')
      // Layer 2: surface
      .to(l2, { yPercent: 0, duration: 0.55, ease }, '-=0.35');

    // ── PROJECT NAME REVEAL ──
    if (hasProject) {
      tl.to(counter, {
        y: 0, opacity: 1, duration: 0.35, ease: 'power3.out',
      }, '-=0.1')
      .to(title, {
        y: 0, opacity: 1, skewY: 0, duration: 0.5, ease: 'power3.out',
      }, '-=0.25')
      .to(line, {
        scaleX: 1, duration: 0.4, ease: 'power3.out',
      }, '-=0.3')
      // Hold to read the title
      .to({}, { duration: 0.4 })
      // Fade out
      .to([counter, title, line], {
        opacity: 0, y: -20, duration: 0.25, ease: 'power3.in',
      });
    } else {
      tl.to({}, { duration: 0.15 });
    }

    // ── SCROLL RESET (while covered) ──
    tl.call(() => {
      window.scrollTo(0, 0);
      const lenis = (window as any).__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
    });

    // ── SWEEP OUT ──
    tl.to(l2, { yPercent: 100, duration: 0.55, ease })
      .to(accent, { yPercent: 100, duration: 0.55, ease }, '-=0.35')
      .to(l1, { yPercent: 100, duration: 0.55, ease }, '-=0.35')
      .set([l1, l2, accent, text], { display: 'none' });
  }, [pathname]);

  const layerBase: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    display: 'none',
    willChange: 'transform',
  };

  return (
    <>
      {/* Layer 1 — base bg */}
      <div
        ref={layer1Ref}
        style={{ ...layerBase, backgroundColor: 'var(--bg)', zIndex: 10001 }}
      />
      {/* Neon accent stripe */}
      <div
        ref={accentRef}
        style={{ ...layerBase, backgroundColor: 'var(--accent)', zIndex: 10002 }}
      />
      {/* Layer 2 — surface */}
      <div
        ref={layer2Ref}
        style={{ ...layerBase, backgroundColor: 'var(--surface)', zIndex: 10003 }}
      />

      {/* Project name overlay (sits above all layers) */}
      <div
        ref={textRef}
        className="fixed inset-0 flex-col items-center justify-center pointer-events-none"
        style={{ display: 'none', zIndex: 10004 }}
      >
        <span
          ref={counterRef}
          className="block font-mono text-sm tracking-[0.3em] uppercase mb-4"
          style={{ color: 'var(--accent)' }}
        />
        <h2
          ref={titleRef}
          className="font-display text-center px-8"
          style={{
            color: 'var(--text-primary)',
            fontSize: 'clamp(2.5rem, 8vw, 6rem)',
            lineHeight: 1.1,
            maxWidth: '80vw',
          }}
        />
        <div
          ref={lineRef}
          className="mt-6"
          style={{
            width: 60,
            height: 2,
            backgroundColor: 'var(--accent)',
            transformOrigin: 'center',
          }}
        />
      </div>
    </>
  );
}
