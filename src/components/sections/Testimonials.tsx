'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TESTIMONIALS = [
  {
    quote: 'Aditya brought a unique combination of security-first thinking and clean code to our project. The backend architecture he built is both robust and elegant. A developer you can truly trust.',
    name: 'Team Lead',
    company: 'NullClass EdTech',
    role: 'Cybersecurity Division',
  },
  {
    quote: 'His attention to detail in both development and security aspects of our project was impressive. Aditya delivered a solution that exceeded our expectations in performance and reliability.',
    name: 'Project Mentor',
    company: 'VIT Bhopal',
    role: 'Computer Science Dept.',
  },
  {
    quote: 'Working with Aditya was a fantastic experience. He combines strong technical skills with a genuine passion for cybersecurity, producing work that is both functional and secure from day one.',
    name: 'Peer Developer',
    company: 'Hackathon Team',
    role: 'SpaceVita CodeJam',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setCurrent((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section className="section-spacing bg-bg-secondary relative overflow-hidden">
      <div className="container-main relative">
        {/* Giant quotation mark */}
        <span className="absolute -top-8 left-0 text-[200px] md:text-[300px] leading-none font-display text-accent/5 select-none pointer-events-none">
          &ldquo;
        </span>

        <p className="text-label mb-16">What People Say</p>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center"
            >
              {/* Quote */}
              <p className="text-h2 font-display text-text-primary leading-snug mb-12">
                &ldquo;{TESTIMONIALS[current].quote}&rdquo;
              </p>

              {/* Attribution */}
              <div className="flex flex-col items-center gap-1">
                <span className="text-base font-sans font-semibold text-text-primary">
                  {TESTIMONIALS[current].name}
                </span>
                <span className="text-sm text-text-secondary">
                  {TESTIMONIALS[current].role}, {TESTIMONIALS[current].company}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="Previous testimonial"
              data-cursor="link"
            >
              ←
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? 'bg-accent w-6'
                      : 'bg-text-muted hover:bg-text-secondary'
                  }`}
                  aria-label={`Go to testimonial ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-12 h-12 rounded-full border border-border flex items-center justify-center text-text-secondary hover:border-accent hover:text-accent transition-all duration-300"
              aria-label="Next testimonial"
              data-cursor="link"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
