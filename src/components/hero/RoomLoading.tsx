import { MonitorOff } from "lucide-react";
import styles from "./desk.module.css";

function TinyRoom() {
  return (
    <svg
      className={styles.tinyRoom}
      viewBox="0 0 280 230"
      fill="none"
      stroke="var(--loader-ink)"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <ellipse
        cx="140"
        cy="207"
        rx="94"
        ry="12"
        fill="currentColor"
        stroke="none"
        opacity=".08"
      />
      <g className={styles.tinyFloor}>
        <path d="m37 161 103-50 103 50-103 50Z" fill="var(--loader-floor)" />
        <path
          d="m37 161 103 50 103-50v7l-103 50-103-50Z"
          fill="var(--loader-edge)"
        />
        <path d="m63 174 103-50m-77 62 103-49m-77 62 103-50" opacity=".25" />
      </g>
      <g className={styles.tinyWalls}>
        <path d="M37 161V79L140 29v82Z" fill="var(--loader-wall)" />
        <path d="M140 29 243 79v82l-103-50Z" fill="var(--loader-wall-side)" />
        <path d="M37 155 140 105l103 50" opacity=".3" />
        <path d="m55 89 21-10v29l-21 10Z" fill="var(--loader-paper)" />
        <path
          d="m60 105 11-5v5l-11 5Z"
          fill="var(--loader-sage)"
          stroke="none"
        />
        <ellipse
          cx="65"
          cy="93"
          rx="4"
          ry="5"
          fill="var(--loader-red)"
          stroke="none"
        />
      </g>
      <g className={styles.tinyDesk}>
        <path d="M119 112v45m88-3v32m30-47v32" strokeWidth="3" />
        <path d="m118 108 90 44 31-15-90-44Z" fill="var(--loader-wood)" />
        <path d="M118 108v5l90 44 31-15v-5l-31 15Z" fill="var(--loader-edge)" />
        <path d="m151 115 30 15-10 5-30-15Z" fill="var(--loader-paper)" />
        <path
          d="m151 119 21 10m-14-11-6 6m13-3-6 6m13-3-6 6"
          opacity=".35"
          strokeWidth="1"
        />
      </g>
      <g className={styles.tinyMonitor}>
        <path d="M188 116v14m-11 0 11 5 11-5" strokeWidth="2.5" />
        <path d="m163 73 53 26v33l-53-26Z" fill="var(--loader-ink)" />
        <g transform="matrix(1 .5 0 1 167 80)">
          <rect
            width="45"
            height="25"
            rx="1"
            fill="var(--loader-screen)"
            stroke="none"
          />
          <g
            className={styles.tinyEyes}
            stroke="var(--loader-screen-ink)"
            strokeWidth="2.5"
          >
            <path d="M14 9v3m17-3v3" />
          </g>
          <path
            d="M18 17q5 6 10 0"
            stroke="var(--loader-screen-ink)"
            strokeWidth="1.5"
          />
          <path
            d="m3 4 4 2m-4 0 4-2"
            stroke="var(--loader-screen-ink)"
            strokeWidth=".75"
            opacity=".45"
          />
        </g>
        <path d="m163 70 54 27" stroke="var(--loader-wood)" strokeWidth="4" />
      </g>
      <g className={styles.tinyExtras}>
        <g transform="translate(69 116) rotate(17)">
          <path
            d="M0 19c-8-10-14 1-7 8-16 15 2 25 10 19 14 3 19-9 8-19 8-11-2-18-6-8Z"
            fill="var(--loader-red)"
          />
          <path
            d="M1 24c-8 0-4 7-5 11l9 5 4-9-4-7Z"
            fill="var(--loader-paper)"
            strokeWidth="1"
          />
          <path d="M1 29V-5h5v34" fill="var(--loader-wood)" />
          <path d="M3-5v43m-4 0h8" strokeWidth=".75" />
        </g>
        <path d="M115 166v19m-12 6 12-6 17 8m-17-8 17-4" strokeWidth="2.5" />
        <path d="m99 162 16-8 20 10-16 8Z" fill="var(--loader-paper)" />
        <path d="M100 139v19l16 8v-20Z" fill="var(--loader-paper)" />
        <path d="m104 145 8 4m-8 2 8 4" opacity=".3" />
        <circle
          cx="103"
          cy="191"
          r="2.5"
          fill="var(--loader-ink)"
          stroke="none"
        />
        <circle
          cx="132"
          cy="193"
          r="2.5"
          fill="var(--loader-ink)"
          stroke="none"
        />
        <circle
          cx="132"
          cy="181"
          r="2.5"
          fill="var(--loader-ink)"
          stroke="none"
        />
        <g transform="translate(220 131)">
          <path d="M5 1c10-1 9 9 0 7" />
          <path d="M-5 0v9c0 5 11 5 11 0V0" fill="var(--loader-paper)" />
          <ellipse rx="5.5" ry="2.5" fill="var(--loader-wood)" />
          <g className={styles.tinySteam} opacity=".6">
            <path d="M-1-7c-5-5 5-6 0-11m5 10c5-5-5-6 0-11" />
          </g>
        </g>
      </g>
      <g
        className={styles.tinySparkles}
        stroke="var(--loader-sage)"
        strokeWidth="2"
      >
        <path d="M32 46v10m-5-5h10m207-11v8m-4-4h8" />
      </g>
    </svg>
  );
}

export function RoomPlaceholder({
  state = "loading",
}: {
  state?: "loading" | "unavailable";
}) {
  return (
    <div className={styles.placeholder} role="status">
      {state === "loading" ? (
        <>
          <TinyRoom />
          <div className={styles.loadingCopy}>
            <span className={styles.loadingTitle}>
              One cozy corner, coming up.
            </span>
            <span className={styles.placeholderHint}>
              Even the cables need a moment.
            </span>
          </div>
          <span className={styles.loadingDots} aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
          <span className="sr-only">Loading the 3D room.</span>
        </>
      ) : (
        <>
          <MonitorOff size={24} strokeWidth={1.5} aria-hidden="true" />
          <span>The 3D room is unavailable.</span>
          <span className={styles.placeholderHint}>
            Try refreshing the page.
          </span>
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
