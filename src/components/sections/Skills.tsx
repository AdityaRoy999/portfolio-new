'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { services } from '@/data/skills';
import SplitText from '@/components/ui/SplitText';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline
      const words = headlineRef.current?.querySelectorAll('.word');
      if (words) {
        gsap.fromTo(
          words,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            duration: 1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: headlineRef.current,
              start: 'top 85%',
            },
          }
        );
      }

      // Cards stagger in and organic drift
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const delay = (i % 2) * 0.1;
        gsap.fromTo(
          card,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.8,
            delay: delay,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 95%',
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="skills" className="section-spacing">
      <div className="container-main">
        <p className="text-label mb-4">What I Do</p>
        <div ref={headlineRef} className="mb-16">
          <SplitText className="text-h1 font-display text-text-primary" type="words">
            Expertise
          </SplitText>
        </div>

        {/* Cards — simple responsive grid, no horizontal scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative glass rounded-2xl p-8 md:p-10 flex flex-col gap-6 group grain"
            >
              {/* Icon */}
              <span className="text-4xl leading-none">{service.icon}</span>

              {/* Number */}
              <span className="absolute top-8 right-8 text-mono text-sm text-text-muted">
                0{i + 1}
              </span>

              {/* Title */}
              <h3 className="text-xl font-sans font-semibold text-text-primary">
                {service.title}
              </h3>

              {/* Description */}
              <p className="text-sm text-text-secondary leading-relaxed">
                {service.description}
              </p>

              {/* Items */}
              <ul className="flex flex-col gap-2 mt-auto">
                {service.items.map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-3 text-sm text-text-muted"
                  >
                    <span className="w-1 h-1 rounded-full bg-accent shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              {/* Hover glow */}
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'radial-gradient(circle at 50% 0%, rgba(232, 255, 71, 0.04) 0%, transparent 60%)',
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
