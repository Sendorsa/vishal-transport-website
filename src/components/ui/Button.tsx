"use client";

import { motion, useReducedMotion } from "framer-motion";
import { easing } from "@/lib/motion";
import { Icon } from "./Icon";

type Variant = "fill" | "line";

const base =
  "inline-flex items-center justify-center gap-3 rounded-pill font-semibold transition-colors";
const sizes = {
  md: "h-14 px-9 text-base",
  sm: "h-11 px-6 text-sm",
};
const variants: Record<Variant, string> = {
  fill: "bg-ink text-bg hover:bg-acc hover:shadow-gold",
  line: "border border-hair text-ink hover:border-acc hover:text-acc",
};

type ButtonProps = {
  variant?: Variant;
  size?: keyof typeof sizes;
  /** Show the trailing arrow that slides on hover. */
  arrow?: boolean;
  children: React.ReactNode;
  className?: string;
  /** Render as an anchor when set, otherwise a submit/button element. */
  href?: string;
  type?: "button" | "submit";
  onClick?: () => void;
};

/**
 * Premium CTA. On hover: lifts + scales to 1.02, arrow slides right,
 * soft shadow and smooth colour transition. Reduced-motion → colour only.
 * Renders as an <a> when `href` is provided, otherwise a <button>.
 */
export function Button({
  variant = "fill",
  size = "md",
  arrow = false,
  className = "",
  children,
  href,
  type,
  onClick,
}: ButtonProps) {
  const reduced = useReducedMotion() ?? false;
  const cls = `${base} ${sizes[size]} ${variants[variant]} ${className}`;

  const hoverProps = reduced
    ? {}
    : {
        whileHover: { scale: 1.02, y: -2 },
        whileTap: { scale: 0.99 },
        transition: { duration: 0.35, ease: easing.gentle },
      };

  const content = (
    <>
      {children}
      {arrow && (
        <motion.span
          className="inline-flex"
          variants={{
            rest: { x: 0 },
            hover: { x: reduced ? 0 : 4 },
          }}
        >
          <Icon name="arrow" className="h-4 w-4" />
        </motion.span>
      )}
    </>
  );

  if (href) {
    return (
      <motion.a
        href={href}
        onClick={onClick}
        className={cls}
        initial="rest"
        whileHover="hover"
        {...hoverProps}
      >
        {content}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type ?? "button"}
      onClick={onClick}
      className={cls}
      initial="rest"
      whileHover="hover"
      {...hoverProps}
    >
      {content}
    </motion.button>
  );
}
