"use client";

import {
  motion,
  useReducedMotion,
  type HTMLMotionProps,
} from "framer-motion";
import { staggerContainer, staggerItem } from "@/lib/motion";
import { useRevealArm } from "@/lib/useRevealArm";

type StaggerProps = {
  /** Delay between each child, in seconds. */
  stagger?: number;
  /** Delay before the first child animates. */
  delayChildren?: number;
  as?: "div" | "ul" | "section";
} & Omit<HTMLMotionProps<"div">, "variants" | "initial" | "whileInView" | "viewport">;

/**
 * Container that reveals its <StaggerItem> children in sequence.
 * Only arms below-the-fold instances, so nothing ships hidden — see
 * useRevealArm.
 */
export function Stagger({
  stagger = 0.08,
  delayChildren = 0,
  as = "div",
  children,
  ...rest
}: StaggerProps) {
  const { ref, controls } = useRevealArm<HTMLDivElement>();
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag
      ref={ref}
      variants={staggerContainer(stagger, delayChildren)}
      initial={false}
      animate={controls}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

type StaggerItemProps = {
  as?: "div" | "li" | "span" | "p";
} & Omit<HTMLMotionProps<"div">, "variants">;

/** A single staggered child. Must live inside <Stagger>. */
export function StaggerItem({ as = "div", children, ...rest }: StaggerItemProps) {
  const reduced = useReducedMotion() ?? false;
  const MotionTag = motion[as] as typeof motion.div;
  return (
    <MotionTag variants={staggerItem(reduced)} {...rest}>
      {children}
    </MotionTag>
  );
}
