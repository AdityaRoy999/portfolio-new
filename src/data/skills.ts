export interface Skill {
  name: string;
  category: string;
  proficiency: number; // 0-100
}

export const skills: Skill[] = [
  { name: 'React / Next.js', category: 'Frontend', proficiency: 85 },
  { name: 'TypeScript', category: 'Frontend', proficiency: 80 },
  { name: 'JavaScript', category: 'Frontend', proficiency: 90 },
  { name: 'Python', category: 'Backend', proficiency: 90 },
  { name: 'Node.js', category: 'Backend', proficiency: 85 },
  { name: 'MySQL', category: 'Backend', proficiency: 80 },
  { name: 'Git', category: 'DevTools', proficiency: 88 },
  { name: 'Docker', category: 'DevTools', proficiency: 75 },
  { name: 'Google Cloud', category: 'DevTools', proficiency: 70 },
  { name: 'Vercel', category: 'DevTools', proficiency: 85 },
  { name: 'TensorFlow', category: 'AI/ML', proficiency: 70 },
  { name: 'PyTorch', category: 'AI/ML', proficiency: 65 },
];

export interface Service {
  title: string;
  description: string;
  items: string[];
  icon: string;
}

export const services: Service[] = [
  {
    title: 'Backend Development',
    description: 'Server-side apps and APIs that are fast, reliable, and easy to maintain.',
    items: ['Node.js / Express', 'Python / Django', 'REST APIs', 'Database Design'],
    icon: '⚙',
  },
  {
    title: 'Cybersecurity',
    description: 'Finding vulnerabilities before attackers do. Pen testing, network security, and auditing.',
    items: ['Penetration Testing', 'Network Security', 'Vulnerability Assessment', 'SOC Analysis'],
    icon: '🛡',
  },
  {
    title: 'Frontend Development',
    description: 'Clean, responsive web apps that look good and work across all devices.',
    items: ['React / Next.js', 'TypeScript', 'Tailwind CSS', 'Three.js'],
    icon: '◈',
  },
  {
    title: 'DevOps & Cloud',
    description: 'Deploying and running apps in the cloud with automated pipelines.',
    items: ['Docker', 'Google Cloud', 'Vercel', 'CI/CD Pipelines'],
    icon: '☁',
  },
];
