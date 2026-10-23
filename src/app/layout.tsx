import type { Metadata } from "next";
import { DM_Sans, DM_Serif_Display } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/nav-bar/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/Footer";
import SmoothScroll from "@/components/smooth-scroll/SmoothScroll";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const displayFont = DM_Serif_Display({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keem Natthawut - Software Engineer Portfolio",
  description:
    "Welcome to Keem's portfolio! Explore my projects and experience as a Software Engineer.",
  icons: {
    icon: { url: "/avatar-smile.svg", type: "image/svg+xml", sizes: "any" },
  },
  keywords: [
    "portfolio",
    "resume",
    "cv",
    "web portfolio",
    "software engineer",
    "projects",
    "experience",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          bodyFont.variable,
          displayFont.variable,
          "min-h-screen antialiased",
        )}
      >
        <SmoothScroll>
          <div className="page-shell">
            <Navbar />
            {children}
            <Footer />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
