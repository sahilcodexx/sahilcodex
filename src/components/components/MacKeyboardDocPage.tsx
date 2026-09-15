'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Container from "@/components/layouts/Container";
import RepeatSeparator from "@/components/ui/repeat-separator";
import CustomKeyboard from '@/components/ui/custom-keyboard';
import CopyButton, { CopyIcon } from '@/components/ui/copy-button';
import HighlightedCode from '@/components/common/HighlightedCode';
import { ProjectHeaderActions } from '@/components/projects/ProjectHeaderActions';
import { customKeyboardSourceCode } from '@/data/source-codes';
import {
  Copy,
  Check,
  RotateCcw,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  ArrowLeft,
  Terminal,
  ChevronDown,
  ChevronUp,
  Maximize2,
  Minimize2,
} from 'lucide-react';
import { useTheme } from '@/components/landing/theme-provider';

const packageManagers = ['bun', 'npm', 'pnpm', 'yarn'] as const;
type PackageManager = (typeof packageManagers)[number];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

const installCommands: Record<PackageManager, string> = {
  pnpm: `pnpm dlx shadcn@latest add "${siteUrl}/r/keyboard.json"`,
  npm: `npx shadcn@latest add "${siteUrl}/r/keyboard.json"`,
  yarn: `yarn dlx shadcn@latest add "${siteUrl}/r/keyboard.json"`,
  bun: `bunx shadcn@latest add "${siteUrl}/r/keyboard.json"`,
};

