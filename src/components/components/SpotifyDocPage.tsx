'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Container from "@/components/layouts/Container";
import RepeatSeparator from "@/components/ui/repeat-separator";
import Spotify from '@/components/landing/Spotify';
import HighlightedCode from '@/components/common/HighlightedCode';
import { ProjectHeaderActions } from '@/components/projects/ProjectHeaderActions';
import CopyButton, { CopyIcon } from '@/components/ui/copy-button';
import {
  Copy,
  Check,
  Sun,
  Moon,
  ArrowLeft,
  Terminal,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Maximize2,
  Minimize2,
  Volume2,
  VolumeX,
} from 'lucide-react';
import { useTheme } from '@/components/landing/theme-provider';

const packageManagers = ['bun', 'npm', 'pnpm', 'yarn'] as const;
type PackageManager = (typeof packageManagers)[number];

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://sahilcodex.vercel.app';

const installCommands: Record<PackageManager, string> = {
  pnpm: `pnpm dlx shadcn@latest add "${siteUrl}/r/music-player.json"`,
  npm: `npx shadcn@latest add "${siteUrl}/r/music-player.json"`,
  yarn: `yarn dlx shadcn@latest add "${siteUrl}/r/music-player.json"`,
  bun: `bunx shadcn@latest add "${siteUrl}/r/music-player.json"`,
};

