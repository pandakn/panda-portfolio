import type { Metadata } from "next";
import { Inter, Open_Sans } from "next/font/google";
import "./globals.css";

// components
import Navbar from "@/components/nav-bar/Navbar";
import { cn } from "@/lib/utils";
import Footer from "@/components/footer/Footer";

const openSans = Open_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keem Natthawut - Software Developer Portfolio",
  description:
    "Welcome to Keem's portfolio! Explore my projects and experience as a Software Developer.",
  icons: "logo.svg",
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
    <html lang="en">
      <body
        className={cn(
          openSans.className,
          "mx-auto my-5 min-h-screen max-w-6xl  bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] px-6 [background-size:16px_16px]",
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
