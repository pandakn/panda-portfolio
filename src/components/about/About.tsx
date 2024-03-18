"use client";

import Image from "next/image";
import { RoughNotation, RoughNotationGroup } from "react-rough-notation";
import { AspectRatio } from "../ui/aspect-ratio";
import MeImage from "/public/me.jpg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div id="about" className="relative my-24 md:my-32">
      <RoughNotationGroup show>
        <motion.h1
          initial={{ y: -100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.25 }}
          viewport={{ once: true }}
          className=" text-3xl font-bold uppercase md:text-4xl lg:text-6xl"
        >
          <RoughNotation
            type="circle"
            color="#FF7171"
            strokeWidth={4}
            animationDelay={250}
          >
            About Me.
          </RoughNotation>
        </motion.h1>
        <div className="my-10 flex flex-col items-center justify-center gap-x-10 gap-y-4 md:flex-row">
          <motion.div
            initial={{ x: -100, opacity: 0 }}
            whileInView={{
              x: 0,
              opacity: 1,
            }}
            transition={{ duration: 0.25, delay: 0.5 }}
            viewport={{ once: true }}
            className="w-4/5 md:w-1/2"
          >
            <AspectRatio ratio={1 / 1}>
              <Image
                className="rounded-lg grayscale duration-300 hover:grayscale-0 md:block"
                src={MeImage}
                alt="hero"
                fill
              />
            </AspectRatio>
          </motion.div>

          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            whileInView={{
              scale: 1,
              opacity: 1,
            }}
            viewport={{ once: true }}
            transition={{ duration: 0.25 }}
            className="w-full md:w-1/2"
          >
            <p className="text-balance text-center indent-4 text-xl md:text-2xl">
              Software developer driven by{" "}
              <RoughNotation type="underline" color="#B1B2FF" strokeWidth={3}>
                passion
              </RoughNotation>{" "}
              and{" "}
              <RoughNotation type="underline" color="#FFD1D1" strokeWidth={3}>
                innovation.
              </RoughNotation>{" "}
              Crafting engaging websites. Constantly experimenting with tech,
              fueled by passion for{" "}
              <RoughNotation type="box" color="#DE8971">
                improvement.
              </RoughNotation>
            </p>
          </motion.div>
        </div>
      </RoughNotationGroup>
    </div>
  );
};

export default About;
