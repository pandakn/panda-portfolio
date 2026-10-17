import { LoaderCircle, MonitorOff } from "lucide-react";
import styles from "./desk.module.css";

export function RoomPlaceholder({
  state = "loading",
}: {
  state?: "loading" | "unavailable";
}) {
  return (
    <div className={styles.placeholder} role="status">
      {state === "loading" ? (
        <>
          <LoaderCircle
            className={styles.spinner}
            size={24}
            strokeWidth={1.5}
            aria-hidden="true"
          />
          <span>Loading room...</span>
        </>
      ) : (
        <>
          <MonitorOff size={24} strokeWidth={1.5} aria-hidden="true" />
          <span>The 3D room is unavailable.</span>
          <span className={styles.placeholderHint}>Try refreshing the page.</span>
        </>
      )}
    </div>
  );
}

export default function RoomLoading() {
  return (
    <div className={styles.figure} aria-busy="true">
      <div className={styles.scene} />
      <RoomPlaceholder />
      <div
        className={`${styles.controls} ${styles.controlsPlaceholder}`}
        aria-hidden="true"
      />
    </div>
  );
}
