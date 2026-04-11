'use client';

import { useRef, useEffect } from 'react';
import { magneticHover } from '@/lib/animations';

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  onClick?: () => void;
  href?: string;
  'data-cursor'?: string;
  'data-cursor-label'?: string;
}

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  onClick,
  href,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const cleanup = magneticHover(ref.current, strength);
    return cleanup;
  }, [strength]);

  const sharedProps = {
    ref: ref as any,
    className: `inline-block ${className}`,
    ...props,
  };

  if (href) {
    return (
      <a href={href} {...sharedProps}>
        {children}
      </a>
    );
  }

  return (
    <button onClick={onClick} {...sharedProps}>
      {children}
    </button>
  );
}
