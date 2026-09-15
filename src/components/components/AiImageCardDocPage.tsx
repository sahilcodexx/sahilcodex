'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Container from "@/components/layouts/Container";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { ProjectHeaderActions } from "@/components/projects/ProjectHeaderActions";
import AiImageCard from "@/components/ui/ai-image-card";
import HighlightedCode from "@/components/common/HighlightedCode";
import { useTheme } from "@/components/landing/theme-provider";
import {
  RotateCcw,
  Maximize2,
  Minimize2,
  Sun,
  Moon,
  ArrowLeft,
  Check,
  Copy,
  ChevronDown,
  ChevronUp
} from 'lucide-react';

type PackageManager = 'pnpm' | 'npm' | 'yarn' | 'bun';

export default function AiImageCardDocPage() {
  const [installTab, setInstallTab] = useState<'cli' | 'manual'>('cli');
  const [activePm, setActivePm] = useState<PackageManager>('pnpm');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const { setTheme, resolvedTheme } = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
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

  const cliCommands: Record<PackageManager, string> = {
    pnpm: 'pnpm dlx shadcn@latest add https://sahilcodex.vercel.app/r/ai-image-card.json',
    npm: 'npx shadcn@latest add https://sahilcodex.vercel.app/r/ai-image-card.json',
    yarn: 'npx shadcn@latest add https://sahilcodex.vercel.app/r/ai-image-card.json',
    bun: 'bunx --bun shadcn@latest add https://sahilcodex.vercel.app/r/ai-image-card.json',
  };

  const manualDeps: Record<PackageManager, string> = {
    pnpm: 'pnpm add motion',
    npm: 'npm install motion',
    yarn: 'yarn add motion',
    bun: 'bun add motion',
  };

  const componentSourceCode = `"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";

export interface AiImageCardProps {
  /** Seconds the blinking-grid animation runs before the image pops in. */
  generateDuration?: number;
  /** Image source to reveal at the end. */
  imageSrc?: string;
  /** Alt text for the revealed image. */
  imageAlt?: string;
  /** Label shown at the bottom-left while generating. */
  label?: string;
  className?: string;
}

export function AiImageCard({
  generateDuration = 3,
  imageSrc = "/fightclub1.jpeg",
  imageAlt = "AI generated image",
  label = "Generating image",
  className,
}: AiImageCardProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [seconds, setSeconds] = useState(0);
  const [done, setDone] = useState(false);

  // Count up timer
  useEffect(() => {
    const start = Date.now();
    const id = setInterval(() => {
      const elapsed = Math.floor((Date.now() - start) / 1000);
      setSeconds(elapsed);
      if (elapsed >= generateDuration) {
        setDone(true);
        clearInterval(id);
      }
    }, 250);
    return () => clearInterval(id);
  }, [generateDuration]);

  // Blinking grid animation (adapted from Bookmrk BlinkingGrid)
  useEffect(() => {
    if (done) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId = 0;
    let width = 0;
    let height = 0;
    const size = 4;
    const gap = 2;
    const step = size + gap;

    let cols = 0;
    let rows = 0;
    let offsets: number[][] = [];
    let speeds: number[][] = [];

    const resize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        width = parent.clientWidth;
        height = parent.clientHeight;
        canvas.width = width;
        canvas.height = height;
        cols = Math.ceil(width / step);
        rows = Math.ceil(height / step);

        offsets = Array.from({ length: cols }, () =>
          Array.from({ length: rows }, () => Math.random() * Math.PI * 2)
        );
        speeds = Array.from({ length: cols }, () =>
          Array.from({ length: rows }, () => 0.35 + Math.random() * 0.95)
        );
      }
    };

    window.addEventListener("resize", resize);
    resize();

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * 0.001;

      const isDark = document.documentElement.classList.contains("dark");
      const r = isDark ? 129 : 110;
      const g = isDark ? 129 : 110;
      const b = isDark ? 137 : 120;

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const offset = offsets[i][j];
          const speed = speeds[i][j];

          const wave = Math.sin(time * speed + offset);

          let opacity = 0.02;
          if (wave > 0.9) {
            opacity = 0.1 + (wave - 0.9) * 3;
          } else if (wave > 0.7) {
            opacity = 0.05 + (wave - 0.7) * 0.5;
          }

          ctx.fillStyle = \`rgba(\${r}, \${g}, \${b}, \${opacity})\`;
          ctx.fillRect(i * step, j * step, size, size);
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [done, generateDuration]);

  return (
    <div
      className={
        "relative w-[360px] aspect-square rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 " +
        (className ?? "")
      }
    >
      <AnimatePresence>
        {!done && (
          <motion.div
            key="grid"
            className="absolute inset-0 flex items-center justify-center"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.08, filter: "blur(14px)" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
          >
            <canvas ref={canvasRef} className="w-full h-full" />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.div
            key="image"
            className="absolute inset-0"
            initial={{ opacity: 0, filter: "blur(20px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            exit={{ opacity: 0, filter: "blur(20px)" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            <img
              src={imageSrc}
              alt={imageAlt}
              className="w-full h-full object-cover"
            />
            <motion.div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              initial={{ x: "-120%" }}
              animate={{ x: "120%" }}
              transition={{ duration: 1.1, ease: [0.65, 0, 0.35, 1], delay: 0.3 }}
            >
              <div className="h-full w-1/3 bg-gradient-to-r from-transparent via-white/35 to-transparent -skew-x-12" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {done && (
          <motion.div
            key="flash"
            aria-hidden
            className="absolute inset-0 pointer-events-none bg-white"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.18, 0] }}
            transition={{ duration: 0.7, times: [0, 0.25, 1], ease: "easeOut" }}
          />
        )}
      </AnimatePresence>

      <div
        className="absolute inset-x-0 bottom-0 h-24 bg-white/40 backdrop-blur-md dark:bg-black/50"
        style={{
          maskImage: "linear-gradient(to top, black 0%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to top, black 0%, transparent 100%)",
        }}
      >
        <div className="absolute bottom-3 left-5 right-5 flex items-center justify-between">
          <span className="text-sm font-medium text-neutral-900 dark:text-white dark:drop-shadow-sm">
            {done ? "Generated" : label}
          </span>
          <span className="text-sm font-medium text-neutral-900/90 dark:text-white/90 tabular-nums dark:drop-shadow-sm">
            {seconds}s
          </span>
        </div>
      </div>
    </div>
  );
}

export default AiImageCard;`;

  const usageCode = `import AiImageCard from "@/components/ui/ai-image-card";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <AiImageCard generateDuration={3} imageSrc="/fightclub1.jpeg" />
    </div>
  );
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
              projectTitle="Image Generation Card"
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
              Image Generation Card
            </h1>
          </div>
        </div>

        {/* Unified Content Container with strict px-4 sm:px-6 side padding on ALL sections */}
        <Container className="py-6">
          <div className="space-y-8 px-4 sm:px-6">
            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed font-normal">
              A self-contained UI component that recreates the image generation state
              you see in tools like ChatGPT, DALL·E, and Midjourney. A subtle blinking
              grid builds up, then a blur-to-focus reveal sweeps the image in with a
              soft shine, ending on a live generation timer. Built with Motion and a
              canvas grid — no AI or model calls required.
            </p>

            {/* 1. Live Component Preview Canvas */}
            <div className="w-full">
              {(() => {
                const renderCanvas = (inZoom: boolean) => (
                  <div
                    className={
                      inZoom
                        ? 'fixed inset-0 z-[999999] w-screen h-screen bg-background p-6 sm:p-10 flex flex-col items-center justify-between overflow-hidden animate-in fade-in duration-100'
                        : 'relative w-full rounded-2xl border border-border bg-card/60 p-4 sm:p-6 flex flex-col items-center justify-between min-h-[260px]'
                    }
                  >
                    {/* Canvas Top Bar */}
                    <div className={`w-full flex items-center justify-between text-xs z-10 ${inZoom ? 'max-w-5xl' : 'mb-4'}`}>
                      <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                        {inZoom ? 'Fullscreen Preview Mode' : 'Preview Canvas'}
                      </span>

                      <div className="flex items-center gap-1.5 shrink-0">
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
                    <div key={reloadKey} className="my-auto w-full flex items-center justify-center py-8">
                      <div className={`w-[360px] max-w-full transform transition-transform origin-center ${
                        inZoom ? 'scale-100' : 'scale-[0.7] sm:scale-[0.85] md:scale-100'
                      }`}>
                        <AiImageCard generateDuration={3} />
                      </div>
                    </div>
                  </div>
                );

                if (isZoomed && mounted) {
                  return (
                    <>
                      <div className="relative w-full rounded-2xl border border-border bg-card/60 p-4 sm:p-6 flex flex-col items-center justify-center min-h-[260px] opacity-0" />
                      {createPortal(renderCanvas(true), document.body)}
                    </>
                  );
                }

                return renderCanvas(false);
              })()}
            </div>

            {/* 2. Installation Section */}
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
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    installTab === 'cli'
                      ? 'bg-background text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  CLI
                </button>
                <button
                  onClick={() => setInstallTab('manual')}
                  className={`px-3 py-1.5 rounded-md transition-all ${
                    installTab === 'manual'
                      ? 'bg-background text-foreground shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Manual
                </button>
              </div>

              {/* Installation Box */}
              {installTab === 'cli' ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs border-b border-border pb-2">
                    {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
                      <button
                        key={pm}
                        onClick={() => setActivePm(pm)}
                        className={`px-2.5 py-1 rounded-md font-mono text-xs ${
                          activePm === pm
                            ? 'bg-primary/10 text-primary font-semibold'
                            : 'text-muted-foreground hover:text-foreground'
                        }`}
                      >
                        {pm}
                      </button>
                    ))}
                  </div>

                  <div className="relative rounded-xl border border-border bg-card p-4 font-mono text-xs">
                    <div className="flex items-center justify-between gap-4">
                      <span className="truncate text-foreground select-all">
                        {cliCommands[activePm]}
                      </span>
                      <button
                        onClick={() => copyToClipboard(cliCommands[activePm], 'cli-cmd')}
                        className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors shrink-0"
                      >
                        {copiedId === 'cli-cmd' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  {/* Step 1: Install Dependencies */}
                  <div className="space-y-2">
                    <h3 className="text-sm font-semibold text-foreground">
                      1. Install dependencies
                    </h3>
                    <div className="flex items-center gap-2 text-xs border-b border-border pb-2">
                      {(['pnpm', 'npm', 'yarn', 'bun'] as PackageManager[]).map((pm) => (
                        <button
                          key={pm}
                          onClick={() => setActivePm(pm)}
                          className={`px-2.5 py-1 rounded-md font-mono text-xs ${
                            activePm === pm
                              ? 'bg-primary/10 text-primary font-semibold'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {pm}
                        </button>
                      ))}
                    </div>
                    <div className="relative rounded-xl border border-border bg-card p-4 font-mono text-xs flex items-center justify-between">
                      <span className="text-foreground select-all">
                        {manualDeps[activePm]}
                      </span>
                      <button
                        onClick={() => copyToClipboard(manualDeps[activePm], 'manual-deps')}
                        className="p-1.5 rounded-lg border border-border bg-background hover:bg-muted text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {copiedId === 'manual-deps' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                      </button>
                    </div>
                  </div>

                  {/* Step 2: Component Source Code */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-foreground">
                        2. Add component code to <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">components/ui/ai-image-card.tsx</code>
                      </h3>
                    </div>

                    <div className="rounded-xl border border-border bg-card font-mono text-xs relative overflow-hidden">
                      <button
                        onClick={() => copyToClipboard(componentSourceCode, 'code-src')}
                        className="absolute top-3 right-3 flex items-center gap-1 text-[11px] border border-border bg-muted px-2 py-1 rounded-md text-muted-foreground hover:text-foreground z-20"
                      >
                        {copiedId === 'code-src' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                        <span>{copiedId === 'code-src' ? 'Copied' : 'Copy'}</span>
                      </button>

                      <div className={`transition-[max-height] duration-300 ${!isExpanded ? 'max-h-64 overflow-hidden' : 'max-h-[800px] overflow-y-auto'}`}>
                        <div className="p-4 overflow-x-auto">
                          <HighlightedCode code={componentSourceCode} isDark={isDark} />
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

            {/* 3. Usage Section */}
            <div className="space-y-4 pt-6 border-t border-border">
              <h2 className="text-2xl font-bold tracking-tight text-foreground">
                Usage
              </h2>
              <div className="rounded-xl border border-border bg-card font-mono text-xs relative overflow-hidden">
                <button
                  onClick={() => copyToClipboard(usageCode, 'usage-code')}
                  className="absolute top-3 right-3 flex items-center gap-1 text-[11px] border border-border bg-muted px-2 py-1 rounded-md text-muted-foreground hover:text-foreground z-20"
                >
                  {copiedId === 'usage-code' ? <Check className="h-3 w-3 text-emerald-500" /> : <Copy className="h-3 w-3" />}
                  <span>Copy</span>
                </button>
                <div className="p-4 overflow-x-auto">
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
