'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { Link } from 'next-view-transitions';
import { motion, AnimatePresence } from 'framer-motion';
import FillButton from '@/components/ui/FillButton';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import HoverSplitText from '@/components/ui/HoverSplitText';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Scroll state for glass effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll progress bar
  useEffect(() => {
    if (!progressRef.current) return;

    gsap.to(progressRef.current, {
      scaleX: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: document.body,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 0.3,
      },
    });
  }, []);

  // Smooth scroll to anchor sections using Lenis
  const handleNavClick = useCallback((e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return;

    // Use Lenis scrollTo if available, otherwise fallback
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(targetEl, { offset: -80, duration: 1.2 });
    } else {
      targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    setMobileOpen(false);
  }, []);

  const toggleTheme = (e: React.MouseEvent) => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    
    // Set custom properties for click origin
    document.documentElement.style.setProperty('--click-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--click-y', `${e.clientY}px`);

    if (!document.startViewTransition) {
      setTheme(newTheme);
      return;
    }

    document.documentElement.classList.add('theme-transition');
    const transition = document.startViewTransition(() => {
      setTheme(newTheme);
    });

    transition.finished.then(() => {
      document.documentElement.classList.remove('theme-transition');
    });
  };

  const logoText = 'ADITYA ROY';

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
          scrolled
            ? 'bg-[var(--header-bg)]'
            : 'bg-transparent'
        }`}
      >
        <div className="container-main flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            href="/"
            className="group flex items-center gap-0 text-text-primary no-underline"
            data-cursor="link"
          >
            {logoText.split('').map((char, i) => (
              <span
                key={i}
                className="inline-block text-sm font-mono tracking-[0.15em] font-medium transition-all duration-300 ease-expo group-hover:tracking-[0.3em]"
                style={{ transitionDelay: `${i * 15}ms` }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-10">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="text-sm font-sans font-medium transition-colors duration-300 uppercase tracking-[0.1em]"
                data-cursor="link"
              >
                <HoverSplitText text={link.label} />
              </a>
            ))}
            <FillButton
              href="#contact"
              onClick={(e) => handleNavClick(e, '#contact')}
              className="primary text-xs"
              data-cursor="link"
            >
              Let&apos;s Talk
            </FillButton>

            {/* Theme Toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors duration-300 ml-4"
                aria-label="Toggle theme"
                data-cursor="link"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
          </div>

          {/* Mobile Hamburger & Theme (Mobile) */}
          <div className="md:hidden flex items-center gap-4">
            {mounted && (
              <button
                onClick={toggleTheme}
                className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary transition-colors duration-300"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            )}
            <button
              className="flex flex-col justify-center items-center w-10 h-10 gap-1.5"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            <motion.span
              className="block w-6 h-[1.5px] bg-text-primary origin-center"
              animate={mobileOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-text-primary"
              animate={mobileOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
              transition={{ duration: 0.2 }}
            />
            <motion.span
              className="block w-6 h-[1.5px] bg-text-primary origin-center"
              animate={mobileOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent overflow-hidden">
          <div
            ref={progressRef}
            className="w-full h-full bg-accent origin-left"
            style={{ transform: 'scaleX(0)' }}
          />
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[99] bg-bg flex flex-col items-center justify-center gap-8"
            initial={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 40px) 40px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 40px) 40px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            {NAV_LINKS.map((link, i) => (
              <motion.a
                key={link.label}
                href={link.href}
                className="text-h2 font-display text-text-primary no-underline"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{
                  delay: 0.1 + i * 0.08,
                  duration: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                <HoverSplitText text={link.label} className="!overflow-visible" hoverColor="text-accent" />
              </motion.a>
            ))}
            <FillButton
              href="#contact"
              className="primary mt-4"
              onClick={(e) => handleNavClick(e, '#contact')}
            >
              Let&apos;s Talk
            </FillButton>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
