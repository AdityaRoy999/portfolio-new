'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface HoverSplitTextProps {
  text: string;
  className?: string;
  defaultColor?: string;
  hoverColor?: string;
  underlineClassName?: string;
}

export default function HoverSplitText({ 
  text, 
  className = '',
  defaultColor = 'text-text-secondary',
  hoverColor = 'text-text-primary',
  underlineClassName = 'bg-accent'
}: HoverSplitTextProps) {
  const chars = text.split('');

  return (
    <motion.span
      initial="initial"
      whileHover="hover"
      className={`inline-flex w-fit flex-col items-start cursor-pointer select-none leading-[1.08] ${className}`}
    >
      <span className="relative inline-flex overflow-hidden leading-[1.08]">
        <span className={`flex whitespace-nowrap transition-colors duration-300 ${defaultColor} leading-[1.08]`}>
          {chars.map((char, i) => (
            <span key={`top-wrap-${i}`} className="relative inline-grid overflow-hidden align-top leading-[1.08]">
              <motion.span
                key={`top-${i}`}
                variants={{
                  initial: { y: 0 },
                  hover: { y: '-115%' },
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
                className="inline-block leading-[1.08] will-change-transform"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))}
        </span>
        <span className={`pointer-events-none absolute left-0 top-0 flex whitespace-nowrap leading-[1.08] ${hoverColor}`}>
          {chars.map((char, i) => (
            <span key={`bottom-wrap-${i}`} className="relative inline-grid overflow-hidden align-top leading-[1.08]">
              <motion.span
                key={`bottom-${i}`}
                variants={{
                  initial: { y: '110%' },
                  hover: { y: 0 },
                }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1], delay: i * 0.02 }}
                className="inline-block leading-[1.08] will-change-transform"
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            </span>
          ))}
        </span>
      </span>
      <motion.span
        aria-hidden="true"
        className={`mt-[0.14em] h-px w-full origin-left ${underlineClassName}`}
        variants={{
          initial: { scaleX: 0, opacity: 0 },
          hover: { scaleX: 1, opacity: 1 },
        }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.span>
  );
}