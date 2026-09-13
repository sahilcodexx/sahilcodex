'use client';

import React from 'react';
import Container from "@/components/layouts/Container";
import SectionHeading from "@/components/common/SectionHeading";
import RepeatSeparator from "@/components/ui/repeat-separator";
import ComponentCard from "@/components/components/ComponentCard";
import Spotify from "@/components/landing/Spotify";
import CustomKeyboard from '@/components/ui/custom-keyboard';
import LoaderAnimation from '@/components/ui/loader-animation';
import MacDock from '@/components/ui/mac-dock';
import AiImageCard from '@/components/ui/ai-image-card';
import SearchBar from '@/components/ui/search-bar';
import Link from 'next/link';

export default function ComponentsPage() {
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
            className="group/button focus-visible:border-ring focus-visible:ring-ring/50 text-muted-foreground hover:text-foreground inline-flex h-7 shrink-0 items-center justify-center gap-2 rounded-[min(var(--radius-lg),10px)] border-none px-0 text-sm font-medium whitespace-nowrap decoration-1 underline-offset-3 transition-all outline-none select-none hover:no-underline"
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
              className="lucide lucide-arrow-left size-4"
              aria-hidden="true"
            >
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
            Home
          </Link>
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

        {/* Row 1 */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li>
            <ComponentCard
              title="Music Player"
              description="Interactive live music player widget with real-time audio spectrum animations, vinyl CD disc spin, and song metadata."
              href="/components/spotify"
              badge="Widget · Audio"
            >
              <Spotify />
            </ComponentCard>
          </li>
          <li>
            <ComponentCard
              title="Mac Keyboard"
              description="Interactive Mac keyboard replica with real-time keystroke tracking, sound feedback, and Space Black / Silver themes."
              href="/components/mac-keyboard"
              badge="Interactive · Sound"
            >
              <div className="transform scale-[0.4] xs:scale-[0.5] sm:scale-[0.6] origin-center my-2">
                <CustomKeyboard theme="dark" enableSound={false} showPreview={true} />
              </div>
            </ComponentCard>
          </li>
        </ul>

        {/* Continuous Horizontal Grid Separator between Row 1 and Row 2 */}
        <div className="before:bg-border after:bg-border relative my-4 h-4 w-full before:absolute before:top-0 before:left-0 before:h-px before:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:w-full" />

        {/* Row 2 */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li>
            <ComponentCard
              title="Page Loader"
              description="Smooth multilingual greeting text loader built with Motion. Features smooth text transitions."
              href="/components/loader-animation"
              badge="Animation · UI"
            >
              <div className="my-6">
                <LoaderAnimation />
              </div>
            </ComponentCard>
          </li>
          <li>
            <ComponentCard
              title="Image Generation Card"
              description="Recreates the AI image-generation state used in ChatGPT, DALL·E, and Midjourney — blinking grid, blur-to-focus reveal, shine sweep, and a live generation timer."
              href="/components/ai-image-card"
              badge="UI · Animation"
            >
              <div
                className="my-2 aspect-square"
                style={{ width: 'clamp(150px, 22vw, 220px)' }}
              >
                <AiImageCard generateDuration={3} />
              </div>
            </ComponentCard>
          </li>
        </ul>

        {/* Continuous Horizontal Grid Separator between Row 2 and Row 3 */}
        <div className="before:bg-border after:bg-border relative my-4 h-4 w-full before:absolute before:top-0 before:left-0 before:h-px before:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:w-full" />

        {/* Row 3 */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li>
            <ComponentCard
              title="Mac Dock"
              description="Interactive macOS style Dock component with spring icon scaling and hardware-accelerated live window preview popups on hover."
              href="/components/mac-dock"
              badge="Interactive · UI"
            >
              <div className="my-6 transform scale-[0.65] xs:scale-[0.75] sm:scale-[0.85] origin-center">
                <MacDock />
              </div>
            </ComponentCard>
          </li>
          <li>
            <ComponentCard
              title="Search Bar"
              description="Command-palette style searchable dropdown with keyboard navigation (↑/↓/Enter/Esc), live match highlighting, animated active pill, and click-outside dismissal."
              href="/components/search-bar"
              badge="Interactive · UI"
            >
              <div className="my-4 w-full max-w-[320px]">
                <SearchBar />
              </div>
            </ComponentCard>
          </li>
        </ul>
      </div>
    </Container>
  );
}
