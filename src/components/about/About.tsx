import Image from "next/image";
import MeImage from "/public/me.jpg";
import SketchMark from "@/components/ui/SketchMark";

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="about-heading"
    >
      <div className="about-grid">
        <div className="portrait-wrap">
          <div className="portrait-frame">
            <Image
              src={MeImage}
              alt="Keem Natthawut"
              fill
              sizes="(max-width: 767px) 70vw, 320px"
              className="portrait-image"
            />
          </div>
          <div className="portrait-caption">
            <span>Natthawut Klangyod</span>
            <span className="palette-swatches" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
          </div>
        </div>
        <div className="about-copy">
          <h2 id="about-heading" className="section-title">
            <SketchMark color="terracotta">Curiosity,</SketchMark>
            <br />
            with a keyboard.
          </h2>
          <p>
            I’m a software developer who loves making things for the web. From
            useful everyday tools to playful side projects, I enjoy turning an
            idea into something that works.
          </p>
          <p>
            I’m always experimenting with new technology, learning as I go, and
            finding small ways to make the next thing better.
          </p>
          <a href="#project" className="text-link">
            A few things I’ve made <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
