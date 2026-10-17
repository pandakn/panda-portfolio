"use client";

import { useRef, type PointerEvent } from "react";
import { Moon, Sun } from "lucide-react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { toggleTheme, useAppearance } from "@/lib/theme";
import { cn } from "@/lib/utils";

const WIDTH = 72;
const REST = 58;
const MAX_PULL = 100;
const THRESHOLD = 48;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

type Drag = { pointerId: number; x: number; y: number };

export function PullCord({ className }: { className?: string }) {
  const { theme } = useAppearance();
  const reduceMotion = useReducedMotion();
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const pullX = useMotionValue(0);
  const pullY = useMotionValue(0);
  const springX = useSpring(pullX, { duration: 0.5, bounce: 0.2 });
  const springY = useSpring(pullY, { duration: 0.5, bounce: 0.2 });
  const x = reduceMotion ? pullX : springX;
  const y = reduceMotion ? pullY : springY;
  const cord = useTransform(() => {
    const bx = WIDTH / 2 + x.get();
    const by = REST + y.get();
    return `M ${WIDTH / 2} 0 Q ${WIDTH / 2 + x.get() * 0.55} ${by * 0.55} ${bx} ${by}`;
  });
  const handleTransform = useTransform(
    () => `translate(${x.get()}px, ${y.get()}px)`,
  );

  function reset() {
    drag.current = null;
    pullX.set(0);
    pullY.set(0);
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    if (!active || event.pointerId !== active.pointerId) return;
    const dx = event.clientX - active.x;
    const dy = event.clientY - active.y;
    if (Math.hypot(dx, dy) > 6) suppressClick.current = true;
    pullX.set(clamp(dx, -24, 24));
    pullY.set(clamp(dy, 0, MAX_PULL));
  }

  return (
    <div
      className={cn(
        "pointer-events-none relative h-28 w-[72px] shrink-0 select-none",
        className,
      )}
    >
      <svg
        width={WIDTH}
        height={REST + MAX_PULL + 28}
        className="absolute top-0 left-0 overflow-visible text-foreground"
        fill="none"
        aria-hidden="true"
      >
        <circle
          cx={WIDTH / 2}
          cy={2}
          r={4}
          fill="currentColor"
          opacity={0.35}
        />
        <motion.path
          d={cord}
          stroke="currentColor"
          strokeOpacity={0.45}
          strokeWidth={2}
          strokeLinecap="round"
        />
      </svg>
      <motion.button
        type="button"
        aria-label="Dark theme"
        aria-pressed={theme === "dark"}
        title="Pull down or click to switch theme"
        style={{
          top: REST - 22,
          left: WIDTH / 2 - 22,
          transform: handleTransform,
        }}
        className="pointer-events-auto absolute flex h-11 w-11 cursor-grab touch-none items-center justify-center rounded-full text-foreground outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring active:cursor-grabbing"
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0 || drag.current) return;
          suppressClick.current = false;
          drag.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={move}
        onPointerUp={(event) => {
          if (drag.current?.pointerId !== event.pointerId) return;
          move(event);
          const shouldToggle = pullY.get() >= THRESHOLD;
          reset();
          if (shouldToggle) toggleTheme();
        }}
        onPointerCancel={() => {
          suppressClick.current = true;
          reset();
        }}
        onLostPointerCapture={reset}
        onBlur={() => {
          suppressClick.current = true;
          reset();
        }}
        onClick={(event) => {
          if (event.detail === 0 || !suppressClick.current) toggleTheme();
          suppressClick.current = false;
        }}
      >
        <span className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-background shadow-sm dark:border-amber-200/40 dark:bg-amber-100 dark:text-amber-950">
          <Sun size={14} className="hidden dark:block" aria-hidden="true" />
          <Moon size={14} className="dark:hidden" aria-hidden="true" />
        </span>
      </motion.button>
    </div>
  );
}
