import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

// components
import Navbar from "@/components/nav-bar/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/Footer";
import { themeInitScript } from "@/lib/theme-init";

const openSans = Open_Sans({ subsets: ["latin"] });

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
          openSans.className,
          "mx-auto my-5 min-h-screen max-w-6xl px-6",
          // "bg-[#F5EEE635]",
        )}
      >
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
