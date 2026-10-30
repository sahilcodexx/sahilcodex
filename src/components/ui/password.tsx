"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Check, LoaderCircle, LockKeyhole, RotateCcw } from "lucide-react";
import NumberFlow from "@number-flow/react";

import { cn } from "@/lib/utils";

type Stage = "idle" | "input" | "verifying" | "error" | "verified";

// shortcut: local demo verification only, use a server endpoint for real codes.
const DEMO_CODE = "123456";

export default function Password() {
  const [stage, setStage] = useState<Stage>("idle");
  const [code, setCode] = useState("");
  const [availableWidth, setAvailableWidth] = useState(440);
  const container = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const reduceMotion = useReducedMotion();
  const expanded = stage === "input" || stage === "error";

  useEffect(() => {
    const element = container.current;
    if (!element) return;
    const observer = new ResizeObserver(([entry]) => setAvailableWidth(entry.contentRect.width));
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (stage === "input" || stage === "error") {
      input.current?.focus();
      if (stage === "error") input.current?.select();
    }
    if (stage === "input" && code.length === 6) {
      const timer = setTimeout(() => setStage("verifying"), reduceMotion ? 0 : 380);
      return () => clearTimeout(timer);
    }
    if (stage !== "verifying") return;

    const timer = setTimeout(() => {
      setStage(code === DEMO_CODE ? "verified" : "error");
    }, 1200);
    return () => clearTimeout(timer);
  }, [stage, code, reduceMotion]);

  useEffect(() => {
    if (stage !== "error") return;
    const clear = setTimeout(() => setCode(""), 1000);
    const retry = setTimeout(() => setStage("input"), reduceMotion ? 1050 : 1650);
    return () => {
      clearTimeout(clear);
      clearTimeout(retry);
    };
  }, [stage, reduceMotion]);

  function updateCode(raw: string) {
    const next = raw.replace(/\D/g, "").slice(0, 6);
    setCode(next);
    setStage("input");
  }

  function reset() {
    setCode("");
    setStage("input");
  }

  return (
    <div ref={container} className="relative flex w-full max-w-[440px] flex-col items-center font-sans">
      <motion.div
        initial={false}
        animate={{
          width: Math.min(availableWidth, expanded ? 440 : stage === "verified" ? 224 : 248),
          x: stage === "error" && !reduceMotion ? [0, -6, 6, -3, 3, 0] : 0,
        }}
        transition={{
          width: { duration: reduceMotion ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] },
          x: { duration: reduceMotion ? 0 : 0.35 },
        }}
        style={{ borderRadius: 44 }}
        className="relative h-[88px] max-w-full overflow-hidden border border-[#dfdfd9] bg-white [--code-surface:#eeede6] shadow-[0_14px_25px_-15px_rgba(35,35,25,0.2),0_1px_2px_rgba(35,35,25,0.08)] dark:border-[#3b3b3e] dark:bg-[#27272a] dark:[--code-surface:#37373a] dark:shadow-[0_14px_25px_-15px_rgba(0,0,0,0.6)]"
      >
        <motion.div
          aria-hidden="true"
          initial={false}
          animate={{
            opacity: expanded ? 0 : 1,
            backgroundColor: stage === "verified" ? "#21be50" : "var(--code-surface)",
          }}
          transition={{ duration: reduceMotion ? 0 : 0.35 }}
          className="absolute inset-2 rounded-[36px]"
        />
        <AnimatePresence initial={false}>
          <motion.div
            key={expanded ? "digits" : stage}
            initial={reduceMotion ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0, transition: { duration: reduceMotion ? 0 : 0.28, delay: reduceMotion ? 0 : 0.16 } }}
            exit={{ opacity: 0, y: reduceMotion ? 0 : -4, transition: { duration: reduceMotion ? 0 : 0.12 } }}
            className="absolute inset-2"
          >
            {expanded ? (
              <div className="group relative h-full">
                <div aria-hidden="true" className="flex h-full gap-2">
                  {Array.from({ length: 6 }, (_, index) => (
                    <span
                      key={index}
                      className={cn(
                        "relative flex min-w-0 flex-1 items-center justify-center overflow-hidden rounded-[22px] bg-[#eeede6] text-[28px] font-semibold text-[#25251f] transition-colors duration-300 first:rounded-l-[36px] last:rounded-r-[36px] motion-reduce:transition-none dark:bg-[#37373a] dark:text-[#f0efeb]",
                        stage === "error" && "bg-[#fbe4e7] text-[#c32f49] dark:bg-[#542832] dark:text-[#ff91a3]",
                        stage !== "error" && index === Math.min(code.length, 5) && "group-focus-within:ring-2 group-focus-within:ring-inset group-focus-within:ring-[#292922] dark:group-focus-within:ring-[#e0dfd7]",
                      )}
                    >
                      <AnimatePresence initial={false}>
                        {code[index] !== undefined && (
                          <motion.span
                            key="digit"
                            initial={{ y: reduceMotion ? 0 : "100%", filter: reduceMotion ? "blur(0px)" : "blur(4px)" }}
                            animate={{ y: 0, filter: "blur(0px)" }}
                            exit={{
                              y: reduceMotion ? 0 : "100%",
                              opacity: reduceMotion ? 0 : 1,
                              transition: {
                                delay: stage === "error" && !reduceMotion ? (5 - index) * 0.055 : 0,
                                duration: reduceMotion ? 0 : 0.3,
                              },
                            }}
                            transition={{
                              duration: reduceMotion ? 0 : 0.35,
                              ease: [0.22, 1, 0.36, 1],
                              filter: { duration: reduceMotion ? 0 : 0.45, ease: "easeIn" },
                            }}
                            className="absolute inset-0 flex items-center justify-center"
                          >
                            <NumberFlow value={Number(code[index])} trend={1} animated={!reduceMotion} className="tabular-nums" />
                          </motion.span>
                        )}
                      </AnimatePresence>
                    </span>
                  ))}
                </div>
                <input
                  ref={input}
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  maxLength={6}
                  value={code}
                  onChange={(event) => updateCode(event.target.value)}
                  onPaste={(event) => {
                    event.preventDefault();
                    updateCode(event.clipboardData.getData("text"));
                  }}
                  aria-label="Six-digit verification code"
                  aria-describedby="code-help"
                  aria-invalid={stage === "error"}
                  className="absolute inset-0 h-full w-full cursor-text rounded-full opacity-0"
                />
              </div>
            ) : stage === "idle" ? (
              <button
                type="button"
                onClick={() => setStage("input")}
                className="flex h-full w-full items-center justify-center gap-3 whitespace-nowrap rounded-full text-[23px] font-semibold tracking-[-0.7px] text-[#25251f] outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#292922] dark:text-[#f0efeb] dark:focus-visible:ring-[#e0dfd7]"
              >
                <LockKeyhole aria-hidden="true" className="size-6" strokeWidth={2.3} />
                Enter code
              </button>
            ) : (
              <div className={cn(
                "relative flex h-full items-center justify-center gap-3 overflow-hidden whitespace-nowrap rounded-full text-[23px] font-semibold tracking-[-0.7px]",
                stage === "verified" ? "text-white" : "text-[#25251f] dark:text-[#f0efeb]",
              )}>
                {stage === "verified" ? (
                  <>
                    <Check aria-hidden="true" className="size-6" strokeWidth={2.5} />
                    <span>Verified</span>
                    {!reduceMotion && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ x: "-220%" }}
                        animate={{ x: "400%" }}
                        transition={{ duration: 1, delay: 0.15, ease: "easeInOut" }}
                        className="pointer-events-none absolute inset-y-0 left-0 w-20 -skew-x-20 bg-linear-to-r from-transparent via-white/40 to-transparent"
                      />
                    )}
                  </>
                ) : (
                  <>
                    <LoaderCircle aria-hidden="true" className="size-6 animate-spin motion-reduce:animate-none" strokeWidth={2} />
                    <span>Verifying</span>
                  </>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </motion.div>

      <p id="code-help" role="status" aria-live="polite" className={cn(
        "absolute top-full mt-4 min-h-5 w-full text-center text-xs text-neutral-500 dark:text-neutral-400",
        stage === "error" && "text-[#c32f49] dark:text-[#ff91a3]",
      )}>
        {stage === "error" ? "Incorrect code. Try again." : stage === "verified" ? "Code verified successfully." : stage === "verifying" ? "Checking your code…" : "Try the demo code 123456"}
      </p>
      <div className="absolute top-full mt-10 h-6">
        {(stage === "error" || stage === "verified") && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 rounded text-xs text-neutral-500 outline-none hover:text-neutral-900 focus-visible:ring-2 focus-visible:ring-neutral-400 dark:text-neutral-400 dark:hover:text-white">
            <RotateCcw aria-hidden="true" className="size-3" />
            {stage === "error" ? "Try again" : "Replay"}
          </button>
        )}
      </div>
    </div>
  );
}
