import type { Metadata } from "next";
import { DM_Sans, Fraunces } from "next/font/google";
import "./globals.css";

import Navbar from "@/components/nav-bar/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/Footer";
import { themeInitScript } from "@/lib/theme-init";

const bodyFont = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const displayFont = Fraunces({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Keem Natthawut - Software Developer Portfolio",
  description:
    "Welcome to Keem's portfolio! Explore my projects and experience as a Software Developer.",
  icons: "/me.svg",
  keywords: [
    "portfolio",
    "resume",
    "cv",
    "web portfolio",
    "software developer",
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
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body
        className={cn(
          bodyFont.variable,
          displayFont.variable,
          "min-h-screen antialiased",
        )}
      >
        <div className="page-shell mx-auto max-w-6xl px-6">
          <Navbar />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
