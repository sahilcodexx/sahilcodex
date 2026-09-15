'use client';

import React, { useMemo, useState } from 'react';
import Container from "@/components/layouts/Container";
import SectionHeading from "@/components/common/SectionHeading";
import RepeatSeparator from "@/components/ui/repeat-separator";
import ComponentCard from "@/components/components/ComponentCard";
import { SearchInput } from "@/components/common/SearchInput";
import Spotify from "@/components/landing/Spotify";
import CustomKeyboard from '@/components/ui/custom-keyboard';
import LoaderAnimation from '@/components/ui/loader-animation';
import MacDock from '@/components/ui/mac-dock';
import AiImageCard from '@/components/ui/ai-image-card';
import SearchBar from '@/components/ui/search-bar';
import Link from 'next/link';

type ComponentItem = {
  id: string;
  title: string;
  description: string;
  href: string;
  badge: string;
  preview: React.ReactNode;
};

const COMPONENTS: ComponentItem[] = [
  {
    id: 'mac-keyboard',
    title: 'Mac Keyboard',
    description:
      'Interactive Mac keyboard replica with real-time keystroke tracking, sound feedback, and Space Black / Silver themes.',
    href: '/components/mac-keyboard',
    badge: 'Interactive · Sound',
    preview: (
      <div className="transform scale-[0.4] xs:scale-[0.5] sm:scale-[0.6] origin-center my-2">
        <CustomKeyboard theme="dark" enableSound={false} showPreview={true} />
      </div>
    ),
  },
  {
    id: 'ai-image-card',
    title: 'Image Generation Card',
    description:
      'Recreates the AI image-generation state used in ChatGPT, DALL·E, and Midjourney — blinking grid, blur-to-focus reveal, shine sweep, and a live generation timer.',
    href: '/components/ai-image-card',
    badge: 'UI · Animation',
    preview: (
      <div
        className="my-2 aspect-square"
        style={{ width: 'clamp(150px, 22vw, 220px)' }}
      >
        <AiImageCard generateDuration={3} />
      </div>
    ),
  },
  {
    id: 'loader-animation',
    title: 'Page Loader',
    description:
      'Smooth multilingual greeting text loader built with Motion. Features smooth text transitions.',
    href: '/components/loader-animation',
    badge: 'Animation · UI',
    preview: (
      <div className="my-6">
        <LoaderAnimation />
      </div>
    ),
  },
  {
    id: 'search-bar',
    title: 'Search Bar',
    description:
      'Command-palette style searchable dropdown with keyboard navigation (↑/↓/Enter/Esc), live match highlighting, animated active pill, and click-outside dismissal.',
    href: '/components/search-bar',
    badge: 'Interactive · UI',
    preview: (
      <div className="my-4 w-full max-w-[320px]">
        <SearchBar />
      </div>
    ),
  },
  {
    id: 'mac-dock',
    title: 'Mac Dock',
    description:
      'Interactive macOS style Dock component with spring icon scaling and hardware-accelerated live window preview popups on hover.',
    href: '/components/mac-dock',
    badge: 'Interactive · UI',
    preview: (
      <div className="my-6 transform scale-[0.65] xs:scale-[0.75] sm:scale-[0.85] origin-center">
        <MacDock />
      </div>
    ),
  },
  {
    id: 'spotify',
    title: 'Music Player',
    description:
      'Interactive live music player widget with real-time audio spectrum animations, vinyl CD disc spin, and song metadata.',
    href: '/components/spotify',
    badge: 'Widget · Audio',
    preview: <Spotify />,
  },
];

export default function ComponentsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredComponents = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return COMPONENTS;
    return COMPONENTS.filter(
      (c) =>
        c.title.toLowerCase().includes(query) ||
        c.description.toLowerCase().includes(query) ||
        c.badge.toLowerCase().includes(query),
    );
  }, [searchQuery]);

  // Split filtered components into 3 rows of 2 to match the original grid layout
  const rows: ComponentItem[][] = useMemo(() => {
    const result: ComponentItem[][] = [];
    for (let i = 0; i < filteredComponents.length; i += 2) {
      result.push(filteredComponents.slice(i, i + 2));
    }
    return result;
  }, [filteredComponents]);

  return (
    <Container>
      <RepeatSeparator cn="dark:opacity-40" />

      {/* Page Header */}
      <div>
        <div>
          <SectionHeading
            classname="text-neutral-400 dark:text-neutral-500 font-medium"
            heading="Components"
          />
          <h1 className="screen-line-bottom px-4 text-3xl font-semibold tracking-tight text-balance">
            Showcase of Components
          </h1>
        </div>
        <div className="screen-line-top screen-line-bottom flex items-center justify-between p-2">
          <Link
            data-slot="button"
            data-variant="link"
            data-size="sm"
            className="group/button focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 text-muted-foreground hover:text-foreground inline-flex h-7 shrink-0 items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border border-none border-transparent bg-clip-padding px-0 text-sm font-medium whitespace-nowrap decoration-1 underline-offset-3 outline-none select-none hover:no-underline focus-visible:ring-3 active:scale-none disabled:pointer-events-none disabled:opacity-50 in-data-[slot=button-group]:rounded-lg has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 aria-invalid:ring-3 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
            href="/"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-arrow-left"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Back
          </Link>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder="Search Components…"
          />
        </div>
      </div>

      <RepeatSeparator cn="dark:opacity-40" />

      {/* Component Grid matching Blog page layout & vertical borders */}
      <div className="relative py-4">
        {/* Vertical separating lines */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-border border-r"></div>
          <div className="border-border border-l"></div>
        </div>

        {filteredComponents.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <p className="text-muted-foreground text-sm">
              No components match "{searchQuery}".
            </p>
          </div>
        ) : (
          rows.map((row, rowIdx) => (
            <React.Fragment key={rowIdx}>
              <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {row.map((component) => (
                  <li key={component.id}>
                    <ComponentCard
                      title={component.title}
                      description={component.description}
                      href={component.href}
                      badge={component.badge}
                    >
                      {component.preview}
                    </ComponentCard>
                  </li>
                ))}
              </ul>
              {rowIdx < rows.length - 1 && (
                <div className="before:bg-border after:bg-border relative my-4 h-4 w-full before:absolute before:top-0 before:left-0 before:h-px before:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:w-full" />
              )}
            </React.Fragment>
          ))
        )}
      </div>
    </Container>
  );
}