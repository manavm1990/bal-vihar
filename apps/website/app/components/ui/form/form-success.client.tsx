"use client";

import { FADE } from "@lib/animations";
import { motion, useReducedMotion } from "motion/react";
import Confetti from "react-confetti";

import { P } from "../typography";

interface FormSuccessProps {
  title: string;
  message: string;
}

/**
 * Announced confirmation shown in place of a form after a successful submission. Confetti is
 * skipped for visitors who prefer reduced motion.
 *
 * @example
 * <FormSuccess title="Thank you!" message={successMessage} />
 */
export function FormSuccess({ title, message }: FormSuccessProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      role="status"
      className="space-y-2"
      initial={FADE.initial}
      animate={FADE.animate}
      transition={FADE.transition}
    >
      {!shouldReduceMotion && <Confetti recycle={false} />}
      <p className="text-foreground text-2xl font-semibold tracking-tight">{title}</p>
      <P>{message}</P>
    </motion.div>
  );
}
