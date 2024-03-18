import { cn } from "@/lib/utils";
import { Variants, motion } from "framer-motion";
import { Github } from "lucide-react";
import Link from "next/link";

const cardVariants: Variants = {
  offscreen: {
    y: 80,
    opacity: 0,
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "keyframes",
      duration: 0.2,
    },
  },
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-7xl grid-cols-1 gap-4 border-transparent md:auto-rows-[18rem] md:grid-cols-3",
        className,
      )}
    >
      {children}
    </div>
  );
};

export interface BentoGridItemProps {
  className?: string;
  title?: string | React.ReactNode;
  description?: string | React.ReactNode;
  header?: React.ReactNode;
  githubLink: string;
  webUrl?: string;
  techStack?: React.ReactNode;
}

export const BentoGridItem = ({
  className,
  title,
  description,
  header,
  techStack,
  githubLink,
  webUrl,
}: BentoGridItemProps) => {
  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true }}
      variants={cardVariants}
      className={cn(
        "group/bento row-span-2 flex flex-col justify-between space-y-4 rounded-xl border border-gray-300 bg-white p-4 shadow-input transition duration-200 hover:shadow-xl dark:border-white/[0.2] dark:bg-black dark:shadow-none",
        className,
      )}
    >
      {header}
      <div className="transition duration-200 group-hover/bento:translate-x-2">
        <Link href={githubLink} target="_blank" className="inline-block">
          <Github className="opacity-50 hover:opacity-100" />
        </Link>
        <div className="mb-2 mt-2 text-lg font-bold text-neutral-600 dark:text-neutral-200">
          {webUrl ? (
            <Link href={webUrl} className="underline" target="_blank">
              {title}
            </Link>
          ) : (
            title
          )}
        </div>
        <div className=" text-sm font-normal text-neutral-600 dark:text-neutral-300">
          {description}
        </div>
        {techStack}
      </div>
    </motion.div>
  );
};
