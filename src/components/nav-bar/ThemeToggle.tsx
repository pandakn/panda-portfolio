"use client";

import { Moon, Sun } from "lucide-react";
import { toggleTheme, useAppearance } from "@/lib/theme";

export default function ThemeToggle() {
  const { theme } = useAppearance();
  return (
    <button
      type="button"
      aria-label="Dark theme"
      aria-pressed={theme === "dark"}
      title={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      onClick={toggleTheme}
      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-border bg-background text-foreground transition-colors hover:bg-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none"
    >
      <Sun size={19} className="hidden dark:block" aria-hidden="true" />
      <Moon size={19} className="dark:hidden" aria-hidden="true" />
    </button>
  );
}
