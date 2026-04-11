'use client';

import { gsap, ScrollTrigger } from './gsap';

/**
 * Reveal text by animating words/chars from below.
 * Expects the element to contain <span class="word"> children.
 */
export function revealText(
  el: HTMLElement,
  options?: { stagger?: number; duration?: number; y?: number; delay?: number }
) {
  const words = el.querySelectorAll('.word');
  if (!words.length) return null;

  return gsap.fromTo(
    words,
    {
      y: options?.y ?? 80,
      opacity: 0,
      rotateX: 10,
    },
    {
      y: 0,
      opacity: 1,
      rotateX: 0,
      duration: options?.duration ?? 1,
      stagger: options?.stagger ?? 0.06,
      delay: options?.delay ?? 0,
      ease: 'power3.out',
    }
  );
}

/**
 * Reveal an image with clip-path and scale.
 */
export function revealImage(el: HTMLElement) {
  const img = el.querySelector('img') || el.querySelector('video') || el;
  
  const tl = gsap.timeline();
  
  tl.fromTo(
    el,
    { clipPath: 'inset(100% 0 0 0)' },
    {
      clipPath: 'inset(0% 0 0 0)',
      duration: 1.2,
      ease: 'power3.inOut',
    }
  ).fromTo(
    img,
    { scale: 1.2 },
    {
      scale: 1,
      duration: 1.4,
      ease: 'power3.out',
    },
    0
  );

  return tl;
}

/**
 * Magnetic hover effect for buttons/links.
 */
export function magneticHover(el: HTMLElement, strength = 0.3) {
  const handleMove = (e: MouseEvent) => {
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(el, {
      x: x * strength,
      y: y * strength,
      duration: 0.3,
      ease: 'power2.out',
    });
  };

  const handleLeave = () => {
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.6,
      ease: 'elastic.out(1, 0.3)',
    });
  };

  el.addEventListener('mousemove', handleMove);
  el.addEventListener('mouseleave', handleLeave);

  return () => {
    el.removeEventListener('mousemove', handleMove);
    el.removeEventListener('mouseleave', handleLeave);
  };
}

/**
 * Horizontal scroll section pinned with ScrollTrigger.
 */
export function horizontalScroll(container: HTMLElement) {
  const scrollContent = container.querySelector('[data-scroll-content]') as HTMLElement;
  if (!scrollContent) return null;

  const totalWidth = scrollContent.scrollWidth - window.innerWidth;

  return ScrollTrigger.create({
    trigger: container,
    start: 'top top',
    end: () => `+=${totalWidth}`,
    pin: true,
    scrub: 1,
    invalidateOnRefresh: true,
    animation: gsap.to(scrollContent, {
      x: -totalWidth,
      ease: 'none',
    }),
  });
}

/**
 * Count-up number animation.
 */
export function counterAnimation(
  el: HTMLElement,
  target: number,
  options?: { duration?: number; suffix?: string, prefix?: string }
) {
  const obj = { val: 0 };
  const suffix = options?.suffix ?? '';
  const prefix = options?.prefix ?? '';

  return gsap.to(obj, {
    val: target,
    duration: options?.duration ?? 2,
    ease: 'power2.out',
    onUpdate: () => {
      el.textContent = prefix + Math.round(obj.val) + suffix;
    },
  });
}

/**
 * Create a ScrollTrigger-based reveal animation.
 */
export function scrollReveal(
  el: HTMLElement | HTMLElement[],
  fromVars: gsap.TweenVars,
  toVars?: gsap.TweenVars,
  triggerOptions?: Partial<ScrollTrigger.Vars>
) {
  return gsap.fromTo(el, fromVars, {
    ...toVars,
    scrollTrigger: {
      trigger: Array.isArray(el) ? el[0] : el,
      start: 'top 85%',
      toggleActions: 'play none none none',
      ...triggerOptions,
    },
  });
}
