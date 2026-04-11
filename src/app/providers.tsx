'use client';

import SmoothScrollProvider from '@/components/layout/SmoothScrollProvider';
import CustomCursor from '@/components/layout/CustomCursor';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import LoadingScreen from '@/components/layout/LoadingScreen';
import PageTransition from '@/components/layout/PageTransition';
import { CursorProvider } from '@/hooks/useCursorContext';
import { ThemeProvider } from 'next-themes';

export default function ClientProviders({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="data-theme" defaultTheme="dark" disableTransitionOnChange>
      <CursorProvider>
        <SmoothScrollProvider>
          <LoadingScreen />
          <CustomCursor />
          <PageTransition />
          <Navbar />
          {children}
          <Footer />
        </SmoothScrollProvider>
      </CursorProvider>
    </ThemeProvider>
  );
}

