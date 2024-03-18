"use client";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Mail, StickyNote } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import HeroImage from "/public/hero.svg";
import { motion } from "framer-motion";

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
  return (
    <div className="md:flex md:items-center md:gap-x-10">
      <div className="md:w-1/2">
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ bounce: 0.25, type: "keyframes" }}
        >
          <RoughNotationGroup show={true}>
            <h1 className=" text-4xl font-bold md:text-4xl lg:text-6xl">
              <RoughNotation
                type="highlight"
                color="#E5D4FF"
                animationDelay={300}
              >
                {heroTexts.name}
              </RoughNotation>
            </h1>
            <div className="my-6 text-xl">
              {heroTexts.introduce.first}
              <RoughNotation type="circle" strokeWidth={2} color="#69d2e7">
                <p className="inline-block px-2">
                  {heroTexts.introduce.second}
                </p>
              </RoughNotation>
              <RoughNotation type="underline" strokeWidth={3} color="#E6A4B4">
                <p className="inline-block pr-2">{heroTexts.introduce.third}</p>
              </RoughNotation>
              {heroTexts.introduce.fourth}
            </div>
          </RoughNotationGroup>
        </motion.div>

        {/* button */}
        <motion.div
          initial={{ x: -80, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          className="flex gap-x-6 py-4"
        >
          {buttonLinks.map(({ title, href, icon }, idx) => (
            <Link key={idx} href={href} target="_blank">
              <button className="text-neutarl-700 flex items-center gap-x-1 rounded-md border border-black bg-white px-4 py-2 text-sm font-semibold uppercase transition duration-200 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] md:gap-x-2">
                <i className="h-5 w-5 md:h-6 md:w-6">{icon}</i>
                {title}
              </button>
            </Link>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        className="w-0 md:w-1/2"
      >
        <AspectRatio ratio={4 / 3}>
          <Image className="hidden md:block" src={HeroImage} alt="hero" fill />
        </AspectRatio>
      </motion.div>
    </div>
  );
};

export default Hero;
