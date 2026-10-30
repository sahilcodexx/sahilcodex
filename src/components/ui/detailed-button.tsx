"use client";

import type { ComponentProps } from "react";
import { motion, useReducedMotion } from "motion/react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import styles from "./detailedbutton.module.css";

export type DetailedButtonVariant = "blue" | "graphite" | "violet" | "green";

const MotionButton = motion.create(Button);

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
      className={cn(styles.button, styles[variant], className)}
    />
  );
}
