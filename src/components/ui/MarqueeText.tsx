'use client';

interface MarqueeTextProps {
  children: React.ReactNode;
  speed?: number; // in seconds
  reverse?: boolean;
  className?: string;
  pauseOnHover?: boolean;
}

export default function MarqueeText({
  children,
  speed = 30,
  reverse = false,
  className = '',
  pauseOnHover = true,
}: MarqueeTextProps) {
  return (
    <div
      className={`overflow-hidden whitespace-nowrap ${pauseOnHover ? 'group' : ''} ${className}`}
    >
      <div
        className={`inline-flex ${pauseOnHover ? 'group-hover:[animation-play-state:paused]' : ''}`}
        style={{
          animation: `${reverse ? 'marquee-reverse' : 'marquee'} ${speed}s linear infinite`,
        }}
      >
        {/* Duplicate content for seamless loop */}
        <span className="inline-flex items-center gap-8 mr-8">{children}</span>
        <span className="inline-flex items-center gap-8 mr-8" aria-hidden>{children}</span>
      </div>
    </div>
  );
}
