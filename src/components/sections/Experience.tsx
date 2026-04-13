'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import { gsap } from '@/lib/gsap';
import HoverSplitText from '@/components/ui/HoverSplitText';

const JOURNEY = [
  {
    role: 'Software Developer Intern',
    period: 'Nov 2025 - Present',
    company: 'NavRobotec',
    location: 'Remote',
    responsibilities: [
      'Built secure backend authenticated systems in C++ using the Drogon framework, increasing throughput and performance by 60%',
      'Developed high-performance AI pipelines boosting overall performance by 50%',
      'Redesigned and developed the company\'s website from scratch using Next.js and Node.js',
      'Implemented secure REST API endpoints with authentication and authorization',
    ],
    skillsLabel: 'Technologies & Skills:',
    skills: ['C++', 'Drogon Framework', 'Next.js', 'Node.js', 'AI Pipelines', 'Backend Security', 'REST APIs', 'System Design'],
    isCurrent: true,
  },
  {
    role: 'Cybersecurity Intern',
    period: 'May 2025 - June 2025',
    company: 'NullClass EdTech Private Limited',
    location: 'Mumbai, India',
    responsibilities: [
      'Learned and upgraded skills in SOC Analysis, understanding SOC roles and responsibilities in depth',
      'Performed hands-on training lab exercises on intrusion detection and prevention systems',
      'Gained practical experience with SIEM tools and security monitoring workflows',
    ],
    skillsLabel: 'Technologies & Skills:',
    skills: ['Python', 'SOC Analysis', 'Intrusion Detection', 'IDPS', 'IPS', 'SIEM'],
    isCurrent: false,
  },
  {
    role: 'Core Team Member Cisco Club',
    period: 'Nov 2024 - Ongoing',
    company: 'Cisco Technical Club',
    location: 'VIT Bhopal University, Bhopal',
    responsibilities: [
      'Researching Cisco Technologies that make real-world impact',
      'Managing tasks and formalities during Cisco events',
    ],
    skillsLabel: 'Technologies & Skills:',
    skills: ['Effective Communication', 'Team Work', 'Researching'],
    isCurrent: false,
  },
  {
    role: 'Core Team Member Microsoft Technical Club',
    period: 'Nov 2024 - Ongoing',
    company: 'Microsoft Technical Club',
    location: 'VIT Bhopal University, Bhopal',
    responsibilities: [
      'Researching Microsoft Technologies that make real-world impact',
      'Managing tasks and formalities during Microsoft club events',
    ],
    skillsLabel: 'Technologies & Skills:',
    skills: ['Effective Communication', 'Team Work', 'Researching'],
    isCurrent: false,
  }
];

