'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Container from "@/components/layouts/Container";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { ProjectHeaderActions } from "@/components/projects/ProjectHeaderActions";
import LoaderAnimation from "@/components/ui/loader-animation";
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

export default function LoaderDocPage() {
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
    pnpm: 'pnpm dlx shadcn@latest add https://sahilcodex.vercel.app/r/loader-animation.json',
    npm: 'npx shadcn@latest add https://sahilcodex.vercel.app/r/loader-animation.json',
    yarn: 'npx shadcn@latest add https://sahilcodex.vercel.app/r/loader-animation.json',
    bun: 'bunx --bun shadcn@latest add https://sahilcodex.vercel.app/r/loader-animation.json',
  };

  const manualDeps: Record<PackageManager, string> = {
    pnpm: 'pnpm add motion',
    npm: 'npm install motion',
    yarn: 'yarn add motion',
    bun: 'bun add motion',
  };

  const componentSourceCode = `"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";

const greetings = [
  { lang: "English", text: "Hello" },
  { lang: "Hindi", text: "हेलो" },
  { lang: "French", text: "Bonjour" },
  { lang: "Dutch", text: "Hallo" },
  { lang: "Japanese", text: "こんにちは" },
  { lang: "Spanish", text: "Hola" },
  { lang: "German", text: "Hallo" },
  { lang: "Arabic", text: "مرحبا" },
  { lang: "Thai", text: "สวัสดี" },
  { lang: "Vietnamese", text: "Xin chào" },
  { lang: "Bengali", text: "হ্যালো" },
  { lang: "Urdu", text: "ہیلو" },
];

export interface LoaderAnimationProps {
  className?: string;
  intervalMs?: number;
}

export function LoaderAnimation({
  className = "",
  intervalMs = 170,
}: LoaderAnimationProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % greetings.length);
    }, intervalMs);

    return () => clearInterval(interval);
  }, [intervalMs]);

  return (
    <div className={\`flex items-center justify-center p-4 \${className}\`}>
      <div className="h-12 flex items-center justify-center">
        <motion.h2
          key={index}
          className="text-3xl font-medium tracking-tight text-foreground"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.1 }}
        >
          {greetings[index].text}
        </motion.h2>
      </div>
    </div>
  );
}

export default LoaderAnimation;`;

  const usageCode = `import LoaderAnimation from "@/components/ui/loader-animation";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <LoaderAnimation />
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
              projectTitle="Page Loader Animation"
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
              Page Loader Animation
            </h1>
          </div>
        </div>

        {/* Unified Content Container with strict px-4 sm:px-6 side padding on ALL sections */}
        <Container className="py-6">
          <div className="space-y-8 px-4 sm:px-6">
            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed font-normal">
              Multilingual greeting text loader built with Motion. Each word fades into the next without blocking the main layout.
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
                      <div className={`transform transition-transform origin-center ${
                        inZoom ? 'scale-125' : 'scale-100'
                      }`}>
                        <LoaderAnimation />
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
                        2. Add component code to <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">components/ui/loader-animation.tsx</code>
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
