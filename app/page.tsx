import Hero from '@/components/layouts/Hero';
import ExperienceCard from '@/components/experience/ExperienceCard';
import Project from '@/components/projects/Project';
import ComponentsSection from '@/components/landing/ComponentsSection';
import AboutMe from '@/components/landing/TechSkills';
import Featured from '@/components/landing/Featured';
import Blog from '@/components/blog/Blog';
import CTA from '@/components/landing/CTA';
import Setup from '@/components/landing/Setup';
import { getMarkdownSlugs, getMarkdownContent } from '@/lib/markdown';
import { fetchRepoStars, fetchGitHubContributions } from '@/api/github';
import TopBanner from '@/components/ui/top-banner';
import { formatDate } from '@/lib/utils';

const sectionIds = {
  experience: 'experience',
  projects: 'featured-projects',
  components: 'components',
  skills: 'skills',
  featured: 'featured',
  blog: 'latest-blogs',
  cta: 'contact',
  setup: 'gear',
};

export default async function Home() {
  // 1. Fetch GitHub stats on the server
  const stars = await fetchRepoStars();
  const contributions = await fetchGitHubContributions();

  // 2. Load Blogs dynamically on the server
  const blogSlugs = await getMarkdownSlugs('blog');
  const blogs = await Promise.all(
    blogSlugs.map(async (slug) => {
      const content = await getMarkdownContent('blog', slug);
      return {
        slug,
        title: content?.meta.title || slug,
        description: content?.meta.description || '',
        image: content?.meta.image || '',
        tags: content?.meta.tags || [],
        date: content?.meta.date || '',
        formattedDate:
          content?.meta.formattedDate || (content?.meta.date ? formatDate(content.meta.date) : ''),
      };
    })
  );
  blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 3. Load Projects dynamically on the server
  const { ProjectCardData } = await import('@/config/projects/ProjectCardData');
  const projectSlugs = await getMarkdownSlugs('projects');
  const projects = await Promise.all(
    projectSlugs.map(async (slug) => {
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
        isBuilding:
          content?.meta.status?.toLowerCase() === 'in-progress' ||
          content?.meta.status?.toLowerCase() === 'building',
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
    <main className="min-h-screen">
      <TopBanner />

      <Hero stars={stars} />

      <section id={sectionIds.experience}>
        <ExperienceCard />
      </section>

      <section id={sectionIds.projects}>
        <Project projects={projects} />
      </section>

      <section id={sectionIds.components}>
        <ComponentsSection />
      </section>

      <section id={sectionIds.skills}>
        <AboutMe />
      </section>

      <section id={sectionIds.featured}>
        <Featured contributions={contributions} />
      </section>

      <section id={sectionIds.blog}>
        <Blog blogs={blogs} limit={4} />
      </section>

      <section id={sectionIds.cta}>
        <CTA />
      </section>

      <section id={sectionIds.setup}>
        <Setup />
      </section>
    </main>
  );
}
