'use client';

import React from 'react';
import Container from '@/components/layouts/Container';
import SectionHeading from '@/components/common/SectionHeading';
import RepeatSeparator from '@/components/ui/repeat-separator';
import ComponentCard from '@/components/components/ComponentCard';
import CustomKeyboard from '@/components/ui/custom-keyboard';
import LoaderAnimation from '@/components/ui/loader-animation';
import AiImageCard from '@/components/ui/ai-image-card';
import SearchBar from '@/components/ui/search-bar';
import { Button } from '@/components/ui/button';
import { MoveRight } from 'lucide-react';
import Link from 'next/link';

export default function ComponentsSection() {
  return (
    <Container>
      <RepeatSeparator />
      <SectionHeading heading="Components" />

      {/* Grid of UI Components matching Blog/Project Layout 1:1 */}
      <div className="relative py-4">
        {/* Vertical separator line */}
        <div className="pointer-events-none absolute inset-0 -z-1 grid grid-cols-1 gap-4 max-sm:hidden sm:grid-cols-2">
          <div className="border-border border-r"></div>
          <div className="border-border border-l"></div>
        </div>

        {/* Row 1 */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
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

        {/* Continuous Horizontal Grid Separator between Row 1 and Row 2 */}
        <div className="before:bg-border after:bg-border relative my-4 h-4 w-full before:absolute before:top-0 before:left-0 before:h-px before:w-full after:absolute after:bottom-0 after:left-0 after:h-px after:w-full" />

        {/* Row 2 */}
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li>
            <ComponentCard
              title="Page Loader"
              description="Multilingual greeting text loader built with Motion. Each word fades into the next without blocking the page."
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
              title="Search Bar"
              description="Command-palette style searchable dropdown with keyboard navigation (↑/↓/Enter/Esc), live match highlighting, animated active pill, and click-outside dismissal."
              href="/components/search-bar"
              badge="Interactive · UI"
            >
              <div className="my-4 w-full max-w-[280px]">
                <SearchBar />
              </div>
            </ComponentCard>
          </li>
        </ul>
      </div>

      {/* Button separator matching Projects section 1:1 */}
      <div className="before:bg-border after:bg-border relative m-auto mt-1 flex w-full max-w-screen items-center justify-center gap-2 overflow-visible px-4 py-1.5 transition-shadow duration-300 before:absolute before:top-0 before:left-1/2 before:z-[1] before:h-px before:w-screen before:-translate-x-1/2 before:content-[''] after:absolute after:bottom-0 after:left-1/2 after:z-[1] after:h-px after:w-screen after:-translate-x-1/2 after:content-[''] data-[affix=true]:shadow-[0_0_16px_0_black]/8 dark:data-[affix=true]:shadow-[0_0_16px_0_black]">
        <Link href="/components">
          <Button variant="default" size="sm" className="cursor-pointer">
            Show all Components <MoveRight />
          </Button>
        </Link>
      </div>
    </Container>
  );
}
