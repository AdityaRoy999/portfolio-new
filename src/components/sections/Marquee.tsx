'use client';

import MarqueeText from '@/components/ui/MarqueeText';

const MARQUEE_ITEMS = [
  'Python', '•', 'Node.js', '•', 'React', '•', 'Next.js', '•',
  'TypeScript', '•', 'Docker', '•', 'Cybersecurity', '•',
  'Open to Work', '•', '2024', '•',
];

export default function Marquee() {
  return (
    <section className="py-8 border-y border-border overflow-hidden">
      <MarqueeText speed={40} className="mb-2">
        {MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            className={`text-sm md:text-base font-mono uppercase tracking-[0.2em] ${
              item === '•'
                ? 'text-accent text-lg'
                : 'text-text-muted hover:text-text-primary transition-colors duration-300'
            }`}
          >
            {item}
          </span>
        ))}
      </MarqueeText>
      <MarqueeText speed={40} reverse className="mt-2">
        {MARQUEE_ITEMS.map((item, i) => (
          <span
            key={i}
            className={`text-sm md:text-base font-mono uppercase tracking-[0.2em] ${
              item === '•'
                ? 'text-accent-warm text-lg'
                : 'text-text-muted hover:text-text-primary transition-colors duration-300'
            }`}
          >
            {item}
          </span>
        ))}
      </MarqueeText>
    </section>
  );
}
