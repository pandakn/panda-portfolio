"use client";

import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY } from "./theme-init";

type Theme = "light" | "dark";
type Appearance = { theme: Theme; lightOn: boolean };

const serverSnapshot: Appearance = { theme: "light", lightOn: false };
let snapshot = serverSnapshot;
let initialized = false;
let preference: Theme | null = null;
const listeners = new Set<() => void>();

function readPreference(): Theme | null {
  try {
    const value = localStorage.getItem(THEME_STORAGE_KEY);
    return value === "light" || value === "dark" ? value : null;
  } catch {
    return null;
  }
}

function publish(next: Appearance) {
  if (next.theme === snapshot.theme && next.lightOn === snapshot.lightOn) return;
  snapshot = next;
  listeners.forEach((listener) => listener());
}

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  publish({ theme, lightOn: theme === "dark" });
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const system = window.matchMedia("(prefers-color-scheme: dark)");
  if (!initialized) {
    initialized = true;
    preference = readPreference();
    applyTheme(preference ?? (system.matches ? "dark" : "light"));
  } else {
    document.documentElement.classList.toggle("dark", snapshot.theme === "dark");
  }
  function systemChanged() {
    if (preference === null) applyTheme(system.matches ? "dark" : "light");
  }
  function storageChanged(event: StorageEvent) {
    if (event.key !== THEME_STORAGE_KEY && event.key !== null) return;
    preference = readPreference();
    applyTheme(preference ?? (system.matches ? "dark" : "light"));
  }
  system.addEventListener("change", systemChanged);
  window.addEventListener("storage", storageChanged);
  return () => {
    listeners.delete(listener);
    system.removeEventListener("change", systemChanged);
    window.removeEventListener("storage", storageChanged);
  };
}

export function toggleTheme() {
  preference = snapshot.theme === "dark" ? "light" : "dark";
  try {
    localStorage.setItem(THEME_STORAGE_KEY, preference);
  } catch {
    // The controls still work when browser storage is unavailable.
  }
  applyTheme(preference);
}

export function toggleLightbar() {
  publish({ ...snapshot, lightOn: !snapshot.lightOn });
}

export function useAppearance() {
  return useSyncExternalStore(subscribe, () => snapshot, () => serverSnapshot);
}
