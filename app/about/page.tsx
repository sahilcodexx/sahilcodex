import type { Metadata } from 'next';
import Script from 'next/script';
import Container from '@/components/layouts/Container';
import SectionHeading from '@/components/common/SectionHeading';

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

// seo.md §2 + §12: /about must define the person + brand for both classic search and AI engines.
export const metadata: Metadata = {
  title: 'About SahilCodex — Sahil Singh, Frontend Developer & Design Engineer',
  description:
    'About SahilCodex — the developer portfolio and online identity of Sahil Singh, a frontend developer and design engineer from Gujarat, India who builds web applications, AI-powered tools, and open-source projects.',
  keywords: [
    'About SahilCodex',
    'About Sahil Singh',
    'Frontend Developer Gujarat',
    'Design Engineer India',
  ],
  alternates: {
    canonical: `${siteUrl}/about`,
  },
  openGraph: {
    title: 'About SahilCodex — Sahil Singh',
    description:
      'About SahilCodex — the developer portfolio and online identity of Sahil Singh, a frontend developer and design engineer building web applications, AI tools, and open-source projects.',
    url: `${siteUrl}/about`,
    type: 'profile',
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'About SahilCodex — Sahil Singh',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About SahilCodex — Sahil Singh',
    description:
      'About SahilCodex — Sahil Singh is a frontend developer and design engineer building web apps, AI tools, and open-source projects.',
    images: [`${siteUrl}/og-image.webp`],
    creator: '@sahilcodex',
  },
};

// seo.md §5: dedicated Person schema on /about reinforces the same entity defined in the root layout.
const aboutJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'AboutPage',
  url: `${siteUrl}/about`,
  name: 'About SahilCodex — Sahil Singh',
  description:
    'About SahilCodex — the developer portfolio of Sahil Singh, a frontend developer and design engineer from Gujarat, India.',
  mainEntity: {
    '@type': 'Person',
    '@id': `${siteUrl}/#person`,
    name: 'Sahil Singh',
    alternateName: ['SahilCodex', 'Sahil Codex'],
    jobTitle: 'Frontend Developer & Design Engineer',
    url: siteUrl,
    sameAs: [
      'https://github.com/sahilcodexx',
      'https://twitter.com/sahilcodex',
      'https://x.com/sahilcodex',
      'https://www.linkedin.com/in/sahil-singh-tech/',
    ],
  },
};

export default function AboutPage() {
  return (
    <Container className="py-16">
      <Script
        id="about-json-ld"
        type="application/ld+json"
        strategy="beforeInteractive"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutJsonLd) }}
      />

      <div className="mx-auto max-w-3xl space-y-10">
        {/* H1: explicit name + brand + role anchor for both classic search and AI extraction (seo.md §1) */}
        <header className="space-y-4">
          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            About SahilCodex — Sahil Singh
          </h1>
          <p className="text-muted-foreground text-lg">
            SahilCodex is the developer portfolio and online identity of{' '}
            <strong>Sahil Singh</strong>, a frontend developer and design engineer from Gujarat,
            India. He builds web applications, AI-powered tools, and open-source projects.
          </p>
        </header>

        <section className="space-y-4">
          <SectionHeading heading="Who I Am" />
          <p className="text-base leading-relaxed">
            I&apos;m <strong>Sahil Singh</strong>, a frontend developer and design engineer known
            online as <strong>SahilCodex</strong>. I design and build modern, performant web
            interfaces with React, Next.js, TypeScript, Motion, and GSAP, and I work across the
            stack with Node.js, Bun, PostgreSQL, and MongoDB.
          </p>
          <p className="text-base leading-relaxed">
            SahilCodex is the home for my portfolio, projects, technical writing, and work
            experience — a single identity that links my code, my writing, and my online presence
            across GitHub, LinkedIn, and X.
          </p>
        </section>

        <section className="space-y-4">
          <SectionHeading heading="What I Build" />
          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
            <li>Web applications and SaaS products with Next.js and the React ecosystem.</li>
            <li>AI-powered tools and integrations using modern LLM APIs.</li>
            <li>Design-engineered UI components, motion systems, and interactive experiences.</li>
            <li>Open-source repositories, technical tutorials, and developer resources.</li>
          </ul>
        </section>

        <section className="space-y-4">
          <SectionHeading heading="Connect" />
          <p className="text-base leading-relaxed">
            Find SahilCodex across the web:
          </p>
          <ul className="list-disc space-y-2 pl-6 text-base leading-relaxed">
            <li>
              <a
                href="https://github.com/sahilcodexx"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                github.com/sahilcodexx
              </a>
            </li>
            <li>
              <a
                href="https://x.com/sahilcodex"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                x.com/sahilcodex
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/sahil-singh-tech/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                linkedin.com/in/sahil-singh-tech
              </a>
            </li>
            <li>
              <a
                href="mailto:sahil207003@gmail.com"
                className="underline underline-offset-2"
              >
                sahil207003@gmail.com
              </a>
            </li>
          </ul>
        </section>
      </div>
    </Container>
  );
}
