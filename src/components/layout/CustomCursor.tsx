'use client';

import { useEffect, useRef, useCallback, useState } from 'react';

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const isTouch = useRef(false);
  const rafId = useRef<number>(0);
  const mouse = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const variant = useRef<'default' | 'link' | 'image' | 'pill'>('default');

  const applyVariant = useCallback((v: 'default' | 'link' | 'image' | 'pill', label?: string) => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    const textSpan = textRef.current;
    if (!dot || !ring || !textSpan) return;

    variant.current = v;

    if (label) {
      textSpan.textContent = label;
    }

    switch (v) {
      case 'link':
        dot.style.opacity = '0';
        ring.style.opacity = '1';
        ring.style.width = '50px';
        ring.style.height = '50px';
        ring.style.borderRadius = '50%';
        ring.style.borderColor = 'var(--accent)';
        ring.style.backgroundColor = 'rgba(232, 255, 71, 0.08)';
        textSpan.style.opacity = '0';
        break;
      case 'image':
        dot.style.opacity = '0';
        ring.style.opacity = '0';
        ring.style.width = '80px';
        ring.style.height = '80px';
        ring.style.borderRadius = '50%';
        ring.style.borderColor = 'var(--text-primary)';
        ring.style.backgroundColor = 'rgba(245, 245, 240, 0.05)';
        textSpan.style.opacity = '0';
        break;
      case 'pill':
        dot.style.opacity = '0';
        ring.style.opacity = '1';
        ring.style.width = 'max-content';
        ring.style.padding = '0 16px';
        ring.style.height = '40px';
        ring.style.borderRadius = '20px';
        ring.style.borderColor = 'var(--accent)';
        ring.style.backgroundColor = 'var(--accent)';
        // Center text perfectly
        ring.style.display = 'flex';
        ring.style.alignItems = 'center';
        ring.style.justifyContent = 'center';
        textSpan.style.opacity = '1';
        textSpan.style.color = 'var(--bg)';
        textSpan.style.fontWeight = '600';
        textSpan.style.letterSpacing = '0.05em';
        break;
      default:
        dot.style.opacity = '1';
        ring.style.opacity = '1';
        ring.style.width = '36px';
        ring.style.height = '36px';
        ring.style.padding = '0';
        ring.style.borderRadius = '50%';
        ring.style.borderColor = 'var(--border)';
        ring.style.backgroundColor = 'transparent';
        textSpan.style.opacity = '0';
        break;
    }
  }, []);

  useEffect(() => {
    isTouch.current = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch.current) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const animate = () => {
      const { x, y } = mouse.current;

      // Dot snaps to cursor
      dot.style.left = `${x}px`;
      dot.style.top = `${y}px`;

      // Ring lerps behind
      ringPos.current.x += (x - ringPos.current.x) * 0.15;
      ringPos.current.y += (y - ringPos.current.y) * 0.15;
      ring.style.left = `${ringPos.current.x}px`;
      ring.style.top = `${ringPos.current.y}px`;

      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onDown = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(0.7)';
      ring.style.transform = 'translate(-50%, -50%) scale(0.7)';
    };
    const onUp = () => {
      dot.style.transform = 'translate(-50%, -50%) scale(1)';
      ring.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('[data-cursor]');
      if (!target) return;
      const type = target.getAttribute('data-cursor');
      const label = target.getAttribute('data-cursor-label') || '';
      
      if (type === 'image') applyVariant('image', label);
      else if (type === 'pill') applyVariant('pill', label);
      else applyVariant('link', label);
    };

    const onOut = (e: MouseEvent) => {
      const from = (e.target as HTMLElement).closest('[data-cursor]');
      const to = (e.relatedTarget as HTMLElement | null)?.closest('[data-cursor]');
      if (from && !to) applyVariant('default');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      cancelAnimationFrame(rafId.current);
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
    };
  }, [applyVariant]);

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        className="fixed pointer-events-none z-[9999] hidden md:block"
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--text-primary)',
          transform: 'translate(-50%, -50%) scale(1)',
          willChange: 'left, top',
          transition: 'opacity 0.3s ease, background-color 0.3s ease',
          top: -100,
          left: -100,
        }}
      />
      {/* Ring / Pill wrapper */}
      <div
        ref={ringRef}
        className="fixed pointer-events-none z-[9998] hidden md:flex"
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1px solid var(--border)',
          backgroundColor: 'transparent',
          transform: 'translate(-50%, -50%) scale(1)',
          willChange: 'left, top, width, height, padding',
          transition:
            'opacity 0.3s ease, width 0.4s cubic-bezier(0.16, 1, 0.3, 1), height 0.4s cubic-bezier(0.16, 1, 0.3, 1), padding 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-radius 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.3s ease, background-color 0.3s ease, transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
          top: -100,
          left: -100,
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span
          ref={textRef}
          className="text-xs font-mono uppercase transition-opacity duration-300"
          style={{ opacity: 0 }}
        >
        </span>
      </div>
    </>
  );
}
