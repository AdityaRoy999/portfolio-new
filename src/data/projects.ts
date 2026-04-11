export interface TechCategory {
  category: string;
  items: string[];
}

export interface ProjectLink {
  label: string;
  url: string;
}

export interface Project {
  slug: string;
  title: string;
  description: string;
  longDescription: string;
  category: string;
  year: string;
  role: string;
  tech: TechCategory[];
  links?: ProjectLink[];
  color: string;
  image: string;
  featured: boolean;
}

export const projects: Project[] = [
  {
    slug: 'twilight-garden',
    title: 'Twilight Garden',
    description: 'Your Personal Menstrual Health Companion.',
    longDescription: 'Twilight Garden is a beautifully designed, privacy-focused menstrual health application that helps you track your cycle, understand your symptoms, and gain personalized insights into your body\'s rhythm. Features end-to-end encrypted messaging, real-time multiplayer games, and professional PDF medical reports.',
    category: 'Health & Wellness',
    year: '2024',
    role: 'Full-Stack Developer',
    tech: [
      { category: 'Frontend', items: ['React', 'TypeScript', 'Vite'] },
      { category: 'Backend & Data', items: ['Supabase'] },
      { category: 'Styling & Motion', items: ['Tailwind CSS', 'Framer Motion', 'Recharts'] },
      { category: 'Key Features', items: ['WebRTC', 'Encrypted Messaging'] }
    ],
    links: [
      { label: 'View Live', url: 'https://twilight-garden.vercel.app/' },
      { label: 'Web Version', url: 'https://twilight-garden.vercel.app/' },
      { label: 'Android App', url: 'https://play.google.com/store/apps/details?id=com.twilightgarden' },
      { label: 'Windows PC', url: 'https://github.com/AdityaRoy999/Twilight-Garden/releases' }
    ],
    color: '#F472B6',
    image: '/projects/twilight.png',
    featured: true,
  },
  {
    slug: 'aeterna',
    title: 'AETERNA',
    description: 'A meticulously crafted luxury e-commerce website with seamless transitions.',
    longDescription: 'AETERNA offers a rich set of features for both customers and administrators. Browse exquisite collections, enjoy dynamic product catalogs, AI chatbots, and a comprehensive admin dashboard with real-time notifications and payment integration via Stripe.',
    category: 'E-commerce',
    year: '2024',
    role: 'Full-Stack Developer',
    tech: [
      { category: 'Frontend', items: ['React.js', 'TypeScript', 'Vite'] },
      { category: 'Backend', items: ['Supabase'] },
      { category: 'Integrations', items: ['Stripe', 'EmailJS'] },
      { category: 'Animations', items: ['Framer Motion', 'AOS'] }
    ],
    links: [
      { label: 'Live Site', url: 'https://aeterna-lyart.vercel.app/' }
    ],
    color: '#A855F7',
    image: '/projects/Aeterna.png',
    featured: true,
  },
  {
    slug: 'tudu',
    title: 'TuDu',
    description: 'Full productivity platform centered on task execution, planning, and organization.',
    longDescription: 'TuDu is a premium productivity OS blending personal productivity (tasks, habits, focus mode), team collaboration (whiteboards, workspaces), and AI chat integration. It wraps a rich web app into mobile through Expo, leveraging highly secured scalable Edge Functions.',
    category: 'Productivity SaaS',
    year: '2024',
    role: 'Full-Stack Developer',
    tech: [
      { category: 'Web Frontend', items: ['React 19', 'Vite'] },
      { category: 'Mobile Interface', items: ['React Native'] },
      { category: 'Backend Logic', items: ['Supabase Edge'] },
      { category: 'Interactive', items: ['Framer Motion'] }
    ],
    links: [
      { label: 'Live Platform', url: 'https://tudu-beta-wine.vercel.app/' }
    ],
    color: '#22D3EE',
    image: '/projects/TuDu.png',
    featured: true,
  },
  {
    slug: 'personal-portfolio',
    title: 'Aditya Portfolio',
    description: 'Animated, high-performance developer portfolio with Awwwards-style transitions.',
    longDescription: 'A premium, minimalist portfolio focusing on fluid, app-like interactions, a custom neon-accented cursor, and GSAP-powered cinematic page transitions. Built with Next.js App Router for seamless instantaneous navigation.',
    category: 'Web App',
    year: '2025',
    role: 'Frontend Engineer',
    tech: [
      { category: 'Frontend Framework', items: ['Next.js', 'TypeScript'] },
      { category: 'Styling', items: ['Tailwind CSS'] },
      { category: 'Animations', items: ['GSAP'] }
    ],
    links: [
      { label: 'Live Site', url: 'https://personal-portfolio-drab-rho-55.vercel.app/' },
      { label: 'Source Code', url: 'https://github.com/AdityaRoy999/Personal-portfolio' }
    ],
    color: '#E8FF47',
    image: '/projects/personal portfolio.png',
    featured: true,
  },
];
