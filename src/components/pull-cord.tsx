"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { Moon, Sun } from "lucide-react";
import {
  motion,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { toggleTheme, useAppearance } from "@/lib/theme";
import { cn } from "@/lib/utils";

const WIDTH = 72;
const REST = 58;
const MAX_PULL = 56;
const THRESHOLD = 18;
const HANDLE_SIZE = 48;
const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

type Drag = { pointerId: number; x: number; y: number; activated: boolean };

export function PullCord({ className }: { className?: string }) {
  const { theme } = useAppearance();
  const reduceMotion = useReducedMotion();
  const drag = useRef<Drag | null>(null);
  const suppressClick = useRef(false);
  const [gesture, setGesture] = useState<"idle" | "pulling" | "switched">(
    "idle",
  );
  const x = useSpring(0, { duration: 0.5, bounce: 0.2 });
  const y = useSpring(0, { duration: 0.5, bounce: 0.2 });
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
    setGesture("idle");
    if (reduceMotion) {
      x.jump(0);
      y.jump(0);
    } else {
      x.set(0);
      y.set(0);
    }
  }

  function move(event: PointerEvent<HTMLButtonElement>) {
    const active = drag.current;
    if (!active || event.pointerId !== active.pointerId) return;
    const dx = event.clientX - active.x;
    const dy = event.clientY - active.y;
    if (Math.hypot(dx, dy) > 6) suppressClick.current = true;
    x.jump(clamp(dx, -24, 24));
    y.jump(clamp(dy, 0, MAX_PULL));
    if (!active.activated && dy >= THRESHOLD) {
      active.activated = true;
      suppressClick.current = true;
      setGesture("switched");
      toggleTheme();
    }
  }

  useEffect(() => {
    function cancel() {
      drag.current = null;
      suppressClick.current = true;
      setGesture("idle");
      x.jump(0);
      y.jump(0);
    }
    window.addEventListener("blur", cancel);
    return () => window.removeEventListener("blur", cancel);
  }, [x, y]);

  return (
    <div
      className={cn(
        "group pointer-events-none relative h-28 w-[72px] shrink-0 select-none",
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
        title="Give the cord a small tug, or click, to switch theme"
        style={{
          top: REST - HANDLE_SIZE / 2,
          left: WIDTH / 2 - HANDLE_SIZE / 2,
          transform: handleTransform,
        }}
        className="pointer-events-auto absolute flex h-12 w-12 cursor-grab touch-none items-center justify-center rounded-full text-foreground outline-offset-4 focus-visible:outline-2 focus-visible:outline-ring active:cursor-grabbing"
        onPointerDown={(event) => {
          if (!event.isPrimary || event.button !== 0 || drag.current) return;
          suppressClick.current = false;
          drag.current = {
            pointerId: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            activated: false,
          };
          setGesture("pulling");
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={move}
        onPointerUp={(event) => {
          if (drag.current?.pointerId !== event.pointerId) return;
          move(event);
          reset();
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
        <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-background shadow-sm dark:border-[var(--ochre)] dark:bg-[var(--ochre)] dark:text-[#28241e]">
          <Sun size={14} className="hidden dark:block" aria-hidden="true" />
          <Moon size={14} className="dark:hidden" aria-hidden="true" />
        </span>
      </motion.button>
      <span
        aria-hidden="true"
        className={cn(
          "absolute top-[108px] left-1/2 -translate-x-1/2 text-[11px] whitespace-nowrap text-muted-foreground transition-opacity duration-150 group-focus-within:opacity-100 group-hover:opacity-100 motion-reduce:transition-none",
          gesture === "idle" ? "opacity-0" : "opacity-100",
        )}
      >
        {gesture === "switched" ? "Switched!" : "Tug or click"}
      </span>
    </div>
  );
}
