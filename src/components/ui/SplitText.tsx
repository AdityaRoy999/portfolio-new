'use client';

import React from 'react';

interface SplitTextProps {
  children: string;
  className?: string;
  type?: 'words' | 'chars' | 'both';
  tag?: React.ElementType;
}

export default function SplitText({
  children,
  className = '',
  type = 'words',
  tag: Tag = 'div',
}: SplitTextProps) {
  const words = children.split(' ');

  if (type === 'chars' || type === 'both') {
    return (
      <Tag className={className}>
        {words.map((word, wi) => (
          <span key={wi} className="word inline-block overflow-hidden">
            {word.split('').map((char, ci) => (
              <span
                key={ci}
                className="char inline-block"
                style={{ willChange: 'transform' }}
              >
                {char}
              </span>
            ))}
            {wi < words.length - 1 && <span className="char inline-block">&nbsp;</span>}
          </span>
        ))}
      </Tag>
    );
  }

  return (
    <Tag className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <span
            className="word inline-block"
            style={{ willChange: 'transform' }}
          >
            {word}
          </span>
          {i < words.length - 1 && <span>&nbsp;</span>}
        </span>
      ))}
    </Tag>
  );
}
