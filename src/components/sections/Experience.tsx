'use client';

import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll } from 'framer-motion';
import SplitText from '@/components/ui/SplitText';

const JOURNEY = [
  {
    role: 'Cybersecurity Intern',
    period: 'May 2025 - June 2025',
    company: 'NullClass EdTech Private Limited',
    location: 'Mumbai, India',
    description: 'Learned and upgraded my skills in SOC Analysis, came to know about SOC in detail, their role and responsibilities. Performed hands-on training lab exercises.',
    skillsLabel: 'Technologies & Skills:',
    skills: ['Python', 'SOC Analysis', 'Intrusion Detection', 'IDPS', 'IPS', 'SIEM']
  },
  {
    role: 'Core Team Member Cisco Club',
    period: 'Nov 2024 - Ongoing',
    company: 'Cisco Technical Club',
    location: 'VIT Bhopal University, Bhopal',
    description: 'Responsible for researching about Cisco Technologies that make impact in real world. Making sure of tasks and formalities during Cisco events.',
    skillsLabel: 'Technologies & Skills:',
    skills: ['Effective Communication', 'Team Work', 'Researching']
  },
  {
    role: 'Core Team Member Microsoft Technical Club',
    period: 'Nov 2024 - Ongoing',
    company: 'Microsoft Technical Club',
    location: 'VIT Bhopal University, Bhopal',
    description: 'Responsible for researching about Microsoft Technologies that make impact in real world. Making sure of tasks and formalities during Microsoft club events.',
    skillsLabel: 'Technologies & Skills:',
    skills: ['Effective Communication', 'Team Work', 'Researching']
  }
];

const EDUCATION = [
  {
    role: 'Bachelor of Technology in Computer Science',
    period: '2023 - 2027',
    company: 'VIT Bhopal University',
    location: 'Bhopal, India',
    description: 'Focused on cybersecurity, web development, and data structures. Participated in hackathons and coding competitions.',
    skillsLabel: 'Achievements & Honors:',
    skills: ['InnovMinds Expo Winner 2025', 'Spacevita hackathon Deep-Space CodeJam 2nd place', 'Several Certifications from Microsoft, Google and LinkedIn']
  },
  {
    role: 'Higher Secondary Certificate (HSC)',
    period: '2021 - 2023',
    company: 'Shree LR Tiwari College of Engineering',
    location: 'Mumbai, India',
    description: 'Science stream with Mathematics, Physics, and Chemistry.',
    skillsLabel: '',
    skills: []
  },
  {
    role: 'Indian Certificate of Secondary Education (ICSE)',
    period: '2012 - 2021',
    company: 'RBK School',
    location: 'Mumbai, India',
    description: 'Secondary Education subjects like Maths, Physics, History, Geography, Biology.',
    skillsLabel: '',
    skills: []
  }
];

export default function Experience() {
  const [activeTab, setActiveTab] = useState<'journey' | 'education'>('journey');
  const items = activeTab === 'journey' ? JOURNEY : EDUCATION;
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start center', 'end center']
  });

  return (
    <section id="experience" className="section-spacing relative">
      <div className="container-main">
        {/* Header & Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <div>
            <p className="text-label mb-4">Background</p>
            <SplitText className="text-h1 font-display text-text-primary" type="words">
              My Journey
            </SplitText>
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
          <div className="absolute left-[24px] md:left-1/2 top-4 bottom-4 w-[1px] bg-border md:-translate-x-1/2" />
          
          {/* Animated line */}
          <motion.div 
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
                  <div className="absolute left-[24px] md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-bg ring-2 ring-border z-30 transition-all duration-500 overflow-hidden group">
                    <motion.div 
                      className="absolute inset-0 bg-accent rounded-full scale-0"
                      style={{ scale: scrollYProgress }}
                    />
                  </div>

                  {/* Content Card */}
                  <div className={`flex-1 w-full pl-16 md:pl-0 ${i % 2 === 1 ? 'md:pl-16' : 'md:pr-16 text-left md:text-right'}`}>
                    <div className="relative glass rounded-2xl p-8 md:p-10 group grain transition-transform duration-500 hover:-translate-y-1">
                      <p className="text-accent font-mono text-xs tracking-widest mb-3">
                        {item.period}
                      </p>
                      <h3 className="text-xl lg:text-2xl font-sans font-semibold text-text-primary mb-2">
                        {item.role}
                      </h3>
                      <p className="text-text-secondary font-medium mb-6">
                        {item.company} &bull; {item.location}
                      </p>
                      <p className="text-sm text-text-muted leading-relaxed mb-6">
                        {item.description}
                      </p>

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

                      {/* Hover glow for card */}
                      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                        style={{
                          background: 'radial-gradient(circle at 50% 0%, rgba(232, 255, 71, 0.04) 0%, transparent 60%)',
                        }}
                      />
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
