"use client";

import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import RoomLoading from "./RoomLoading";
import SketchMark from "@/components/ui/SketchMark";

const DeskScene = dynamic(() => import("./DeskScene"), {
  ssr: false,
  loading: () => <RoomLoading />,
});

export default function Hero() {
  const reducedMotion = useReducedMotion();
  return (
    <section aria-label="Introduction" className="intro-section">
      <motion.div
        className="intro-copy"
        initial={reducedMotion ? false : { y: 16, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="intro-title-wrap">
          <h1 className="intro-title">
            Hey, I’m
            <br />
            <span>
              <SketchMark>Keem.</SketchMark>
            </span>
          </h1>
          <svg
            className="atomic-star"
            viewBox="0 0 80 80"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M40 0 46 25 68 12 55 34 80 40 55 46 68 68 46 55 40 80 34 55 12 68 25 46 0 40 25 34 12 12 34 25Z" />
          </svg>
        </div>
        <p className="intro-description">
          I build websites and little tools that make everyday life easier.
          Sometimes, I just make things{" "}
          <SketchMark color="olive" type="circle">
            for fun.
          </SketchMark>
        </p>
        <div className="intro-actions">
          <Link
            href="mailto:natthawut.klangyod@gmail.com"
            className="button-primary"
          >
            Get in touch <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
          <Link
            href="https://ntthwt.notion.site/Natthawut-Klangyod-3dc1098ae5084158b157c78ff809f9c3?pvs=4"
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            My résumé <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
        <a href="#project" className="intro-work-link">
          Take a look around <ArrowDownRight size={17} aria-hidden="true" />
        </a>
      </motion.div>
      <div className="intro-room">
        <DeskScene />
      </div>
    </section>
  );
}
