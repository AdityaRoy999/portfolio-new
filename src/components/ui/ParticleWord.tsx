'use client';

import { useEffect, useRef } from 'react';

type Particle = {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
};

interface ParticleWordProps {
  text?: string;
  className?: string;
  sampleGap?: number;
}

export default function ParticleWord({
  text = 'ADITYA',
  className = '',
  sampleGap = 5,
}: ParticleWordProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const sampleCanvas = document.createElement('canvas');
    const sampleCtx = sampleCanvas.getContext('2d');
    if (!sampleCtx) return;

    const pointer = { x: -9999, y: -9999, active: false };
    let accentColor = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent')
      .trim() || '#E8FF47';
    let particles: Particle[] = [];
    let rafId = 0;
    let viewWidth = 0;
    let viewHeight = 0;

    const resetCanvas = () => {
      viewWidth = container.clientWidth;
      viewHeight = container.clientHeight;

      if (viewWidth === 0 || viewHeight === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(viewWidth * dpr);
      canvas.height = Math.floor(viewHeight * dpr);
      canvas.style.width = `${viewWidth}px`;
      canvas.style.height = `${viewHeight}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      sampleCanvas.width = viewWidth;
      sampleCanvas.height = viewHeight;
      sampleCtx.clearRect(0, 0, viewWidth, viewHeight);

      const fontSize = Math.max(68, Math.min(viewWidth * 0.31, viewHeight * 1.32, 230));

      sampleCtx.fillStyle = '#ffffff';
      sampleCtx.textAlign = 'center';
      sampleCtx.textBaseline = 'middle';
      sampleCtx.font = `600 ${fontSize}px "Cormorant Garamond", serif`;
      sampleCtx.fillText(text, viewWidth / 2, viewHeight / 2 + fontSize * 0.01);

      const imageData = sampleCtx.getImageData(0, 0, viewWidth, viewHeight).data;
      const nextParticles: Particle[] = [];

      for (let y = 0; y < viewHeight; y += sampleGap) {
        for (let x = 0; x < viewWidth; x += sampleGap) {
          const alpha = imageData[(y * viewWidth + x) * 4 + 3];
          if (alpha < 130) continue;

          nextParticles.push({
            x,
            y,
            baseX: x,
            baseY: y,
            vx: 0,
            vy: 0,
            size: 1.35,
          });
        }
      }

      particles = nextParticles;
    };

    const draw = () => {
      ctx.clearRect(0, 0, viewWidth, viewHeight);
      ctx.fillStyle = accentColor;

      const radius = 88;

      for (let i = 0; i < particles.length; i += 1) {
        const p = particles[i];

        if (pointer.active) {
          const dx = p.x - pointer.x;
          const dy = p.y - pointer.y;
          const distance = Math.hypot(dx, dy) || 1;

          if (distance < radius) {
            const force = ((radius - distance) / radius) * 1.8;
            p.vx += (dx / distance) * force;
            p.vy += (dy / distance) * force;
          }
        }

        p.vx += (p.baseX - p.x) * 0.032;
        p.vy += (p.baseY - p.y) * 0.032;
        p.vx *= 0.86;
        p.vy *= 0.86;
        p.x += p.vx;
        p.y += p.vy;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafId = requestAnimationFrame(draw);
    };

    const updatePointer = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
    };

    const clearPointer = () => {
      pointer.active = false;
      pointer.x = -9999;
      pointer.y = -9999;
    };

    const refreshAccent = () => {
      accentColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--accent')
        .trim() || '#E8FF47';
    };

    const resizeObserver = new ResizeObserver(() => {
      resetCanvas();
    });

    resizeObserver.observe(container);
    window.addEventListener('resize', resetCanvas);
    canvas.addEventListener('pointermove', updatePointer);
    canvas.addEventListener('pointerdown', updatePointer);
    canvas.addEventListener('pointerleave', clearPointer);

    const themeObserver = new MutationObserver(() => {
      refreshAccent();
    });

    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme'],
    });

    refreshAccent();
    resetCanvas();
    draw();

    return () => {
      cancelAnimationFrame(rafId);
      resizeObserver.disconnect();
      themeObserver.disconnect();
      window.removeEventListener('resize', resetCanvas);
      canvas.removeEventListener('pointermove', updatePointer);
      canvas.removeEventListener('pointerdown', updatePointer);
      canvas.removeEventListener('pointerleave', clearPointer);
    };
  }, [sampleGap, text]);

  return (
    <div ref={containerRef} className={`relative h-full w-full ${className}`}>
      <canvas ref={canvasRef} className="h-full w-full" aria-hidden="true" />
      <span className="sr-only">{text}</span>
    </div>
  );
}
