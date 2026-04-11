import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import type { Metadata } from 'next';
import ProjectContent from './ProjectContent';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};

  return {
    title: `${project.title} — Aditya Roy`,
    description: project.description,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  const projectIndex = projects.findIndex((p) => p.slug === slug);

  if (!project) notFound();

  const nextProject = projects[(projectIndex + 1) % projects.length];

  return <ProjectContent project={project} nextProject={nextProject} />;
}
