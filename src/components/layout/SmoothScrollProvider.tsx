'use client';

import { ReactLenis } from 'lenis/react';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const lenisRef = useRef<any>(null);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);
    }

    gsap.ticker.add(update);
    gsap.ticker.lagSmoothing(0);

    // Expose lenis instance globally so Navbar can use it for smooth scrollTo
    if (lenisRef.current?.lenis) {
      (window as any).__lenis = lenisRef.current.lenis;
    }

    return () => {
      gsap.ticker.remove(update);
      delete (window as any).__lenis;
    };
  }, []);

  // Also set lenis on ref change
  useEffect(() => {
    const interval = setInterval(() => {
      if (lenisRef.current?.lenis) {
        (window as any).__lenis = lenisRef.current.lenis;
        clearInterval(interval);
      }
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <ReactLenis
      ref={lenisRef}
      root
      options={{
        lerp: 0.1,
        duration: 1.0,
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.5,
      }}
    >
      {children}
    </ReactLenis>
  );
}