const musicPlayerCode = `'use client';

import { useState, useRef, useEffect } from 'react';
import { useSpotify } from '@/hooks/useSpotify';
import { motion as Motion, AnimatePresence } from 'motion/react';
import CopyButton, { CopyIcon } from '@/components/ui/copy-button';
import SpotifyIcon from '@/components/icons/social/SpotifyIcon';

const DISC_SIZE = 260;
const DISC_COLLAPSED = 100;
const DISC_SCALE_COLLAPSED = DISC_COLLAPSED / DISC_SIZE;

const CARD = {
  collapsed: { w: 270, h: 88, r: 22 },
  expanded: { w: 250, h: 284, r: 28 },
} as const;

const SPRING = {
  type: 'spring' as const,
  stiffness: 380,
  damping: 46,
  mass: 0.9,
};

const FADE = {
  duration: 0.2,
  ease: [0.25, 1, 0.5, 1] as [number, number, number, number],
};

const SoundBars = ({ compact = false }: { compact?: boolean }) => {
  const bars = compact
    ? [
        { max: 8, delay: 0 },
        { max: 12, delay: 0.15 },
        { max: 7, delay: 0.08 },
        { max: 11, delay: 0.22 },
      ]
    : [
        { max: 10, delay: 0 },
        { max: 14, delay: 0.12 },
        { max: 8, delay: 0.06 },
        { max: 12, delay: 0.18 },
      ];

  return (
    <span className={\`flex items-end gap-[2.5px] \${compact ? 'h-3' : 'h-3.5'}\`}>
      {bars.map((bar, i) => (
        <Motion.span
          key={i}
          className="inline-block w-[2.5px] rounded-full bg-[#1DB954]"
          animate={{ height: [3, bar.max, 3] }}
          transition={{
            duration: 0.65 + i * 0.05,
            repeat: Infinity,
            delay: bar.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </span>
  );
};

const CdDisc = ({
  albumArt,
  title,
  isPlaying,
  isOffline,
}: {
  albumArt: string | null;
  title: string;
  isPlaying: boolean;
  isOffline: boolean;
}) => (
  <div className="relative size-full overflow-hidden rounded-full border border-black/10 shadow-[0_8px_24px_-4px_rgba(0,0,0,0.35),0_2px_6px_rgba(0,0,0,0.12)] dark:border-white/10">
    {albumArt ? (
      <img
        src={albumArt}
        alt={title}
        className={\`size-full rounded-full object-cover \${
          isPlaying
            ? 'animate-[spin_8s_linear_infinite]'
            : 'animate-[spin_18s_linear_infinite]'
        }\`}
        style={{
          filter: isOffline ? 'saturate(65%) brightness(0.9)' : undefined,
        }}
      />
    ) : (
      <div className="flex size-full items-center justify-center bg-neutral-800">
        <SpotifyIcon className="size-1/3 text-[#1DB954]" />
      </div>
    )}

    <div
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{
        background: \`
          radial-gradient(circle at center, transparent 28%, rgba(0,0,0,0.06) 29%, transparent 30%),
          radial-gradient(circle at center, transparent 42%, rgba(0,0,0,0.05) 43%, transparent 44%),
          radial-gradient(circle at center, transparent 56%, rgba(0,0,0,0.04) 57%, transparent 58%),
          radial-gradient(circle at center, transparent 70%, rgba(0,0,0,0.04) 71%, transparent 72%)
        \`,
      }}
    />

    <div
      className="pointer-events-none absolute inset-0 rounded-full"
      style={{
        boxShadow:
          'inset 0 0 0 1px rgba(255,255,255,0.18), inset 0 0 12px rgba(0,0,0,0.15)',
      }}
    />

    <div className="pointer-events-none absolute inset-0 m-auto flex size-[22%] items-center justify-center rounded-full border-2 border-[#A8ACBA] bg-gradient-to-b from-[#E8EBF5] via-[#9EA2B4] to-[#6B6F82] shadow-md">
      <div className="size-[42%] rounded-full border-[1.5px] border-[#3a3a3a] bg-[#111111] shadow-inner" />
    </div>
  </div>
);

export const MusicPlayer = () => {
  const { data, loading, error } = useSpotify();
  const [isExpanded, setIsExpanded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const discordId = process.env.NEXT_PUBLIC_DISCORD_ID;

  useEffect(() => {
    if (!isExpanded) return;

    const handleOutsideClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setIsExpanded(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isExpanded]);

  if (!discordId || (error && !data)) return null;

  if (loading) {
    return (
      <div className="relative z-40 my-6 h-14 w-full select-none">
        <div className="absolute right-0 bottom-0 left-0 mx-auto flex w-fit items-center justify-center">
          <div className="flex h-[88px] w-[270px] items-center gap-3 overflow-hidden rounded-[22px] border border-neutral-200/80 bg-white p-3.5 shadow-xs dark:border-neutral-700/60 dark:bg-[#1A1715]">
            <div className="flex min-w-0 flex-1 flex-col gap-2.5 pl-1">
              <div className="h-2.5 w-20 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700/50" />
              <div className="h-2.5 w-16 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-700/30" />
              <div className="h-3.5 w-28 animate-pulse rounded-full bg-neutral-200 dark:bg-neutral-700/50" />
            </div>
            <div className="size-[72px] shrink-0 animate-pulse rounded-full bg-neutral-100 dark:bg-neutral-800" />
          </div>
        </div>
      </div>
    );
  }

  const isOffline = !data;
  const displayData = data || {
    isPlaying: false,
    title: 'Offline',
    artist: 'Not listening right now',
    albumArt: null,
    songUrl: 'https://open.spotify.com',
  };

  const statusLabel = displayData.isPlaying
    ? 'Now Playing'
    : isOffline
      ? 'Offline'
      : 'Last Played';

  return (
    <div className="relative z-40 my-6 h-14 w-full select-none">
      <div className="absolute right-0 bottom-0 left-0 mx-auto flex w-fit items-end justify-center">
        <Motion.div
          ref={cardRef}
          onClick={() => setIsExpanded((v) => !v)}
          initial={false}
          whileTap={{ scale: 0.985 }}
          transition={SPRING}
          animate={{
            width: isExpanded ? CARD.expanded.w : CARD.collapsed.w,
            height: isExpanded ? CARD.expanded.h : CARD.collapsed.h,
            borderRadius: isExpanded ? CARD.expanded.r : CARD.collapsed.r,
          }}
          style={{ transformOrigin: 'bottom center' }}
          className="group relative z-50 cursor-pointer overflow-hidden border border-neutral-200/90 bg-white text-neutral-800 shadow-xs dark:border-[#38332F] dark:bg-[#1A1715] dark:text-white"
        >
          <Motion.div
            initial={false}
            style={{ width: DISC_SIZE, height: DISC_SIZE }}
            animate={
              isExpanded
                ? { scale: 1, x: -5, y: -130 }
                : { scale: DISC_SCALE_COLLAPSED, x: 118, y: -86 }
            }
            transition={SPRING}
            className="pointer-events-none absolute top-0 left-0 z-20"
          >
            <CdDisc
              albumArt={displayData.albumArt}
              title={displayData.title}
              isPlaying={displayData.isPlaying}
              isOffline={isOffline}
            />
          </Motion.div>

          <Motion.div
            initial={false}
            animate={{ opacity: isExpanded ? 0 : 1 }}
            transition={{
              duration: 0.18,
              delay: isExpanded ? 0 : 0.32,
              ease: FADE.ease,
            }}
            className="pointer-events-none absolute inset-y-0 right-[68px] z-30 w-8 bg-gradient-to-r from-white to-transparent dark:from-[#1A1715]"
          />

          <AnimatePresence>
            {!isExpanded ? (
              <Motion.div
                key="collapsed-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="absolute inset-y-0 left-0 z-10 flex w-[calc(100%-100px)] flex-col justify-center gap-1.5 pl-4 pr-2"
              >
                <div className="flex items-center gap-1.5">
                  <SpotifyIcon className="size-3 shrink-0 text-[#1DB954]" />
                  <span className="text-[11px] font-medium tracking-wide text-neutral-400 dark:text-neutral-500">
                    {statusLabel}
                  </span>
                  {displayData.isPlaying && <SoundBars compact />}
                </div>

                <div className="flex min-w-0 flex-col gap-0.5">
                  <span className="truncate text-xs font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white">
                    {displayData.title}
                  </span>
                  <span className="truncate text-[11px] font-medium leading-snug text-neutral-500 dark:text-neutral-400">
                    {displayData.artist}
                  </span>
                </div>
              </Motion.div>
            ) : (
              <Motion.div
                key="expanded-content"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
                className="absolute left-0 top-[152px] z-10 flex h-[calc(100%-152px)] w-full flex-col items-center px-5 pb-8 pt-1 text-center"
              >
                {displayData.isPlaying && (
                  <div className="mb-4 flex items-center justify-center">
                    <SoundBars />
                  </div>
                )}

                <div className="flex w-full flex-col items-center gap-1 text-center">
                  <span
                    className="block w-full truncate text-sm font-semibold leading-snug tracking-tight text-neutral-900 dark:text-white"
                    style={{ maxWidth: 210 }}
                  >
                    {displayData.title}
                  </span>
                  <span
                    className="block w-full truncate text-xs font-medium leading-snug text-neutral-500 dark:text-neutral-400"
                    style={{ maxWidth: 210 }}
                  >
                    {displayData.artist}
                  </span>
                </div>

                <div className="mt-auto flex w-full flex-col items-center pt-4">
                  <div className="mb-4 h-[2px] w-6 rounded-full bg-neutral-400/40 dark:bg-neutral-600/40" />
                  <a
                    href={displayData.songUrl || 'https://open.spotify.com'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="group/link flex cursor-pointer items-center gap-1.5 pb-0.5 text-xs font-bold text-[#1DB954] hover:text-[#1ed760]"
                  >
                    <span>Open Song</span>
                    <SpotifyIcon className="size-3.5 text-[#1DB954] transition-transform duration-150 group-hover/link:scale-110" />
                  </a>
                </div>
              </Motion.div>
            )}
          </AnimatePresence>
        </Motion.div>
      </div>
    </div>
  );
};

export default MusicPlayer;
`;

