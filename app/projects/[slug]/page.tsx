import type { Metadata } from 'next';
import { getMarkdownContent, getMarkdownSlugs } from '@/lib/markdown';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ProjectComponents } from '@/components/projects/ProjectComponents';
import { ProjectCaseStudy, type CaseStudy } from '@/components/projects/ProjectCaseStudy';
import { ZoomableImage } from '@/components/projects/ZoomableImage';
import { ProjectNavigation } from '@/components/common/ProjectNavigation';
import { notFound } from 'next/navigation';
import Website from '@/components/icons/social/Website';
import Github from '@/components/icons/social/Github';
import 'highlight.js/styles/github-dark.css';
import { ProjectCardData } from '@/config/projects/ProjectCardData';
import { ProjectHeaderActions } from '@/components/projects/ProjectHeaderActions';
import RepeatSeparator from '@/components/ui/repeat-separator';

interface ProjectMeta extends CaseStudy {
  title?: string;
  description?: string;
  image?: string;
  technologies?: string[];
  status?: string;
  statusLabel?: string;
  statusVariant?: 'default' | 'secondary' | 'destructive' | 'outline';
  timeline?: string;
  role?: string;
  team?: string;
  live?: string;
  liveLabel?: string;
  betaUrl?: string;
  npm?: string;
  github?: string;
  applicationCategory?: string;
  operatingSystem?: string;
}

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

// 1. Generate Metadata dynamically for SEO on the server
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getMarkdownContent('projects', slug);
  if (!project) {
    return {
      title: 'Project Not Found',
    };
  }

  const title = `${project.meta.title} | Projects`;
  const description = project.meta.description;
  const canonicalUrl = `${siteUrl}/projects/${slug}`;
  const imageUrl = project.meta.image
    ? project.meta.image.startsWith('http')
      ? project.meta.image
      : `${siteUrl}${project.meta.image.startsWith('/') ? '' : '/'}${project.meta.image}`
    : `${siteUrl}/og-image.webp`;

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: project.meta.title,
      description,
      images: [
        {
          url: imageUrl,
          alt: project.meta.title,
        },
      ],
      url: canonicalUrl,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: project.meta.title,
      description,
      images: [imageUrl],
      creator: '@sahilcodex',
    },
  };
}

// 2. Pre-generate all static slugs at build time
export async function generateStaticParams() {
  const slugs = await getMarkdownSlugs('projects');
  return slugs.map((slug) => ({
    slug,
  }));
}

