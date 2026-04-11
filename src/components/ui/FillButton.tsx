'use client';

import React, { useRef, MouseEvent } from 'react';

interface FillButtonProps {
  children: React.ReactNode;
  href?: string;
  className?: string;
  onClick?: (e: any) => void;
  'data-cursor'?: string;
  download?: string;
}

export default function FillButton({
  children,
  href,
  className = '',
  onClick,
  ...props
}: FillButtonProps) {
  const btnRef = useRef<HTMLElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    if (!btnRef.current) return;
    const rect = btnRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    btnRef.current.style.setProperty('--mouse-x', `${x}px`);
    btnRef.current.style.setProperty('--mouse-y', `${y}px`);
  };

  const Tag = href ? 'a' : 'button';

  return (
    <Tag
      ref={btnRef as any}
      href={href}
      onClick={onClick}
      onMouseEnter={handleMouseMove}
      onMouseMove={handleMouseMove}
      className={`hover-fill-btn ${className}`}
      {...props}
    >
      <div className="relative z-10 flex items-center gap-2 pointer-events-none">
        {children}
      </div>
    </Tag>
  );
}
