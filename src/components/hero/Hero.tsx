"use client";

import { Mail, StickyNote } from "lucide-react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { motion, useReducedMotion } from "framer-motion";

const DeskScene = dynamic(() => import("./DeskScene"), {
  ssr: false,
  loading: () => (
    <div
      className="aspect-[1.15] w-full bg-[url('/desk-preview.webp')] bg-contain bg-center bg-no-repeat"
      role="img"
      aria-label="Isometric model of my desk"
    />
  ),
});

const heroTexts = {
  name: "Hey, I'm Keem.",
  introduce: {
    first: `I'm a`,
    second: "Software Developer",
    third: `who loves fun projects!`,
    fourth: `Let's start our coding journey together`,
  },
};

const buttonLinks = [
  {
    title: "resume",
    href: "https://ntthwt.notion.site/Natthawut-Klangyod-3dc1098ae5084158b157c78ff809f9c3?pvs=4",
    icon: <StickyNote className="h-full w-full" />,
  },
  {
    title: "get in touch",
    href: "mailto:natthawut.klangyod@gmail.com",
    icon: <Mail className="h-full w-full" />,
  },
];

const Hero = () => {
  const t = "gd";
  const reducedMotion = useReducedMotion();
  return (
    <section
      aria-label="Introduction"
      className="flex flex-col gap-y-10 pb-8 md:-mr-6 md:flex-row md:items-center md:gap-x-0 lg:-mr-12"
    >
      <div className="relative z-10 md:w-[44%] md:shrink-0">
        <motion.div
          initial={reducedMotion ? false : { y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ bounce: 0.25, type: "keyframes" }}
        >
          <RoughNotationGroup show={true}>
            <h1 className=" text-4xl font-bold md:text-4xl lg:text-6xl">
              <RoughNotation
                type="highlight"
                color="#E5D4FF"
                animationDelay={300}
                animate={!reducedMotion}
              >
                {heroTexts.name}
              </RoughNotation>
            </h1>
            <div className="my-6 text-xl">
              {heroTexts.introduce.first}
              <RoughNotation
                type="circle"
                strokeWidth={2}
                color="#69d2e7"
                animate={!reducedMotion}
              >
                <p className="inline-block px-2">
                  {heroTexts.introduce.second}
                </p>
              </RoughNotation>
              <RoughNotation
                type="underline"
                strokeWidth={3}
                color="#E6A4B4"
                animate={!reducedMotion}
              >
                <p className="inline-block pr-2">{heroTexts.introduce.third}</p>
              </RoughNotation>
              {heroTexts.introduce.fourth}
            </div>
          </RoughNotationGroup>
        </motion.div>

        {/* button */}
        <motion.div
          initial={reducedMotion ? false : { x: -20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex gap-x-6 py-4"
        >
          {buttonLinks.map(({ title, href, icon }, idx) => (
            <Link
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-x-1 rounded-md border border-black bg-white px-4 py-2 text-sm font-semibold uppercase text-neutral-700 transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 md:gap-x-2"
            >
              <i className="h-5 w-5 md:h-6 md:w-6">{icon}</i>
              {title}
            </Link>
          ))}
        </motion.div>
      </div>

      <div className="w-full min-w-0 md:w-[56%]">
        <DeskScene />
      </div>
    </section>
  );
};

export default Hero;