export default function MacKeyboardDocPage() {
  const [installTab, setInstallTab] = useState<'cli' | 'manual'>('cli');
  const [activePm, setActivePm] = useState<PackageManager>('pnpm');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [canvasTheme, setCanvasTheme] = useState<'dark' | 'light'>('dark');
  const [isZoomed, setIsZoomed] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark =
    mounted
      ? document.documentElement.classList.contains('dark')
      : resolvedTheme === 'dark';

  // Prevent background scroll when Zoom mode is active
  useEffect(() => {
    if (isZoomed) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isZoomed]);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const usageCode = `import CustomKeyboard from "@/components/ui/custom-keyboard";

export default function KeyboardDemo() {
  return (
    <div className="flex w-full items-center justify-center p-10">
      <CustomKeyboard theme="${canvasTheme}" enableSound={${soundEnabled}} />
    </div>
  );
}`;

  const utilsCode = `import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}`;

  return (
    <div className="w-full border-none">
      <RepeatSeparator cn="h-8 opacity-50" />
      <div data-doc-cols-ready="">
        {/* Document Header Container matching Blog/Project Layout 1:1 */}
        <div data-slot="doc-container" className="mx-auto w-full">
          <div className="screen-line-bottom h-px" />

          {/* Sub-header Bar with Back Link & Action Buttons */}
          <div className="flex items-center justify-between p-2 px-4 sm:px-6">
            <Link
              href="/components"
              className="group/button text-muted-foreground hover:text-foreground inline-flex h-7 shrink-0 cursor-pointer items-center justify-center gap-2 border-none px-0 text-sm font-medium whitespace-nowrap outline-none select-none hover:no-underline"
            >
              <ArrowLeft className="size-4 transition-transform duration-200 group-hover/button:-translate-x-1" />
              Components
            </Link>

            <ProjectHeaderActions
              previousSlug={null}
              nextSlug={null}
              projectTitle="Mac Keyboard"
              basePath="components"
            />
          </div>

          <RepeatSeparator cn="h-8" />
          <div className="screen-line-top screen-line-bottom py-px">
            <div className="mx-auto h-4 w-full" />
          </div>

          {/* Title Header */}
          <div className="screen-line-bottom">
            <h1
              data-slot="doc-title"
              className="px-4 sm:px-6 py-3 text-3xl font-semibold tracking-tight text-balance md:max-w-md"
            >
              Mac Keyboard
            </h1>
          </div>
        </div>

        {/* Unified Content Container with strict px-4 sm:px-6 side padding on ALL sections */}
        <Container className="py-6">
          <div className="space-y-8 px-4 sm:px-6">
            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed font-normal">
              Interactive Mac keyboard replica with real-time keystroke tracking and
              authentic layout geometry. Features active states for physical key presses and
              optional sound feedback.
            </p>

            {/* 1. Live Component Preview Canvas (TOP) */}
            <div className="w-full">
              {(() => {
                const renderCanvas = (inZoom: boolean) => (
                  <div
                    className={
                      inZoom
                        ? 'fixed inset-0 z-[999999] w-screen h-screen bg-background p-6 sm:p-10 flex flex-col items-center justify-between overflow-hidden animate-in fade-in duration-100'
                        : 'relative w-full rounded-2xl border border-border bg-card/60 p-4 sm:p-6 flex flex-col items-center justify-between min-h-[360px]'
                    }
                  >
                    {/* Canvas Top Bar */}
                    <div className={`w-full flex items-center justify-between text-xs z-10 ${inZoom ? 'max-w-6xl' : 'mb-4'}`}>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {inZoom ? 'Fullscreen Preview Mode' : 'Preview Canvas'}
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => setSoundEnabled((prev) => !prev)}
                          className={`p-1.5 rounded-lg border ${
                            soundEnabled
                              ? 'border-emerald-500/40 bg-emerald-500/10 text-emerald-500'
                              : 'border-border bg-background text-muted-foreground hover:text-foreground'
                          }`}
                          title={soundEnabled ? 'Sound Effects Enabled' : 'Sound Muted'}
                        >
                          {soundEnabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
                        </button>

                        <button
                          onClick={() => setTheme(isDark ? 'light' : 'dark')}
                          className="p-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground"
                          title="Toggle Theme"
                        >
                          {isDark ? <Sun className="h-4 w-4 text-amber-400" /> : <Moon className="h-4 w-4 text-neutral-600" />}
                        </button>

                        <button
                          onClick={() => {
                            setCanvasTheme('dark');
                            setSoundEnabled(true);
                            setReloadKey((prev) => prev + 1);
                          }}
                          className="p-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground active:rotate-180"
                          title="Reset Canvas"
                        >
                          <RotateCcw className="h-4 w-4" />
                        </button>

                        <button
                          onClick={() => setIsZoomed((prev) => !prev)}
                          className={`p-1.5 rounded-lg border ${
                            inZoom
                              ? 'border-primary bg-primary/10 text-primary hover:bg-primary/20'
                              : 'border-border bg-background text-muted-foreground hover:text-foreground'
                          }`}
                          title={inZoom ? 'Exit Fullscreen' : 'Fullscreen Zoom Mode'}
                        >
                          {inZoom ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                        </button>
                      </div>
                    </div>

                    {/* Component Preview */}
                    <div key={reloadKey} className="my-auto w-full flex items-center justify-center py-6 overflow-visible">
                      <div className={`transform transition-transform origin-center ${
                        inZoom
                          ? 'scale-[0.8] xs:scale-[0.95] sm:scale-[1.15] md:scale-[1.3] lg:scale-[1.4]'
                          : 'scale-[0.6] xs:scale-[0.75] sm:scale-[0.9] md:scale-[1.0]'
                      }`}>
                        <CustomKeyboard theme={canvasTheme} enableSound={soundEnabled} showPreview={true} />
                      </div>
                    </div>

                    {/* Bottom Theme Selector Pill */}
                    <div className="inline-flex items-center rounded-full border border-border p-1 shadow-xs bg-background z-10">
                      <button
                        onClick={() => setCanvasTheme('dark')}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                          canvasTheme === 'dark'
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Space Black (Dark)
                      </button>
                      <button
                        onClick={() => setCanvasTheme('light')}
                        className={`px-4 py-1.5 text-xs font-medium rounded-full ${
                          canvasTheme === 'light'
                            ? 'bg-primary text-primary-foreground shadow-xs'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        Silver (Light)
                      </button>
                    </div>
                  </div>
                );

                if (isZoomed && mounted) {
                  return (
                    <>
                      <div className="relative w-full rounded-2xl border border-border bg-card/60 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[360px] opacity-0" />
                      {createPortal(renderCanvas(true), document.body)}
                    </>
                  );
                }

                return renderCanvas(false);
              })()}
            </div>

            {/* 2. Installation Section (BELOW CANVAS) */}
            <div className="space-y-6 w-full">
              <div className="space-y-1">
                <h2 className="text-2xl font-bold tracking-tight text-foreground">
                  Installation
                </h2>
                <p className="text-xs text-muted-foreground">
                  Install component dependencies or run the automated CLI command.
                </p>
              </div>

              {/* CLI vs Manual Switcher */}
              <div className="inline-flex rounded-lg p-1 text-xs font-medium bg-muted border border-border">
                <button
                  onClick={() => setInstallTab('cli')}
                  className={`px-4 py-1.5 rounded-md ${
                    installTab === 'cli'
                      ? 'bg-background text-foreground shadow-xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  CLI
                </button>
                <button
                  onClick={() => setInstallTab('manual')}
                  className={`px-4 py-1.5 rounded-md ${
                    installTab === 'manual'
                      ? 'bg-background text-foreground shadow-xs font-semibold'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Manual
                </button>
              </div>

              {installTab === 'cli' ? (
                <div className="space-y-6 w-full">
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Run the following command
                    </h3>

                    <div className="rounded-xl border border-border bg-card overflow-hidden">
                      <div className="flex items-center border-b border-border px-3 py-1.5 text-xs bg-muted/50">
                        <Terminal className="size-3.5 mr-2 text-muted-foreground" />
                        {packageManagers.map((pm) => (
                          <button
                            key={pm}
                            onClick={() => setActivePm(pm)}
                            className={`px-3 py-1 text-xs font-medium ${
                              activePm === pm
                                ? 'text-foreground border-b-2 border-primary font-semibold'
                                : 'text-muted-foreground hover:text-foreground'
                            }`}
                          >
                            {pm}
                          </button>
                        ))}

                        <button
                          onClick={() => copyToClipboard(installCommands[activePm], 'cli-cmd')}
                          className="ml-auto p-1 text-muted-foreground hover:text-foreground"
                          aria-label="Copy Command"
                        >
                          <CopyIcon copied={copiedId === 'cli-cmd'} className="size-3.5" />
                        </button>
                      </div>

                      <div className="p-4 font-mono text-xs overflow-x-auto text-foreground">
                        <span>{installCommands[activePm]}</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Add sound file
                    </h3>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Place the sound assets in your{' '}
                      <code className="px-1.5 py-0.5 rounded font-mono text-xs bg-muted text-foreground">
                        public/sounds/
                      </code>{' '}
                      folder:
                    </p>

                    <ul className="text-xs space-y-1.5 list-disc pl-5 text-muted-foreground">
                      <li>
                        <strong className="text-foreground underline">mackeysound.ogg</strong> - Audio sprite file
                      </li>
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="space-y-6 w-full">
                  {/* Step 1: Install dependencies */}
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Install dependencies
                    </h3>

                    <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs flex items-center justify-between overflow-x-auto text-foreground">
                      <span>npm i motion clsx tailwind-merge @tabler/icons-react lucide-react</span>
                      <button
                        onClick={() => copyToClipboard('npm i motion clsx tailwind-merge @tabler/icons-react lucide-react', 'dep-cmd')}
                        className="text-muted-foreground hover:text-foreground"
                      >
                        <CopyIcon copied={copiedId === 'dep-cmd'} className="size-3.5" />
                      </button>
                    </div>
                  </div>

                  {/* Step 2: lib/utils.ts */}
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">lib/utils.ts</h3>

                    <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs relative text-foreground">
                      <button
                        onClick={() => copyToClipboard(utilsCode, 'utils-code')}
                        className="absolute top-3 right-3 flex items-center gap-1 text-[11px] border border-border bg-muted px-2 py-1 rounded-md text-muted-foreground hover:text-foreground z-10"
                      >
                        {copiedId === 'utils-code' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>Copy</span>
                      </button>
                      <div className="p-4 overflow-x-auto">
                        <HighlightedCode code={utilsCode} isDark={isDark} />
                      </div>
                    </div>
                  </div>

                  {/* Step 3: Sound files */}
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Add sound file
                    </h3>

                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Place the sound assets in your{' '}
                      <code className="px-1.5 py-0.5 rounded font-mono text-xs bg-muted text-foreground">
                        public/sounds/
                      </code>{' '}
                      folder:
                    </p>

                    <ul className="text-xs space-y-1.5 list-disc pl-5 text-muted-foreground">
                      <li>
                        <strong className="text-foreground underline">mackeysound.ogg</strong> - Audio sprite file
                      </li>
                    </ul>
                  </div>

                  {/* Step 4: Full Source Code Block with Expand/Collapse */}
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Copy the source code
                    </h3>

                    <div className="inline-block rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      components/ui/custom-keyboard.tsx
                    </div>

                    <div className="rounded-xl border border-border bg-card font-mono text-xs relative overflow-hidden">
                      <button
                        onClick={() => copyToClipboard(customKeyboardSourceCode, 'src-code')}
                        className="absolute top-3 right-3 flex items-center gap-1 text-[11px] border border-border bg-muted px-2 py-1 rounded-md text-muted-foreground hover:text-foreground z-20"
                      >
                        {copiedId === 'src-code' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>Copy</span>
                      </button>

                      <div className={`transition-[max-height] duration-300 ${!isExpanded ? 'max-h-64 overflow-hidden' : 'max-h-[800px] overflow-y-auto'}`}>
                        <div className="p-4 overflow-x-auto">
                          <HighlightedCode code={customKeyboardSourceCode} isDark={isDark} />
                        </div>
                      </div>

                      {/* Fade Overlay & Expand/Collapse Button */}
                      <div className={`absolute inset-x-0 bottom-0 ${!isExpanded ? 'h-28 bg-gradient-to-t from-card via-card/80 to-transparent' : 'py-3 bg-gradient-to-t from-card to-transparent'} flex items-end justify-center pb-3 z-10`}>
                        <button
                          onClick={() => setIsExpanded((prev) => !prev)}
                          className="px-4 py-1.5 rounded-lg text-xs font-semibold shadow-xs border border-border bg-background text-foreground hover:bg-muted flex items-center gap-1.5"
                        >
                          {isExpanded ? (
                            <>
                              <span>Collapse Code</span>
                              <ChevronUp className="size-3.5" />
                            </>
                          ) : (
                            <>
                              <span>Expand Code</span>
                              <ChevronDown className="size-3.5" />
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 3. Usage Section (BELOW INSTALLATION) */}
            <div className="space-y-4 w-full">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Usage
              </h2>

              <div className="rounded-xl border border-border bg-card overflow-hidden">
                <div className="flex items-center justify-between border-b border-border px-4 py-2.5 text-xs font-semibold bg-muted/50 text-foreground">
                  <span>Import component</span>

                  <button
                    onClick={() => copyToClipboard(usageCode, 'usage-code')}
                    className="p-1 text-muted-foreground hover:text-foreground"
                    aria-label="Copy Usage Code"
                  >
                    {copiedId === 'usage-code' ? (
                      <Check className="h-3.5 w-3.5 text-emerald-500" />
                    ) : (
                      <Copy className="h-3.5 w-3.5" />
                    )}
                  </button>
                </div>

                <div className="p-4 font-mono text-xs leading-relaxed overflow-x-auto">
                  <HighlightedCode code={usageCode} isDark={isDark} />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
