"use client";

import { ReactLenis } from "lenis/react";
import {
  createContext,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

const motionQuery = "(prefers-reduced-motion: reduce)";
const MotionContext = createContext({
  reduced: false,
  systemReduced: false,
  toggle: () => {},
});

function subscribeToMotion(callback: () => void) {
  const query = window.matchMedia(motionQuery);
  query.addEventListener("change", callback);
  return () => query.removeEventListener("change", callback);
}

function getMotionPreference() {
  return window.matchMedia(motionQuery).matches;
}

export function useMotionPreference() {
  return useContext(MotionContext);
}

export default function SmoothScroll({
  children,
}: {
  children: React.ReactNode;
}) {
  const systemReduced = useSyncExternalStore(
    subscribeToMotion,
    getMotionPreference,
    () => false,
  );
  const [manualReduced, setManualReduced] = useState(false);
  const reduced = systemReduced || manualReduced;
  const options = useMemo(
    () => ({
      autoRaf: true,
      anchors: true,
      lerp: reduced ? 1 : 0.1,
      smoothWheel: !reduced,
      syncTouch: false,
      respectReducedMotion: true,
    }),
    [reduced],
  );

  return (
    <MotionContext.Provider
      value={{
        reduced,
        systemReduced,
        toggle: () => setManualReduced((value) => !value),
      }}
    >
      <ReactLenis root options={options} />
      <div className={reduced ? "motion-reduced" : undefined}>{children}</div>
    </MotionContext.Provider>
  );
}

export function MotionToggle() {
  const { reduced, systemReduced, toggle } = useMotionPreference();
  return (
    <button
      type="button"
      className="motion-toggle"
      aria-pressed={reduced}
      onClick={toggle}
      disabled={systemReduced}
    >
      <span className="motion-indicator" aria-hidden="true" />
      {systemReduced ? "Reduced motion (system)" : "Reduce motion"}
    </button>
  );
}
