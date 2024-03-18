"use client";

import { RoughNotation } from "react-rough-notation";
import ProjectList from "./ProjectList";
import { motion } from "framer-motion";

const Project = () => {
  return (
    <div id="project" className="relative my-32">
      <motion.h1
        initial={{ x: 100, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.25 }}
        viewport={{ once: true }}
        className="inline-block text-3xl font-bold uppercase md:text-4xl lg:text-6xl"
      >
        <RoughNotation type="underline" color="#D7E5CA" show strokeWidth={5}>
          What I Do.
        </RoughNotation>
      </motion.h1>
      <ProjectList />
    </div>
  );
};

export default Project;