// 3. Render the Project Server Component
export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = await getMarkdownContent('projects', slug);

  if (!project) {
    notFound();
  }

  const { meta, content } = project;
  const projectMeta = meta as ProjectMeta;

  // Map projects to extract their slugs from details link, sorted by id descending to match UI list order
  const allProjects = [...ProjectCardData]
    .sort((a, b) => b.id - a.id)
    .map((p) => ({
      slug: p.projectDetailsPageSlug?.split('/').pop() || p.links.details.split('/').pop() || '',
    }));
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const previousProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  const projectJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: projectMeta.title,
    description: projectMeta.description,
    applicationCategory: projectMeta.applicationCategory || 'DeveloperApplication',
    operatingSystem: projectMeta.operatingSystem || 'Web',
    image: projectMeta.image
      ? projectMeta.image.startsWith('http')
        ? projectMeta.image
        : `${siteUrl}${projectMeta.image.startsWith('/') ? '' : '/'}${projectMeta.image}`
      : `${siteUrl}/og-image.webp`,
    author: {
      '@type': 'Person',
      name: 'Sahil Singh',
      url: siteUrl,
    },
    url: projectMeta.live || `${siteUrl}/projects/${slug}`,
  };

  return (
    <div className="w-full border-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectJsonLd) }}
      />
      {/* <div className="border-border mx-auto h-12 border-x md:max-w-3xl" /> */}
      <RepeatSeparator cn="h-8 opacity-50" />
      <div data-doc-cols-ready="">
        {/* 1. Document Header Container */}
        <div data-slot="doc-container" className="mx-auto w-full">
          <div className="screen-line-bottom h-px" />

          <div className="flex items-center justify-between p-2 pl-4">
            <Link
              href="/projects"
              className="group/button text-muted-foreground hover:text-foreground inline-flex h-7 shrink-0 cursor-pointer items-center justify-center gap-2 border-none px-0 text-sm font-medium whitespace-nowrap outline-none select-none hover:no-underline"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover/button:-translate-x-1" />
              Projects
            </Link>
            <ProjectHeaderActions
              previousSlug={previousProject?.slug || null}
              nextSlug={nextProject?.slug || null}
              projectTitle={projectMeta.title || 'Check out this project'}
            />
          </div>

          <RepeatSeparator cn="h-8" />
          <div className="screen-line-top screen-line-bottom py-px">
            <div className="mx-auto h-4 w-full" />
          </div>
          <div className="screen-line-bottom py-4">
            <h1
              data-slot="doc-title"
              className="px-4 text-3xl font-semibold tracking-tight text-balance md:max-w-md"
            >
              {projectMeta.title}
            </h1>
          </div>
        </div>

        {/* 2. Document Grid with Columns */}
        <div data-slot="doc-grid" className="mx-auto w-full">
          <div data-slot="doc-content-col" className="mx-auto w-full">
            <div data-slot="prose" className="prose dark:prose-invert w-full px-4 pt-7">
              {/* Project description (subheading) */}
              <p className="text-muted-foreground mb-6 text-base leading-relaxed font-normal text-wrap sm:text-base">
                {projectMeta.description}
              </p>

              {/* Featured Image */}
              {projectMeta.image && (
                <ZoomableImage src={projectMeta.image} alt={projectMeta.title || slug} priority />
              )}

              <dl className="border-border not-prose mb-6 grid grid-cols-2 gap-x-6 gap-y-5 border-y py-5 sm:grid-cols-4">
                {[
                  { label: 'Role', value: projectMeta.role },
                  { label: 'Timeline', value: projectMeta.timeline },
                  { label: 'Team', value: projectMeta.team },
                  { label: 'Status', value: projectMeta.statusLabel || projectMeta.status },
                ]
                  .filter((item) => item.value)
                  .map((item) => (
                    <div key={item.label}>
                      <dt className="text-muted-foreground mb-1.5 text-xs">{item.label}</dt>
                      <dd className="text-foreground text-sm leading-6">{item.value}</dd>
                    </div>
                  ))}
              </dl>

              {/* Links and Action Buttons */}
              <div className="not-prose mb-8 flex flex-wrap gap-3">
                {projectMeta.live && (
                  <a
                    href={projectMeta.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inset-shadow bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Website className="size-4" />
                    {projectMeta.liveLabel || 'Live demo'}
                  </a>
                )}
                {projectMeta.github && (
                  <a
                    href={projectMeta.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inset-shadow bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50 inline-flex cursor-pointer items-center justify-center gap-2 rounded-md border px-4 py-2 text-sm font-medium whitespace-nowrap shadow-xs disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Github className="size-4" />
                    Source code
                  </a>
                )}
                {projectMeta.betaUrl && (
                  <a
                    href={projectMeta.betaUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-md border border-green-200 bg-green-50 px-4 py-2 text-sm font-medium text-green-800 transition-colors hover:bg-green-100 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-green-600 dark:border-green-800/50 dark:bg-green-950/50 dark:text-green-300 dark:hover:bg-green-900/50"
                  >
                    Beta version
                  </a>
                )}
              </div>

              {projectMeta.technologies?.length && (
                <div className="not-prose mb-8 flex flex-wrap items-baseline gap-x-4 gap-y-2">
                  <h2 className="text-muted-foreground text-[13px]">
                    {projectMeta.status === 'planning' ? 'Focus' : 'Built with'}
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {projectMeta.technologies.map((tech) => (
                      <li
                        key={tech}
                        className="border-border text-muted-foreground rounded-sm border px-2 py-1 font-mono text-[12px]"
                      >
                        {tech}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <ProjectCaseStudy
                isUpcoming={projectMeta.status === 'planning'}
                problem={projectMeta.problem}
                contribution={projectMeta.contribution}
                decisions={projectMeta.decisions}
                outcome={projectMeta.outcome}
                evidence={projectMeta.evidence}
              />

              {/* Markdown Body Content */}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight]}
                components={ProjectComponents as any}
              >
                {content}
              </ReactMarkdown>

              <div className="not-prose mt-8 mb-4">
                <ProjectNavigation slug={slug} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
