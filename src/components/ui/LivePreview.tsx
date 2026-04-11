'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ExternalLink, RefreshCw, Maximize2, X, Play } from 'lucide-react';
import { gsap } from '@/lib/gsap';

interface LivePreviewProps {
  url: string;
  poster: string;
  title: string;
}

export default function LivePreview({ url, poster, title }: LivePreviewProps) {
  const [isActive, setIsActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    return () => document.removeEventListener('fullscreenchange', handleFullscreenChange);
  }, []);

  const handleLaunch = () => {
    setIsActive(true);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;

    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable full-screen mode: ${err.message}`);
      });
    } else {
      document.exitFullscreen();
    }
  };

  const handleRefresh = () => {
    if (iframeRef.current) {
      setIsLoading(true);
      iframeRef.current.src = url;
    }
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className="content-block w-full mb-16">
      {/* Browser Frame */}
      <div 
        ref={containerRef}
        className={`relative overflow-hidden border border-border bg-surface shadow-2xl transition-all duration-500 ${
          isFullscreen ? 'w-screen h-screen rounded-none' : 'rounded-xl'
        }`}
      >
        {/* Browser Top Bar */}
        <div className="bg-surface-lighter border-b border-border px-4 py-3 flex items-center justify-between z-10">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          
          <div className="hidden sm:flex items-center px-4 py-1 bg-bg border border-border rounded-md text-[10px] font-mono text-text-muted truncate max-w-md w-full justify-center gap-2">
            <span className="opacity-50">https://</span>
            <span className="truncate">{url.replace(/^https?:\/\//, '')}</span>
          </div>

          <div className="flex items-center gap-3">
            {isActive && (
              <>
                <button 
                  onClick={handleRefresh}
                  className="p-1 hover:text-accent transition-colors duration-300"
                  aria-label="Refresh"
                >
                  <RefreshCw size={14} className={isLoading ? 'animate-spin' : ''} />
                </button>
                <button 
                  onClick={toggleFullscreen}
                  className="p-1 hover:text-accent transition-colors duration-300"
                  aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                >
                  <Maximize2 size={14} className={isFullscreen ? 'rotate-180' : ''} />
                </button>
              </>
            )}
            <a 
              href={url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-1 hover:text-accent transition-colors duration-300 flex items-center gap-1 text-[10px] font-mono uppercase tracking-wider"
              aria-label="Open in new tab"
            >
              <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Content Area */}
        <div className={`relative w-full bg-[#000000] ${isFullscreen ? 'h-[calc(100%-48px)]' : 'aspect-video'}`}>
          <AnimatePresence mode="wait">
            {!isActive ? (
              <motion.div 
                key="poster"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 z-20 group cursor-pointer"
                onClick={handleLaunch}
              >
                <img 
                  src={poster} 
                  alt={title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center mb-4 transition-transform duration-500 group-hover:scale-110">
                    <Play className="text-white fill-white ml-1" size={32} />
                  </div>
                  <span className="text-white font-mono text-sm uppercase tracking-[0.2em] font-medium">
                    Launch Live Preview
                  </span>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="iframe-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full h-full relative"
              >
                {isLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-bg/80 backdrop-blur-sm z-30">
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-12 h-12 border-2 border-accent border-t-transparent rounded-full animate-spin" />
                      <p className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                        Connecting to server...
                      </p>
                    </div>
                  </div>
                )}
                <iframe
                  ref={iframeRef}
                  src={url}
                  className="w-full h-full border-none"
                  onLoad={handleLoad}
                  title={`Live Preview of ${title}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      <p className="mt-4 text-center text-xs font-mono text-text-muted flex items-center justify-center gap-4">
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-accent" />
          Interactive Preview
        </span>
        <span className="opacity-30">|</span>
        <span className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-text-muted" />
          {isFullscreen ? 'Full Screen Mode' : isActive ? 'Optimized for Desktop' : 'Click to launch'}
        </span>
      </p>
    </div>
  );
}
