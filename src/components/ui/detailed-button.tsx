"use client";

import type { ComponentProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export type DetailedButtonVariant = "blue" | "graphite" | "violet" | "green";

const MotionButton = motion.create(Button);

const VARIANTS: Record<DetailedButtonVariant, string> = {
  blue: "[--button-fill:#296ff0]",
  graphite:
    "[--button-fill:#34363c] dark:[&&]:[box-shadow:inset_0_0_6px_2px_rgb(255_255_255/8%),0_0_0_1px_var(--button-fill),0_3px_6px_rgb(0_0_0/20%)] dark:before:opacity-30",
  violet: "[--button-fill:#7650df]",
  green: "[--button-fill:#187b59]",
};

type DetailedButtonProps = Omit<ComponentProps<typeof MotionButton>, "variant" | "asChild"> & {
  variant?: DetailedButtonVariant;
};

export default function DetailedButton({
  variant = "blue",
  className,
  type = "button",
  disabled,
  ...props
}: DetailedButtonProps) {
  const reduceMotion = useReducedMotion();
  const skipMotion = reduceMotion || disabled;

  return (
    <MotionButton
      {...props}
      type={type}
      disabled={disabled}
      whileHover={skipMotion ? undefined : { y: -2 }}
      whileTap={skipMotion ? undefined : { y: 1, scale: 0.98 }}
      transition={{ type: "spring", stiffness: 450, damping: 30 }}
      className={cn(
        "relative cursor-pointer transition-[filter] duration-150 hover:brightness-[1.06] motion-reduce:[&&]:[transition:none]",
        "[&&]:h-[54px] [&&]:gap-3 [&&]:rounded-[18px] [&&]:border-0 [&&]:bg-[var(--button-fill)] [&&]:px-6 [&&]:py-0 [&&]:text-[22px] [&&]:font-normal [&&]:tracking-[-0.5px] [&&]:text-white",
        "[&&]:[box-shadow:inset_0_0_6px_2px_rgb(255_255_255/24%),0_0_0_1px_var(--button-fill),0_3px_6px_rgb(0_0_0/20%)]",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:border before:border-transparent before:[background:linear-gradient(180deg,rgb(255_255_255/40%),rgb(255_255_255/0%))_border-box] before:[mask:linear-gradient(#fff_0_0)_padding-box_exclude,linear-gradient(#fff_0_0)_exclude] before:content-['']",
        "[&&_svg]:size-5 focus-visible:[outline:3px_solid_var(--button-fill)] focus-visible:outline-offset-5",
        "[@media(max-width:400px)]:[&&]:gap-2.5 [@media(max-width:400px)]:[&&]:px-5 [@media(max-width:400px)]:[&&]:text-base",
        VARIANTS[variant],
        className,
      )}
    />
  );
}
