'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Container from "@/components/layouts/Container";
import RepeatSeparator from "@/components/ui/repeat-separator";
import { ProjectHeaderActions } from "@/components/projects/ProjectHeaderActions";
import SearchBar from "@/components/ui/search-bar";
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

export default function SearchBarDocPage() {
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
    typeof window !== 'undefined'
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
    pnpm: 'pnpm dlx shadcn@latest add https://sahilcodex.vercel.app/r/search-bar.json',
    npm: 'npx shadcn@latest add https://sahilcodex.vercel.app/r/search-bar.json',
    yarn: 'npx shadcn@latest add https://sahilcodex.vercel.app/r/search-bar.json',
    bun: 'bunx --bun shadcn@latest add https://sahilcodex.vercel.app/r/search-bar.json',
  };

  const manualDeps: Record<PackageManager, string> = {
    pnpm: 'pnpm add motion lucide-react',
    npm: 'npm install motion lucide-react',
    yarn: 'yarn add motion lucide-react',
    bun: 'bun add motion lucide-react',
  };

  const componentSourceCode = `"use client";

import { useState, useMemo, useRef, useEffect, useDeferredValue } from "react";
import { Search, ArrowUp, ArrowDown, CornerDownLeft, X, Check } from "lucide-react";
import { AnimatePresence, LayoutGroup, motion, useReducedMotion } from "motion/react";

const springSnappy = { type: "spring" as const, stiffness: 520, damping: 34, mass: 0.72 };
const springPill = { type: "spring" as const, stiffness: 420, damping: 32, mass: 0.55 };
const springMicro = { type: "spring" as const, stiffness: 620, damping: 28, mass: 0.6 };
const tweenOut = { duration: 0.16, ease: [0.16, 1, 0.3, 1] as const };

type Country = {
  name: string;
  code: string;
  flag: string;
};

const COUNTRIES: Country[] = [
  { name: "United States", code: "US", flag: "🇺🇸" },
  { name: "United Kingdom", code: "GB", flag: "🇬🇧" },
  { name: "Canada", code: "CA", flag: "🇨🇦" },
  { name: "Australia", code: "AU", flag: "🇦🇺" },
  { name: "Germany", code: "DE", flag: "🇩🇪" },
  { name: "France", code: "FR", flag: "🇫🇷" },
  { name: "Italy", code: "IT", flag: "🇮🇹" },
  { name: "Spain", code: "ES", flag: "🇪🇸" },
  { name: "Japan", code: "JP", flag: "🇯🇵" },
  { name: "South Korea", code: "KR", flag: "🇰🇷" },
  { name: "China", code: "CN", flag: "🇨🇳" },
  { name: "India", code: "IN", flag: "🇮🇳" },
  { name: "Brazil", code: "BR", flag: "🇧🇷" },
  { name: "Mexico", code: "MX", flag: "🇲🇽" },
  { name: "Netherlands", code: "NL", flag: "🇳🇱" },
  { name: "Sweden", code: "SE", flag: "🇸🇪" },
  { name: "Switzerland", code: "CH", flag: "🇨🇭" },
  { name: "Singapore", code: "SG", flag: "🇸🇬" },
  { name: "New Zealand", code: "NZ", flag: "🇳🇿" },
  { name: "Ireland", code: "IE", flag: "🇮🇪" },
];

export interface SearchBarProps {
  /** Optional className for the outer container. */
  className?: string;
}

export function SearchBar({ className }: SearchBarProps = {}) {
  const shouldReduceMotion = useReducedMotion();
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [selected, setSelected] = useState<string>("US");
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isOpen, setIsOpen] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    if (!deferredQuery.trim()) return COUNTRIES;
    const q = deferredQuery.toLowerCase();
    return COUNTRIES.filter((c) => c.name.toLowerCase().includes(q));
  }, [deferredQuery]);

  // Reset active index when query changes
  useEffect(() => {
    setActiveIndex(0);
  }, [deferredQuery]);

  const isSearching = query.trim().length > 0;

  // Click outside to close dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Keyboard navigation handler
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (e.key === "ArrowDown" || e.key === "Enter") {
        setIsOpen(true);
      }
      return;
    }

    if (filtered.length === 0) return;

    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filtered[activeIndex]) {
        setSelected(filtered[activeIndex].code);
        setQuery(filtered[activeIndex].name);
        setIsOpen(false);
      }
    } else if (e.key === "Escape") {
      e.preventDefault();
      setQuery("");
      setIsOpen(false);
      inputRef.current?.blur();
    }
  };

  // Scroll active keyboard item into view
  useEffect(() => {
    if (!listRef.current || !isOpen) return;
    const activeEl = listRef.current.children[activeIndex] as HTMLElement;
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  }, [activeIndex, isOpen]);

  return (
    <LayoutGroup>
      <div
        ref={containerRef}
        className={\`relative w-full max-w-md select-none font-sans \${className ?? ""}\`}
        onKeyDown={handleKeyDown}
      >
      <div
        className={\`flex items-center gap-2 rounded-2xl border bg-white px-4 py-2.5 transition-[border-color,box-shadow] duration-200 dark:bg-neutral-900 \${
          isOpen
            ? "border-neutral-300 shadow-[0_0_0_4px_rgba(0,0,0,0.04),0_1px_2px_0_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,1)] dark:border-neutral-700 dark:shadow-[0_0_0_4px_rgba(255,255,255,0.04),0_1px_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.04)]"
            : "border-neutral-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,1)] dark:border-neutral-800 dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.04)]"
        }\`}
      >
        <Search className="h-4 w-4 shrink-0 text-neutral-400 dark:text-neutral-500" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onFocus={() => setIsOpen(true)}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          placeholder={\`Search \${COUNTRIES.length} countries\`}
          className="flex-1 min-w-0 bg-transparent text-sm text-neutral-900 placeholder:text-neutral-400 outline-none dark:text-neutral-100 dark:placeholder:text-neutral-500"
        />

        <AnimatePresence mode="popLayout" initial={false}>
          {isSearching ? (
            <motion.div
              key="searching"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85, x: 6 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85, x: 6 }}
              transition={shouldReduceMotion ? { duration: 0 } : springMicro}
              className="flex items-center gap-1.5"
            >
              <motion.span
                key={filtered.length}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.14, ease: [0.16, 1, 0.3, 1] }}
                className="shrink-0 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium tabular-nums text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
              >
                {filtered.length}
              </motion.span>
              <motion.button
                type="button"
                whileTap={shouldReduceMotion ? undefined : { scale: 0.88 }}
                onClick={() => {
                  setQuery("");
                  inputRef.current?.focus();
                }}
                className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-neutral-50 text-neutral-400 hover:text-neutral-600 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400 dark:hover:text-neutral-200"
              >
                <X className="h-3 w-3" />
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="esc"
              initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.85 }}
              transition={shouldReduceMotion ? { duration: 0 } : springMicro}
              className="shrink-0 rounded-md border border-neutral-200 bg-neutral-50 px-2 py-0.5 text-[10px] font-medium text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
            >
              esc
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            layout
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -8, scale: 0.96 }
            }
            animate={
              shouldReduceMotion
                ? { opacity: 1 }
                : { opacity: 1, y: 0, scale: 1 }
            }
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: -6, scale: 0.98 }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    layout: { type: "spring", visualDuration: 0.22, bounce: 0 },
                    ...springSnappy,
                    opacity: tweenOut,
                  }
            }
            style={{ originX: 0.5, originY: 0 }}
            className="absolute left-0 right-0 top-full mt-2 z-50 overflow-hidden rounded-2xl border border-neutral-200 bg-white/95 backdrop-blur-md shadow-[0_4px_20px_-2px_rgba(0,0,0,0.06),0_12px_32px_-4px_rgba(0,0,0,0.12)] dark:border-neutral-800 dark:bg-neutral-900/95 dark:shadow-[0_4px_20px_-2px_rgba(0,0,0,0.4),0_12px_32px_-4px_rgba(0,0,0,0.6)]"
          >
            <div
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
              className="max-h-80 overflow-y-auto p-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&::-webkit-scrollbar-thumb]:hidden [&::-webkit-scrollbar-track]:hidden"
            >
              <div ref={listRef} className="flex flex-col gap-0.5">
                {filtered.length === 0 ? (
                  <motion.div
                    initial={shouldReduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={shouldReduceMotion ? { duration: 0 } : { duration: 0.15 }}
                    className="px-3 py-3 text-xs text-neutral-400 dark:text-neutral-500"
                  >
                    No matches for "{deferredQuery}"
                  </motion.div>
                ) : (
                  <AnimatePresence mode="popLayout" initial={false}>
                    {filtered.map((country, idx) => {
                      const isSelected = country.code === selected;
                      const isActive = idx === activeIndex;

                      return (
                        <motion.button
                          key={country.code}
                          layout
                          type="button"
                          onClick={() => {
                            setSelected(country.code);
                            setQuery(country.name);
                            setActiveIndex(idx);
                            setIsOpen(false);
                          }}
                          onMouseEnter={() => setActiveIndex(idx)}
                          initial={
                            shouldReduceMotion || idx >= 10
                              ? false
                              : { opacity: 0, y: 8 }
                          }
                          animate={{ opacity: 1, y: 0 }}
                          exit={
                            shouldReduceMotion
                              ? { opacity: 0 }
                              : { opacity: 0, scale: 0.97 }
                          }
                          transition={{
                            layout: shouldReduceMotion
                              ? { duration: 0 }
                              : { type: "spring", visualDuration: 0.18, bounce: 0 },
                            opacity: shouldReduceMotion
                              ? { duration: 0 }
                              : { duration: 0.12 },
                            scale: shouldReduceMotion
                              ? { duration: 0 }
                              : { duration: 0.1 },
                          }}
                          whileTap={shouldReduceMotion ? undefined : { scale: 0.985 }}
                          className="relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left outline-none"
                        >
                        {isActive && (
                          <motion.div
                            layoutId="active-pill"
                            transition={
                              shouldReduceMotion ? { duration: 0 } : springPill
                            }
                            className="absolute inset-0 rounded-xl bg-neutral-100 dark:bg-neutral-800"
                          />
                        )}

                        <span className="relative z-10 text-base shrink-0 leading-none">
                          {country.flag}
                        </span>

                        <span
                          className={\`relative z-10 flex-1 text-sm \${
                            isSelected
                              ? "font-semibold text-neutral-900 dark:text-neutral-100"
                              : "text-neutral-700 dark:text-neutral-300"
                          }\`}
                        >
                          {highlightMatch(country.name, deferredQuery)}
                        </span>

                        <AnimatePresence initial={false}>
                          {isSelected && (
                            <motion.span
                              key="check"
                              initial={
                                shouldReduceMotion
                                  ? false
                                  : { scale: 0.4, opacity: 0 }
                              }
                              animate={{ scale: 1, opacity: 1 }}
                              exit={
                                shouldReduceMotion
                                  ? { opacity: 0 }
                                  : { scale: 0.4, opacity: 0 }
                              }
                              transition={
                                shouldReduceMotion ? { duration: 0 } : springMicro
                              }
                              className="relative z-10 text-neutral-800 dark:text-neutral-200"
                            >
                              <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                            </motion.span>
                          )}
                        </AnimatePresence>

                        <span
                          className={\`relative z-10 shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium tracking-wide \${
                            isSelected
                              ? "border-neutral-300 bg-white text-neutral-800 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
                              : "border-neutral-200 bg-neutral-50 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                          }\`}
                        >
                          {country.code}
                        </span>
                      </motion.button>
                    );
                  })}
                </AnimatePresence>
                )}
              </div>
            </div>

            <motion.div
              initial={shouldReduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { delay: 0.08, duration: 0.2 }
              }
              className="flex items-center justify-between border-t border-neutral-100 bg-neutral-50/80 px-4 py-2.5 dark:border-neutral-800 dark:bg-neutral-800/40"
            >
              <div className="flex items-center gap-2 text-[11px] text-neutral-500 dark:text-neutral-400">
                <div className="flex items-center gap-1 self-center">
                  <KeyIcon>
                    <ArrowUp className="h-2.5 w-2.5" />
                  </KeyIcon>
                  <KeyIcon>
                    <ArrowDown className="h-2.5 w-2.5" />
                  </KeyIcon>
                  <span className="ml-1">move</span>
                </div>
                <div className="flex items-center gap-1 self-center">
                  <KeyIcon>
                    <CornerDownLeft className="h-2.5 w-2.5" />
                  </KeyIcon>
                  <span className="ml-1">select</span>
                </div>
              </div>

              <motion.span
                key={filtered.length}
                initial={shouldReduceMotion ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.16, ease: [0.16, 1, 0.3, 1] }
                }
                className="text-[11px] tabular-nums text-neutral-400 dark:text-neutral-500 font-medium"
              >
                {filtered.length} {filtered.length === 1 ? "country" : "countries"}
              </motion.span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
    </LayoutGroup>
  );
}

export default SearchBar;

function KeyIcon({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-500 shadow-[0_1px_0_0_rgba(0,0,0,0.04)] dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400">
      {children}
    </div>
  );
}

function highlightMatch(text: string, query: string) {
  const q = query.trim();
  if (!q) return text;
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx === -1) return text;
  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded-[3px] bg-yellow-200/80 px-0.5 font-semibold text-neutral-900 dark:bg-yellow-500/30 dark:text-neutral-100">
        {text.slice(idx, idx + q.length)}
      </mark>
      {text.slice(idx + q.length)}
    </>
  );
}
`;

  const usageCode = `import SearchBar from "@/components/ui/search-bar";

export default function Page() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <SearchBar generateDuration={3} imageSrc="/fightclub1.jpeg" />
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
              projectTitle="Search Bar"
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
              Search Bar
            </h1>
          </div>
        </div>

        {/* Unified Content Container with strict px-4 sm:px-6 side padding on ALL sections */}
        <Container className="py-6">
          <div className="space-y-8 px-4 sm:px-6">
            {/* Description */}
            <p className="text-muted-foreground text-base leading-relaxed font-normal">
              A self-contained command-palette style searchable dropdown. Type to filter
              a list of 20 countries in real time, navigate with ↑/↓, select with
              Enter, clear with Esc, and dismiss by clicking outside. The active
              item is highlighted with a spring-animated pill, matches are
              highlighted in-line, and the count chip updates live. Built with
              Motion — keyboard-first, accessible, and fully reduced-motion aware.
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
                      <div className={`w-full max-w-[420px] transform transition-transform origin-center ${
                        inZoom ? 'scale-100' : 'scale-[0.85] sm:scale-100'
                      }`}>
                        <SearchBar />
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
                        2. Add component code to <code className="text-xs bg-muted px-1.5 py-0.5 rounded font-mono">components/ui/search-bar.tsx</code>
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