const EDUCATION = [
  {
    role: 'Bachelor of Technology in Computer Science',
    period: '2023 - 2027',
    company: 'VIT Bhopal University',
    location: 'Bhopal, India',
    responsibilities: [
      'Focused on cybersecurity, web development, and data structures',
      'Participated in hackathons and coding competitions',
    ],
    skillsLabel: 'Achievements & Honors:',
    skills: ['InnovMinds Expo Winner 2025', 'Spacevita hackathon Deep-Space CodeJam 2nd place', 'Several Certifications from Microsoft, Google and LinkedIn'],
    isCurrent: false,
  },
  {
    role: 'Higher Secondary Certificate (HSC)',
    period: '2021 - 2023',
    company: 'Shree LR Tiwari College of Engineering',
    location: 'Mumbai, India',
    responsibilities: [
      'Science stream with Mathematics, Physics, and Chemistry',
    ],
    skillsLabel: '',
    skills: [],
    isCurrent: false,
  },
  {
    role: 'Indian Certificate of Secondary Education (ICSE)',
    period: '2012 - 2021',
    company: 'RBK School',
    location: 'Mumbai, India',
    responsibilities: [
      'Secondary Education subjects like Maths, Physics, History, Geography, Biology',
    ],
    skillsLabel: '',
    skills: [],
    isCurrent: false,
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'journey' | 'education'>('journey');
  const items = activeTab === 'journey' ? JOURNEY : EDUCATION;
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineTrackRef = useRef<HTMLDivElement>(null);
  const timelineLineRef = useRef<HTMLDivElement>(null);
  const dotAnchorRefs = useRef<(HTMLDivElement | null)[]>([]);
  const dotPulseRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const dotThresholdsRef = useRef<number[]>([]);
  const dotArmedRef = useRef<boolean[]>([]);
  const previousProgressRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = containerRef.current?.querySelectorAll('.experience-card');
      if (cards) {
        cards.forEach((card) => {
          gsap.fromTo(
            card,
            { y: 30, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              ease: 'none',
              scrollTrigger: {
                trigger: card,
                start: 'top 98%',
                end: 'top 75%',
                scrub: true,
              }
            }
          );
        });
      }
    }, containerRef);

    return () => ctx.revert();
  }, [activeTab]);

  useEffect(() => {
    const container = containerRef.current;
    const track = timelineTrackRef.current;
    if (!container || !track) return;

    const computeThresholds = () => {
      const containerRect = container.getBoundingClientRect();
      const trackRect = track.getBoundingClientRect();
      const trackTop = trackRect.top - containerRect.top;
      const trackHeight = trackRect.height;

      const thresholds: number[] = [];
      for (let i = 0; i < items.length; i += 1) {
        const dot = dotAnchorRefs.current[i];
        if (!dot || trackHeight <= 0) {
          thresholds.push(-1);
          continue;
        }

        const dotRect = dot.getBoundingClientRect();
        const dotCenter = dotRect.top - containerRect.top + dotRect.height / 2;
        const threshold = (dotCenter - trackTop) / trackHeight;
        thresholds.push(gsap.utils.clamp(0, 1, threshold));
      }

      dotThresholdsRef.current = thresholds;

      const currentProgress = scrollYProgress.get();
      dotArmedRef.current = thresholds.map((t) => Number.isFinite(t) && t >= 0 ? currentProgress < t - 0.004 : false);
    };

    const rafId = requestAnimationFrame(computeThresholds);
    const observer = new ResizeObserver(computeThresholds);

    observer.observe(container);
    observer.observe(track);
    dotAnchorRefs.current.forEach((dot) => {
      if (dot) observer.observe(dot);
    });

    window.addEventListener('resize', computeThresholds);

    return () => {
      cancelAnimationFrame(rafId);
      observer.disconnect();
      window.removeEventListener('resize', computeThresholds);
    };
  }, [activeTab, items.length, scrollYProgress]);

  useEffect(() => {
    previousProgressRef.current = scrollYProgress.get();

    const unsubscribe = scrollYProgress.on('change', (value) => {
      const previous = previousProgressRef.current;
      const epsilon = 0.004;

      for (let i = 0; i < items.length; i += 1) {
        const threshold = dotThresholdsRef.current[i];
        if (!Number.isFinite(threshold) || threshold < 0) continue;

        if (value < threshold - epsilon) {
          dotArmedRef.current[i] = true;
          continue;
        }

        const crossedDown = previous < threshold && value >= threshold;

        if (!crossedDown || !dotArmedRef.current[i]) continue;
        dotArmedRef.current[i] = false;

        const pulse = dotPulseRefs.current[i];
        if (pulse) {
          gsap.killTweensOf(pulse);
          gsap.fromTo(
            pulse,
            { scale: 1, opacity: 0.9 },
            { scale: 3, opacity: 0, duration: 0.65, ease: 'power2.out' }
          );
        }
      }

      previousProgressRef.current = value;
    });

    return () => unsubscribe();
  }, [activeTab, items.length, scrollYProgress]);

  return (
    <section id="experience" className="section-spacing relative">
      <div className="container-main">
        {/* Header & Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <p className="text-label mb-4">Background</p>
            <HoverSplitText
              text="My Journey"
              className="text-h2 lg:text-h1 font-display text-text-primary"
              defaultColor="text-text-primary"
              hoverColor="text-text-primary"
            />
          </div>

          {/* Switcher */}
          <div className="relative inline-flex p-1 bg-bg-secondary rounded-full border border-border">
            <button
              className={`relative z-10 px-6 py-3 rounded-full text-sm font-mono tracking-[0.15em] transition-colors duration-300 ${
                activeTab === 'journey'
                  ? 'text-[#050505] font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={() => setActiveTab('journey')}
            >
              EXPERIENCE
              {activeTab === 'journey' && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-accent rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
            <button
              className={`relative z-10 px-6 py-3 rounded-full text-sm font-mono tracking-[0.15em] transition-colors duration-300 ${
                activeTab === 'education'
                  ? 'text-[#050505] font-semibold'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
              onClick={() => setActiveTab('education')}
            >
              EDUCATION
              {activeTab === 'education' && (
                <motion.div
                  layoutId="activeTabBadge"
                  className="absolute inset-0 bg-accent rounded-full -z-10"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          </div>
        </div>

        {/* Timeline */}
        <div ref={containerRef} className="relative">
          {/* Static Background line */}
          <div ref={timelineTrackRef} className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[1px] bg-border md:-translate-x-1/2" />
          
          {/* Animated line */}
          <motion.div 
            ref={timelineLineRef}
            className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[1px] bg-accent md:-translate-x-1/2 origin-top z-10"
            style={{ scaleY: scrollYProgress }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="flex flex-col gap-12 md:gap-24 relative z-20"
            >
              {items.map((item, i) => (
                <div
                  key={i}
                  className={`relative flex flex-col md:flex-row gap-8 md:gap-16 items-center ${
                    i % 2 === 1 ? 'md:flex-row-reverse' : ''
                  }`}
                >
                  {/* Timeline Dot */}
                  <div
                    ref={(el) => {
                      dotAnchorRefs.current[i] = el;
                    }}
                    className="absolute left-[24px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg ring-2 ring-border z-30 transition-all duration-500 flex items-center justify-center"
                  >
                    <span
                      ref={(el) => {
                        dotPulseRefs.current[i] = el;
                      }}
                      className="absolute inset-0 rounded-full border-2 border-accent opacity-0 pointer-events-none will-change-transform"
                    />
                    <span
                      className="relative block w-2 h-2 rounded-full bg-accent"
                    />
                  </div>

                  {/* Content Card */}
                  <div className={`experience-card flex-1 w-full pl-16 md:pl-0 ${i % 2 === 1 ? 'md:pl-16' : 'md:pr-16'}`}>
                    <div className="relative glass glass-glow rounded-2xl p-8 md:p-10 group grain transition-all duration-500">
                      <div className="flex items-center gap-3 mb-3">
                        <p className="text-accent font-mono text-xs tracking-widest">
                          {item.period}
                        </p>
                        {item.isCurrent && (
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-green-500/15 border border-green-500/30 rounded-full text-[10px] font-mono font-semibold tracking-widest text-green-400 uppercase">
                            <span className="relative flex h-2 w-2">
                              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            Live
                          </span>
                        )}
                      </div>
                      <h3 className="text-xl lg:text-2xl font-sans font-semibold text-text-primary mb-2">
                        {item.role}
                      </h3>
                      <p className="text-text-secondary font-medium mb-6">
                        {item.company} &bull; {item.location}
                      </p>
                      <div className="mb-6">
                        <p className="text-text-secondary text-xs uppercase tracking-widest font-mono mb-3">Roles & Responsibilities:</p>
                        <ul className="flex flex-col gap-2">
                          {item.responsibilities.map((resp, ri) => (
                            <li key={ri} className="flex items-start gap-3 text-sm text-text-muted leading-relaxed">
                              <span className="w-1 h-1 rounded-full bg-accent shrink-0 mt-2" />
                              {resp}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {item.skills.length > 0 && (
                        <div className="mt-auto">
                          {item.skillsLabel && (
                            <p className="text-text-secondary text-xs uppercase tracking-widest font-mono mb-3">
                              {item.skillsLabel}
                            </p>
                          )}
                          <div
                            className={`flex flex-wrap gap-2 ${
                              i % 2 === 1 ? '' : 'md:justify-end'
                            }`}
                          >
                            {item.skills.map((s) => (
                              <span
                                key={s}
                                className="px-3 py-1.5 bg-surface border border-border text-xs font-mono tracking-wide rounded-full text-text-muted cursor-default transition-colors duration-300 hover:border-accent hover:text-accent"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* Empty spacer for the other side on desktop */}
                  <div className="hidden md:block flex-1" />
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
