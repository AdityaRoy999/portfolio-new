'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';

export type CursorVariant = 'default' | 'link' | 'image' | 'text' | 'click' | 'hidden';

interface CursorState {
  variant: CursorVariant;
  label: string;
}

interface CursorContextType {
  cursorState: CursorState;
  setCursorVariant: (variant: CursorVariant, label?: string) => void;
  resetCursor: () => void;
}

const CursorContext = createContext<CursorContextType>({
  cursorState: { variant: 'default', label: '' },
  setCursorVariant: () => {},
  resetCursor: () => {},
});

export function CursorProvider({ children }: { children: React.ReactNode }) {
  const [cursorState, setCursorState] = useState<CursorState>({
    variant: 'default',
    label: '',
  });

  const setCursorVariant = useCallback((variant: CursorVariant, label = '') => {
    setCursorState({ variant, label });
  }, []);

  const resetCursor = useCallback(() => {
    setCursorState({ variant: 'default', label: '' });
  }, []);

  return (
    <CursorContext.Provider value={{ cursorState, setCursorVariant, resetCursor }}>
      {children}
    </CursorContext.Provider>
  );
}

export function useCursorContext() {
  const context = useContext(CursorContext);
  if (!context) {
    throw new Error('useCursorContext must be used within a CursorProvider');
  }
  return context;
}
