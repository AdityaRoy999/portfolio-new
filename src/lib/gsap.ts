'use client';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register plugins once
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

// Global defaults
gsap.defaults({
  ease: 'power3.out',
  duration: 1,
});

export { gsap, ScrollTrigger };
