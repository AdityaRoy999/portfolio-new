'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TooltipProps {
  content: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
  delay?: number;
}

export default function Tooltip({ 
  content, 
  children, 
  position = 'top', 
  className = '',
  delay = 0.2
}: TooltipProps) {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay * 1000);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const getPositionClasses = () => {
    switch (position) {
      case 'top':
        return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-3';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-3';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-3';
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-3';
    }
  };

  const getAnimationProps = () => {
    const initial = { opacity: 0, scale: 0.95 };
    const animate = { opacity: 1, scale: 1 };
    const exit = { opacity: 0, scale: 0.95 };

    switch (position) {
      case 'top':
        initial.y = 10;
        animate.y = 0;
        exit.y = 10;
        break;
      case 'bottom':
        initial.y = -10;
        animate.y = 0;
        exit.y = -10;
        break;
      case 'left':
        initial.x = 10;
        animate.x = 0;
        exit.x = 10;
        break;
      case 'right':
        initial.x = -10;
        animate.x = 0;
        exit.x = -10;
        break;
    }

    return { initial, animate, exit };
  };

  return (
    <div 
      className={`relative inline-flex flex-col items-center ${className}`}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
    >
      {children}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            {...getAnimationProps()}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className={`absolute z-[200] pointer-events-none whitespace-nowrap px-3 py-1.5 rounded bg-surface border border-border shadow-xl ${getPositionClasses()}`}
          >
            <span className="text-[10px] font-mono font-medium uppercase tracking-wider text-text-primary">
              {content}
            </span>
            
            {/* Arrow */}
            <div 
              className={`absolute w-2 h-2 bg-surface border-border rotate-45 ${
                position === 'top' ? 'bottom-[-4.5px] left-1/2 -translate-x-1/2 border-b border-r' :
                position === 'bottom' ? 'top-[-4.5px] left-1/2 -translate-x-1/2 border-t border-l' :
                position === 'left' ? 'right-[-4.5px] top-1/2 -translate-y-1/2 border-t border-r' :
                'left-[-4.5px] top-1/2 -translate-y-1/2 border-b border-l'
              }`}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
