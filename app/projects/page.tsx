import type { Metadata } from 'next';
import Projects from '@/components/projects/ProjectList';
import { getMarkdownSlugs, getMarkdownContent } from '@/lib/markdown';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

export const metadata: Metadata = {
  title: 'Projects — Frontend Apps & Open Source Engineering',
  description:
    'Explore web applications, React & Next.js projects, open source tools, and interactive designs built by Sahil Singh.',
  alternates: {
    canonical: `${siteUrl}/projects`,
  },
  openGraph: {
    title: 'Projects — Frontend Apps & Open Source Engineering',
    description:
      'Explore web applications, React & Next.js projects, open source tools, and interactive designs built by Sahil Singh.',
    url: `${siteUrl}/projects`,
    type: 'website',
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'Sahil Singh | Web Development Projects',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Projects — Frontend Apps & Open Source Engineering',
    description:
      'Explore web applications, React & Next.js projects, open source tools, and interactive designs built by Sahil Singh.',
    images: [`${siteUrl}/og-image.webp`],
    creator: '@sahilcodex',
  },
};

export default async function ProjectsPage() {
  const { ProjectCardData } = await import('@/config/projects/ProjectCardData');
  const slugs = await getMarkdownSlugs('projects');
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const content = await getMarkdownContent('projects', slug);
      const staticData = ProjectCardData.find(
        (p) => p.projectDetailsPageSlug?.endsWith(slug) || p.links?.details?.endsWith(slug)
      );

      return {
        id: slug,
        title: staticData?.title || content?.meta.title || slug,
        subheading: staticData?.subheading || null,
        statusLabel: content?.meta.status === 'planning' ? 'Upcoming' : undefined,
        description: content?.meta.description || '',
        img: {
          src: content?.meta.image || '',
          alt: content?.meta.title || slug,
        },
        links: {
          website: content?.meta.live || '',
          github: content?.meta.github || '',
          details: `/projects/${slug}`,
        },
        technologies: (content?.meta.technologies || []).map((name: string) => ({ name })),
        isWorking: content?.meta.isLive ?? content?.meta.status?.toLowerCase() === 'completed',
        isBuilding: content?.meta.status?.toLowerCase() === 'in-progress',
        details: true,
      };
    })
  );

  // Sort projects ascendingly by their ID in ProjectCardData so that reverse() in ProjectCard renders newest first
  projects.sort((a, b) => {
    const aData = ProjectCardData.find(
      (p) => p.projectDetailsPageSlug?.endsWith(a.id) || p.links?.details?.endsWith(a.id)
    );
    const bData = ProjectCardData.find(
      (p) => p.projectDetailsPageSlug?.endsWith(b.id) || p.links?.details?.endsWith(b.id)
    );
    return (aData?.id ?? 0) - (bData?.id ?? 0);
  });

  return (
    <>
      <Projects projects={projects} />
    </>
  );
}
