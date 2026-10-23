"use client";

import { useLenis } from "lenis/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { featuredProjects } from "../project/data";
import { useMotionPreference } from "../smooth-scroll/SmoothScroll";
import Monitor from "./Monitor";

export default function Hero() {
  const [selected, setSelected] = useState(featuredProjects[0]);
  const [announcement, setAnnouncement] = useState("");
  const storyRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const { reduced } = useMotionPreference();
  const lenis = useLenis();

  useEffect(() => {
    const story = storyRef.current;
    const stage = stageRef.current;
    if (!story || !stage || reduced) return;
    let frame = 0;
    let start = 0;
    let travel = 0;
    const sync = () => {
      frame = 0;
      if (getComputedStyle(stage).position !== "sticky") return;
      const progress = Math.max(
        0,
        Math.min(0.999, (window.scrollY - start) / Math.max(1, travel)),
      );
      const next =
        featuredProjects[Math.floor(progress * featuredProjects.length)];
      if (next)
        setSelected((previous) => (previous.id === next.id ? previous : next));
    };
    const measure = () => {
      start = story.getBoundingClientRect().top + window.scrollY;
      travel = story.offsetHeight - stage.offsetHeight;
      sync();
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(sync);
    };
    const observer = new ResizeObserver(measure);
    observer.observe(story);
    observer.observe(stage);
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [reduced]);

  function selectProject(index: number) {
    const project = featuredProjects[index];
    if (!project) return;
    setSelected(project);
    setAnnouncement(`${project.title}. ${project.tagline}`);
    const story = storyRef.current;
    const stage = stageRef.current;
    if (
      !story ||
      !stage ||
      reduced ||
      getComputedStyle(stage).position !== "sticky"
    )
      return;
    const start = story.getBoundingClientRect().top + window.scrollY;
    const target =
      start +
      ((story.offsetHeight - stage.offsetHeight) * (index + 0.1)) /
        featuredProjects.length;
    if (lenis) lenis.scrollTo(target, { immediate: true });
    else window.scrollTo({ top: target, behavior: "instant" });
  }

  const selectedIndex = featuredProjects.indexOf(selected);

  return (
    <section
      ref={storyRef}
      id="featured"
      className="scroll-story"
      aria-labelledby="hero-title"
    >
      <div ref={stageRef} className="pin-stage">
        <h1 id="hero-title" className="hero-heading">
          Hey!
          <span className="sr-only"> I&apos;m Keem, a software engineer.</span>
        </h1>
        <div
          className="hero-photo-sticker hero-photo-camera"
          aria-hidden="true"
        >
          <Image
            src="/stickers/keem-camera.webp"
            alt=""
            width={400}
            height={541}
            loading="eager"
            draggable={false}
          />
        </div>
        <div
          className="hero-photo-sticker hero-photo-mirror"
          aria-hidden="true"
        >
          <Image
            src="/stickers/keem-mirror.webp"
            alt=""
            width={381}
            height={655}
            loading="eager"
            draggable={false}
          />
        </div>
        <div
          className="hero-photo-sticker hero-photo-headphones"
          aria-hidden="true"
        >
          <Image
            src="/stickers/keem-headphones.webp"
            alt=""
            width={360}
            height={413}
            loading="eager"
            draggable={false}
          />
        </div>
        <div className="hero-photo-sticker hero-photo-bag" aria-hidden="true">
          <Image
            src="/stickers/keem-bag.webp"
            alt=""
            width={360}
            height={630}
            loading="eager"
            draggable={false}
          />
        </div>
        <div
          className="hero-photo-sticker hero-photo-guitar"
          aria-hidden="true"
        >
          <Image
            src="/stickers/keem-guitar.webp"
            alt=""
            width={360}
            height={472}
            loading="eager"
            draggable={false}
          />
        </div>
        <Monitor selectedId={selected.id} />
        <div className="featured-copy">
          <div>
            <h2 className="featured-title">{selected.title}</h2>
            <p className="featured-subtitle">{selected.tagline}</p>
          </div>
          <a
            className="featured-link"
            href={selected.webUrl ?? selected.githubLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            {selected.webUrl ? "Explore" : "Source for"} {selected.title}
            <span aria-hidden="true">↗</span>
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        </div>
        <div className="feature-controls">
          <div
            className="project-picks"
            role="group"
            aria-label="Choose a featured project"
          >
            {featuredProjects.map((project, index) => (
              <button
                type="button"
                key={project.id}
                onClick={() => selectProject(index)}
                aria-label={`Show ${project.title}`}
                aria-controls="monitor-screen"
                aria-pressed={project.id === selected.id}
              >
                {String(index + 1).padStart(2, "0")}
              </button>
            ))}
          </div>
          <a className="browse-all" href="#project">
            All projects <span aria-hidden="true">↓</span>
          </a>
        </div>
      </div>
      <p className="sr-only" role="status">
        {announcement}
      </p>
    </section>
  );
}
