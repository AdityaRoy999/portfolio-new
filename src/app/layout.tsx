import type { Metadata } from 'next';
import { Cormorant_Garamond, Syne, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import ClientProviders from './providers';
import { ViewTransitions } from 'next-view-transitions';

const cormorant = Cormorant_Garamond({
  variable: '--font-display',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
});

const syne = Syne({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aditya Roy — Full Stack Web Developer & Cybersecurity Enthusiast',
  description: 'Full Stack Web Developer and Cybersecurity Enthusiast building secure, scalable web applications.',
  url: 'https://adityaroy.dev',
  keywords: [
    'full stack web developer',
    'cybersecurity',
    'Python',
    'Node.js',
    'portfolio',
    'web development',
    'penetration testing',
    'React',
    'Next.js',
  ],
  openGraph: {
    title: 'Aditya Roy — Full Stack Web Developer & Cybersecurity Enthusiast',
    description: 'Building secure, scalable digital experiences.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${cormorant.variable} ${syne.variable} ${jetbrainsMono.variable}`}
      >
        <body>
          <a href="#main-content" className="skip-to-content">
            Skip to content
          </a>
          <ClientProviders>{children}</ClientProviders>
        </body>
      </html>
    </ViewTransitions>
  );
}
