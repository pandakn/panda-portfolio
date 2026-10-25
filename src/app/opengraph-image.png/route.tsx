import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

export const dynamic = "force-static";
const size = { width: 1200, height: 630 };

export function GET() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        width: "100%",
        height: "100%",
        padding: "64px 72px",
        background: "#f2ebdf",
        color: "#25261f",
        fontFamily: "sans-serif",
      }}
    >
      <div style={{ display: "flex", fontSize: 42, fontWeight: 700 }}>
        keem*
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ display: "flex", fontSize: 76, fontWeight: 700 }}>
          {SITE.author}
        </div>
        <div style={{ display: "flex", fontSize: 36, color: "#636657" }}>
          Software engineer. Web apps, music tools and experiments.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          paddingTop: 28,
          borderTop: "2px solid #adae9c",
          fontSize: 25,
        }}
      >
        <div style={{ display: "flex" }}>React · Next.js · TypeScript · Go</div>
        <div style={{ display: "flex" }}>{new URL(SITE.url).hostname}</div>
      </div>
    </div>,
    size,
  );
}
