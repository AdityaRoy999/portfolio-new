'use client';

import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import { services } from '@/data/skills';
import HoverSplitText from '@/components/ui/HoverSplitText';

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Cards stagger in and organic drift
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
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
              end: 'top 70%',
              scrub: true,
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
        <div className="mb-16">
          <HoverSplitText
            text="Expertise"
            className="text-h2 lg:text-h1 font-display text-text-primary"
            defaultColor="text-text-primary"
            hoverColor="text-text-primary"
          />
        </div>

        {/* Cards — simple responsive grid, no horizontal scroll */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => { cardsRef.current[i] = el; }}
              className="relative glass glass-glow rounded-2xl p-8 md:p-10 flex flex-col gap-6 group grain transition-all duration-500"
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

            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