export default function SpotifyDocPage() {
  const [installTab, setInstallTab] = useState<'cli' | 'manual'>('cli');
  const [activePm, setActivePm] = useState<PackageManager>('pnpm');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
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

  const usageCode = `import MusicPlayer from "@/components/ui/music-player";

export default function MusicPlayerDemo() {
  return (
    <div className="flex w-full items-center justify-center p-10">
      <MusicPlayer />
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
              projectTitle="Music Player"
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
              Music Player
            </h1>
          </div>
        </div>

        {/* Unified Content Container with strict px-4 sm:px-6 side padding on ALL sections */}
        <Container className="py-6">
          <div className="space-y-8 px-4 sm:px-6">
            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed font-normal">
              Interactive live music player widget with real-time audio spectrum animations, vinyl CD disc spin, and song metadata.
            </p>

            {/* 1. Live Component Preview Canvas (TOP) */}
            <div className="w-full">
              {(() => {
                const renderCanvas = (inZoom: boolean) => (
                  <div
                    className={
                      inZoom
                        ? 'fixed inset-0 z-[999999] w-screen h-screen bg-background p-6 sm:p-10 flex flex-col items-center justify-between overflow-hidden animate-in fade-in duration-100'
                        : 'relative w-full rounded-2xl border border-border bg-card/60 p-4 sm:p-6 flex flex-col items-center justify-between min-h-[300px]'
                    }
                  >
                    {/* Canvas Top Bar */}
                    <div className={`w-full flex items-center justify-between text-xs z-10 ${inZoom ? 'max-w-5xl' : 'mb-4'}`}>
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
                          title={soundEnabled ? 'Sound Enabled' : 'Sound Muted'}
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
                          onClick={() => setReloadKey((prev) => prev + 1)}
                          className="p-1.5 rounded-lg border border-border bg-background text-muted-foreground hover:text-foreground active:rotate-180"
                          title="Reload Canvas"
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
                    <div key={reloadKey} className={`my-auto w-full flex items-center justify-center transition-[transform,padding] duration-300 ${
                      inZoom ? 'scale-125 pt-0' : 'pt-2 pb-4'
                    }`}>
                      <Spotify />
                    </div>

                    {inZoom && (
                      <div className="text-xs text-muted-foreground font-mono">
                        Press Minimize button to exit zoom view
                      </div>
                    )}
                  </div>
                );

                if (isZoomed && mounted) {
                  return (
                    <>
                      <div className="relative w-full rounded-2xl border border-border bg-card/60 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[300px] opacity-0" />
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
                <div className="space-y-3 w-full">
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
              ) : (
                <div className="space-y-6 w-full">
                  {/* Step 1: Install dependencies */}
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Install dependencies
                    </h3>

                    <div className="rounded-xl border border-border bg-card p-4 font-mono text-xs flex items-center justify-between overflow-x-auto text-foreground">
                      <span>npm i motion lucide-react</span>
                      <button
                        onClick={() => copyToClipboard('npm i motion lucide-react', 'dep-cmd')}
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

                  {/* Step 3: Full Source Code Block with Expand/Collapse */}
                  <div className="space-y-3 pl-4 border-l-2 border-border">
                    <h3 className="text-sm font-semibold text-foreground">
                      Copy the source code
                    </h3>

                    <div className="inline-block rounded-md border border-border bg-muted px-2.5 py-1 font-mono text-xs text-muted-foreground">
                      components/ui/music-player.tsx
                    </div>

                    <div className="rounded-xl border border-border bg-card font-mono text-xs relative overflow-hidden">
                      <button
                        onClick={() => copyToClipboard(musicPlayerCode, 'music-player-src')}
                        className="absolute top-3 right-3 flex items-center gap-1 text-[11px] border border-border bg-muted px-2 py-1 rounded-md text-muted-foreground hover:text-foreground z-20"
                      >
                        {copiedId === 'music-player-src' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>Copy</span>
                      </button>

                      <div className={`transition-[max-height] duration-300 ${!isExpanded ? 'max-h-64 overflow-hidden' : 'max-h-[800px] overflow-y-auto'}`}>
                        <div className="p-4 overflow-x-auto">
                          <HighlightedCode code={musicPlayerCode} isDark={isDark} />
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
