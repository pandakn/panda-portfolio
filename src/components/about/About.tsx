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
      <div className="about-photo">
        <Image
          src="/me.jpg"
          alt="Keem taking a photo in a round mirror"
          width={400}
          height={400}
          sizes="(max-width: 640px) 220px, 320px"
        />
        <span className="photo-caption">A person behind the pixels.</span>
        <span className="photo-star" aria-hidden="true">
          ✳
        </span>
      </div>
      <div className="about-copy">
        <p className="eyebrow">A little about me</p>
        <h2 id="human-heading">
          Curious mind.
          <br />
          Full browser.
        </h2>
        <p>
          I&apos;m Natthawut, but you can call me Keem. I&apos;m a software
          engineer who enjoys turning a &quot;what if?&quot; into something you
          can actually use.
        </p>
        <p>
          Sometimes that&apos;s a better way to practice guitar. Sometimes
          it&apos;s turning a photo into tiny bricks. I learn by making things
          and seeing where the next idea goes.
        </p>
        <a
          className="text-link"
          href={SITE_LINKS.profiles.linkedin}
          target="_blank"
          rel="noopener noreferrer"
        >
          Find me on LinkedIn <span aria-hidden="true">↗</span>
        </a>
      </div>
    </section>
  );
}
