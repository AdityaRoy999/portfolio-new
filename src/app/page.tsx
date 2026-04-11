import Hero from '@/components/sections/Hero';
import Marquee from '@/components/sections/Marquee';
import About from '@/components/sections/About';
import Work from '@/components/sections/Work';
import Skills from '@/components/sections/Skills';
import Experience from '@/components/sections/Experience';
import Contact from '@/components/sections/Contact';

export default function Home() {
  return (
    <main id="main-content">
      <Hero />
      <Marquee />
      <About />
      <Marquee />
      <Work />
      <Marquee />
      <Skills />
      <Marquee />
      <Experience />
      <Marquee />
      <Contact />
    </main>
  );
}
