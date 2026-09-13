"use client";

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
        className={`relative w-full max-w-md select-none font-sans ${className ?? ""}`}
        onKeyDown={handleKeyDown}
      >
      <div
        className={`flex items-center gap-2 rounded-2xl border bg-white px-4 py-2.5 transition-[border-color,box-shadow] duration-200 dark:bg-neutral-900 ${
          isOpen
            ? "border-neutral-300 shadow-[0_0_0_4px_rgba(0,0,0,0.04),0_1px_2px_0_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,1)] dark:border-neutral-700 dark:shadow-[0_0_0_4px_rgba(255,255,255,0.04),0_1px_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.04)]"
            : "border-neutral-200 shadow-[0_1px_2px_0_rgba(0,0,0,0.04),inset_0_1px_0_0_rgba(255,255,255,1)] dark:border-neutral-800 dark:shadow-[0_1px_2px_0_rgba(0,0,0,0.2),inset_0_1px_0_0_rgba(255,255,255,0.04)]"
        }`}
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
          placeholder={`Search ${COUNTRIES.length} countries`}
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
                          className={`relative z-10 flex-1 text-sm ${
                            isSelected
                              ? "font-semibold text-neutral-900 dark:text-neutral-100"
                              : "text-neutral-700 dark:text-neutral-300"
                          }`}
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
                          className={`relative z-10 shrink-0 rounded-md border px-2 py-0.5 text-[10px] font-medium tracking-wide ${
                            isSelected
                              ? "border-neutral-300 bg-white text-neutral-800 dark:border-neutral-600 dark:bg-neutral-900 dark:text-neutral-300"
                              : "border-neutral-200 bg-neutral-50 text-neutral-500 dark:border-neutral-700 dark:bg-neutral-800 dark:text-neutral-400"
                          }`}
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
