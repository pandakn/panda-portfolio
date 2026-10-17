"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { RoughNotation } from "react-rough-notation";

type SketchMarkProps = {
  children: ReactNode;
  type?: "underline" | "circle";
  color?: "ochre" | "olive" | "terracotta";
};

export default function SketchMark({
  children,
  type = "underline",
  color = "ochre",
}: SketchMarkProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const visible = useInView(ref, { once: true });
  const reducedMotion = useReducedMotion();
  const [fontsReady, setFontsReady] = useState(false);

  useEffect(() => {
    let active = true;
    document.fonts.ready.then(() => {
      if (active) setFontsReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return (
    <span ref={ref} className="sketch-mark">
      <RoughNotation
        type={type}
        color={`var(--${color})`}
        show={visible && fontsReady}
        animate={!reducedMotion}
        animationDuration={650}
        animationDelay={180}
        strokeWidth={2}
        padding={type === "circle" ? [4, 7] : 3}
      >
        {children}
      </RoughNotation>
    </span>
  );
}
