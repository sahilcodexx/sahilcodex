import type { Metadata } from 'next';
import { Geist, Pixelify_Sans } from 'next/font/google';
import Script from 'next/script';
import '@/index.css';
import { ThemeProvider } from '@/components/landing/theme-provider';
import Container from '@/components/layouts/Container';
import Layout from '@/components/common/Layout';
import { Quote } from '@/components/common/Quote';
import Footer from '@/components/common/Footer';
import PageTracker from '@/components/common/PageTracker';
import ScrollToTop from '@/components/common/ScrollToTop';
import { Analytics } from '@vercel/analytics/react';

const geistSans = Geist({
  variable: '--font-sans',
  subsets: ['latin'],
});

const pixelifySans = Pixelify_Sans({
  variable: '--font-pixelify',
  subsets: ['latin'],
  display: 'swap',
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

const jsonLdSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${siteUrl}/#person`,
      name: 'Sahil Singh',
      jobTitle: 'Frontend Developer & Design Engineer',
      url: siteUrl,
      sameAs: [
        'https://github.com/sahilcodexx',
        'https://twitter.com/sahilcodex',
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Frontend Development',
        'Design Engineering',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${siteUrl}/#website`,
      url: siteUrl,
      name: 'Sahil Singh Portfolio',
      description: 'Personal portfolio, technical blogs, projects, and work experience of Sahil Singh.',
      publisher: {
        '@id': `${siteUrl}/#person`,
      },
    },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'Sahil Singh | Frontend Developer & Design Engineer',
    template: '%s | Sahil Singh',
  },
  description:
    'Portfolio of Sahil Singh — Frontend Developer & Design Engineer specializing in React, Next.js, TypeScript, performance, and modern web development.',
  keywords: [
    'Sahil Singh',
    'Sahil',
    'Frontend Developer',
    'Design Engineer',
    'React Developer',
    'Next.js Developer',
    'Full Stack Engineer',
    'JavaScript',
    'TypeScript',
    'Web Developer Portfolio',
  ],
  authors: [{ name: 'Sahil Singh', url: 'https://github.com/sahilcodexx' }],
  creator: 'Sahil Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    title: 'Sahil Singh | Frontend Developer & Design Engineer',
    description:
      'Portfolio of Sahil Singh — Frontend Developer & Design Engineer specializing in React, Next.js, TypeScript, performance, and modern web development.',
    siteName: 'Sahil Singh Portfolio',
    images: [
      {
        url: `${siteUrl}/og-image.webp`,
        width: 1200,
        height: 630,
        alt: 'Sahil Singh | Frontend Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sahil Singh | Frontend Developer & Design Engineer',
    description:
      'Portfolio of Sahil Singh — Frontend Developer & Design Engineer specializing in React, Next.js, TypeScript, performance, and modern web development.',
    images: [`${siteUrl}/og-image.webp`],
    creator: '@sahilcodex',
  },

  manifest: '/site.webmanifest',
  verification: {
    google: 'CtQ08DFx38_fGE2AYkzRwuG9w42ekquSIKklDT8S0Uo',
  },
  alternates: {
    canonical: siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={`${geistSans.variable} ${pixelifySans.variable} min-h-screen font-sans antialiased`}
      >
        <Script
          id="theme-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var key = "vite-ui-theme";
                  var theme = localStorage.getItem(key);
                  if (theme === "dark" || (!theme && "dark" === "dark")) {
                    document.documentElement.classList.add("dark");
                  } else if (theme === "light") {
                    document.documentElement.classList.add("light");
                  } else if (theme === "system") {
                    var dark = window.matchMedia("(prefers-color-scheme: dark)").matches;
                    document.documentElement.classList.add(dark ? "dark" : "light");
                  }
                } catch (e) {}
              })()
            `,
          }}
        />
        <Script
          id="json-ld"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdSchema) }}
        />
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <PageTracker />
          <ScrollToTop />
          <Analytics />
          <div className="min-h-screen dark:bg-black/50">
          <Container>
              <Layout>
                {children}
                <Quote />
                <Footer />
              </Layout>
            </Container>
            <div className="from-background pointer-events-none fixed inset-x-0 bottom-0 z-40 h-10 bg-linear-to-t to-transparent [mask-image:linear-gradient(to_top,black_10%,transparent)] opacity-100 backdrop-blur-[5px] select-none dark:[mask-image:linear-gradient(to_top,black_20%,transparent)]" />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
