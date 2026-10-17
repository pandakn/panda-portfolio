import type { Metadata } from "next";
import { DM_Sans, Barlow_Condensed, Caveat } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/nav-bar/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/Footer";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const displayFont = Barlow_Condensed({
  weight: ["700", "800"],
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const handwritingFont = Caveat({
  subsets: ["latin"],
  variable: "--font-hand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keem Natthawut - Software Engineer Portfolio",
  description:
    "Welcome to Keem's portfolio! Explore my projects and experience as a Software Engineer.",
  icons: "/me.svg",
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
          handwritingFont.variable,
          "min-h-screen antialiased",
        )}
      >
        <div className="page-shell">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
