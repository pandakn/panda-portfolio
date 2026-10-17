"use client";

import dynamic from "next/dynamic";
import RoomLoading from "./RoomLoading";

const DeskScene = dynamic(() => import("./DeskScene"), {
  ssr: false,
  loading: () => <RoomLoading />,
});

export default function Hero() {
  return (
    <section className="workbench-hero" aria-labelledby="hero-title">
      <div className="hero-meta">
        <span>THE PERSONAL WORKSPACE OF NATTHAWUT KLANGYOD</span>
        <span>IDEAS → CODE → REAL THINGS</span>
      </div>
      <div className="studio-intro">
        <div className="studio-copy">
          <div className="hello-label">
            Hey, I’m Keem <span aria-hidden="true">↘</span>
          </div>
          <h1 id="hero-title">
            A LITTLE
            <br />
            <span className="making">CURIOUS.</span>
            <br />A LOT OF <span className="fun-word">FUN.</span>
          </h1>
          <p>
            I’m a software developer making useful tools and playful
            experiments. Usually right here, at this desk.
          </p>
          <div className="studio-actions">
            <a className="primary-link" href="#project">
              Explore my work <span aria-hidden="true">↓</span>
            </a>
            <a
              className="text-link"
              href="https://ntthwt.notion.site/Natthawut-Klangyod-3dc1098ae5084158b157c78ff809f9c3?pvs=4"
              target="_blank"
              rel="noopener noreferrer"
            >
              My résumé ↗
            </a>
          </div>
        </div>
        <div className="studio-model">
          <div className="model-heading">
            <span>FIG. 01 / MY LITTLE CORNER</span>
            <span aria-hidden="true">✳</span>
          </div>
          <DeskScene />
          <p className="model-note">
            Make yourself at home. <span>Drag to look around ↗</span>
          </p>
        </div>
      </div>
      <div className="hero-footnote">
        <span>
          <i /> SOFTWARE DEVELOPER
        </span>
        <span>BUILT WITH CARE. AND A LITTLE CHAOS.</span>
        <a href="#project">THE PROJECT BOARD IS JUST BELOW ↓</a>
      </div>
    </section>
  );
}
