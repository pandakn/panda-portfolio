import Image from "next/image";
import { SITE_LINKS } from "@/lib/links";

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="human-heading"
      tabIndex={-1}
    >
      <div className="about-collage">
        <div className="about-copy">
          <p className="eyebrow">A little about me</p>
          <h2 id="human-heading">
            Curious mind.
            <br />
            <em>Full browser.</em>
          </h2>
          <p>
            I&apos;m Natthawut, but you can call me Keem. I&apos;m a software
            engineer who enjoys turning a &quot;what if?&quot; into something you
            can actually use.
          </p>
          <div className="about-actions">
            <a
              className="text-link"
              href={SITE_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read my résumé (opens in a new tab)"
            >
              My résumé <span aria-hidden="true">↗</span>
            </a>
            <a
              className="text-link"
              href={SITE_LINKS.profiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Keem on LinkedIn (opens in a new tab)"
            >
              LinkedIn <span aria-hidden="true">↗</span>
            </a>
          </div>
          <svg
            className="about-doodle"
            viewBox="0 0 120 80"
            fill="none"
            aria-hidden="true"
            focusable="false"
          >
            <path d="M5 12C61 1 25 78 106 58m-12-8 13 8-10 12" />
          </svg>
        </div>

        <figure className="about-portrait">
          <Image
            src="/stickers/keem-camera.webp"
            alt="Keem looking through his camera"
            width={400}
            height={541}
            sizes="(max-width: 640px) 270px, (max-width: 1000px) 340px, 400px"
          />
          <figcaption>
            <span>Keem</span>
            <small>in real life.</small>
          </figcaption>
          <span className="about-portrait-star" aria-hidden="true">✳</span>
        </figure>

        <aside className="about-note" aria-labelledby="about-making-heading">
          <p className="eyebrow">How I work</p>
          <h3 id="about-making-heading">I learn by making.</h3>
          <p>
            A better way to practice guitar. A photo turned into tiny bricks.
            I follow an idea, build something, and see where it goes.
          </p>
          <span className="about-note-mark" aria-hidden="true">↗</span>
        </aside>

        <figure className="about-offline">
          <Image
            src="/stickers/keem-guitar.webp"
            alt=""
            width={360}
            height={472}
            sizes="130px"
          />
          <figcaption>
            <span className="eyebrow">Off the clock</span>
            <p>A guitar.<br />Or a camera.</p>
          </figcaption>
        </figure>

        <div className="about-side-effects">
          <p className="eyebrow">Where that curiosity leads</p>
          <a
            className="about-project-ticket about-project-ticket-music"
            href={SITE_LINKS.projects.fretFlow.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore Fret Flow, my guitar practice tool (opens in a new tab)"
          >
            <span>Guitar practice <span aria-hidden="true">→</span> <strong>Fret Flow</strong></span>
            <span aria-hidden="true">↗</span>
          </a>
          <a
            className="about-project-ticket about-project-ticket-photos"
            href={SITE_LINKS.projects.brickr.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore brickr, my photo to brick art tool (opens in a new tab)"
          >
            <span>Camera roll <span aria-hidden="true">→</span> <strong>brickr</strong></span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  );
}
