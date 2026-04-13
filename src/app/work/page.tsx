import { projects } from '@/data/projects';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { Link } from 'next-view-transitions';
import SplitText from '@/components/ui/SplitText';

export const metadata = {
  title: 'All Work | Aditya Roy',
  description: 'Archive of all featured and side projects by Aditya Roy.',
};

export default function WorkArchive() {
  return (
    <main id="main-content" className="pt-32 min-h-screen flex flex-col">
      <div className="container-main flex-1">
        {/* Back Link */}
        <Link
          href="/#work"
          className="inline-flex items-center gap-2 text-sm font-mono uppercase tracking-[0.15em] text-text-secondary hover:text-accent transition-colors duration-300 mb-12"
          data-cursor="link"
        >
          <ArrowLeft size={14} />
          Back to Home
        </Link>

        {/* Header */}
        <div className="mb-16">
          <p className="text-label mb-4">Archive</p>
          <SplitText className="text-h1 font-display text-text-primary" type="words">
            All Projects
          </SplitText>
        </div>

        {/* Archive List */}
        <div className="mb-32">
          {projects.map((project, i) => (
            <Link
              key={project.slug}
              href={`/work/${project.slug}`}
              className="group block border-t border-border last:border-b py-8 md:py-10 no-underline"
              data-cursor="pill"
              data-cursor-label={`0${i + 1}`}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Number */}
                <span className="hidden md:inline-block text-mono text-sm text-text-muted w-8 shrink-0">
                  0{i + 1}
                </span>

                {/* Title */}
                <div className="flex-1">
                  <h3 className="text-2xl md:text-3xl font-display text-text-primary group-hover:text-accent transition-colors duration-300">
                    {project.title}
                  </h3>
                  <p className="md:hidden text-sm text-text-muted mt-2">
                    {project.category}
                  </p>
                </div>

                {/* Tech Stack */}
                <div className="hidden lg:flex flex-wrap gap-2 flex-1 justify-end">
                  {project.tech.flatMap(cat => cat.items).map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono text-text-secondary border border-border px-2 py-1 rounded-full group-hover:border-text-secondary transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {/* Year */}
                <span className="hidden md:inline-block text-mono text-sm text-text-muted w-16 text-right">
                  {project.year}
                </span>

                {/* Arrow */}
                <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center group-hover:border-accent group-hover:bg-accent/10 transition-all duration-300 shrink-0">
                  <ArrowUpRight
                    size={16}
                    className="text-text-secondary group-hover:text-accent transition-all duration-300 group-hover:rotate-45"
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {/* Footer is provided globally by ClientProviders (src/app/providers.tsx) */}
    </main>
  );
}
