import Image from "next/image";
import Certifications from "@/components/certifications/Certifications";
import { SITE_LINKS } from "@/lib/links";

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="human-heading"
      tabIndex={-1}
    >
      <div className="about-board">
        <div className="board-intro pinned-paper">
          <p className="eyebrow">The person behind the pixels</p>
          <h2 id="human-heading">
            Hello,
            <br />
            I’m <em>Keem.</em>
          </h2>
          <p>
            I&apos;m Natthawut Klangyod, a software engineer. I build web apps
            and backend tools with React, Next.js, TypeScript and Go.
          </p>
          <div className="about-actions">
            <a
              className="text-link"
              href={SITE_LINKS.resume}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Read my résumé (opens in a new tab)"
            >
              My résumé ↗
            </a>
            <a
              className="text-link"
              href={SITE_LINKS.profiles.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Keem on LinkedIn (opens in a new tab)"
            >
              LinkedIn ↗
            </a>
          </div>
        </div>

        <figure className="board-photo board-selfie taped">
          <Image
            src="/about/portrait.webp"
            alt="Keem taking a relaxed mirror selfie at his desk"
            width={800}
            height={550}
            sizes="(max-width: 640px) 85vw, 400px"
          />
        </figure>
        <figure className="board-photo board-desk pinned-paper">
          <Image
            src="/about/desk.webp"
            alt="Keem’s desk with two monitors, a mechanical keyboard, and plants"
            width={650}
            height={867}
            sizes="(max-width: 640px) 42vw, 270px"
          />
        </figure>
        <figure className="board-photo board-sunlight taped">
          <Image
            src="/about/sunlight.webp"
            alt="Afternoon sunlight falling across Keem’s wooden desk"
            width={600}
            height={800}
            sizes="(max-width: 640px) 42vw, 250px"
          />
        </figure>
        <figure className="board-photo board-offline">
          <Image
            src="/about/offline.webp"
            alt="A moment outside with jeans, sneakers, and wired earphones"
            width={480}
            height={640}
            sizes="(max-width: 640px) 40vw, 190px"
          />
        </figure>

        <figure className="board-receipt taped">
          <Image
            src="/about/receipt.webp"
            alt="Keem’s music receipt: D’Angelo, Mac Ayres, Stevie Wonder, Jeff Bernat, Tom Misch, Daniel Caesar, and Mint Condition. Ten songs, 49 minutes and 42 seconds."
            width={680}
            height={1810}
            sizes="(max-width: 640px) 44vw, 200px"
          />
        </figure>
        <div className="board-guitar">
          <Image
            src="/about/guitar.webp"
            alt="Keem’s well-loved red electric guitar"
            width={650}
            height={931}
            sizes="(max-width: 640px) 42vw, 300px"
          />
        </div>
        <div className="board-note">
          <span className="eyebrow">Away from the keyboard</span>
          <p>
            One more song.
            <br />
            <em>Then I’ll get back to it.</em>
          </p>
          <a
            href={SITE_LINKS.projects.fretFlow.website}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Explore Fret Flow, my guitar practice tool (opens in a new tab)"
          >
            My guitar practice tool, Fret Flow ↗
          </a>
        </div>
        <Certifications />
        <div className="board-keepsakes" aria-hidden="true">
          <div className="scrap-title">
            <span>a little</span>
            <strong>about me.</strong>
          </div>
          <div className="scrap-music">
            <span>ANDANTE / 4:4</span>
            <svg viewBox="0 0 300 110" fill="none" focusable="false">
              <path
                d="M0 20H300M0 34H300M0 48H300M0 62H300M0 76H300"
                stroke="currentColor"
              />
              <g fill="currentColor">
                <ellipse
                  cx="35"
                  cy="62"
                  rx="8"
                  ry="5"
                  transform="rotate(-20 35 62)"
                />
                <ellipse
                  cx="83"
                  cy="48"
                  rx="8"
                  ry="5"
                  transform="rotate(-20 83 48)"
                />
                <ellipse
                  cx="125"
                  cy="55"
                  rx="8"
                  ry="5"
                  transform="rotate(-20 125 55)"
                />
                <ellipse
                  cx="169"
                  cy="41"
                  rx="8"
                  ry="5"
                  transform="rotate(-20 169 41)"
                />
                <ellipse
                  cx="218"
                  cy="34"
                  rx="8"
                  ry="5"
                  transform="rotate(-20 218 34)"
                />
                <ellipse
                  cx="262"
                  cy="48"
                  rx="8"
                  ry="5"
                  transform="rotate(-20 262 48)"
                />
              </g>
              <path
                d="M42 62V13M90 48V5M132 55V10M176 41V0M225 34V0M269 48V5M90 6L132 11M225 1L269 6"
                stroke="currentColor"
                strokeWidth="2"
              />
            </svg>
          </div>
          <div className="scrap-vinyl">
            <span>
              KEEM’S MIX
              <br />
              <small>vol. 01 / slow afternoons</small>
            </span>
          </div>
          <div className="scrap-camera">
            <span className="camera-brand">little moments, kept.</span>
            <div className="camera-screen">
              <Image
                src="/about/sunlight.webp"
                alt=""
                width={600}
                height={800}
                sizes="180px"
              />
            </div>
            <span className="camera-lens" />
            <span className="camera-flash" />
            <span className="camera-button" />
          </div>
          <div className="scrap-contact">
            <Image
              src="/about/portrait.webp"
              alt=""
              width={800}
              height={550}
              sizes="100px"
            />
            <Image
              src="/about/desk.webp"
              alt=""
              width={650}
              height={867}
              sizes="100px"
            />
            <Image
              src="/about/offline.webp"
              alt=""
              width={480}
              height={640}
              sizes="100px"
            />
          </div>
          <div className="scrap-postage">
            <span>
              KEEP
              <br />
              MAKING
            </span>
            <strong>✿</strong>
            <small>GOOD THINGS TAKE TIME</small>
          </div>
          <span className="scrap-flower">✿</span>
          <span className="scrap-heart">♥</span>
          <span className="scrap-star scrap-star-gold">★</span>
          <span className="scrap-star scrap-star-red">★</span>
          <div className="scrap-eyes">
            <i />
            <i />
          </div>
          <span className="scrap-word scrap-word-first">a work</span>
          <span className="scrap-word scrap-word-second">in progress.</span>
          <span className="scrap-ticket">
            ADMIT ONE
            <br />
            <strong>STAY CURIOUS</strong>
            <small>NO. 0023 · LIFETIME PASS</small>
          </span>
          <span className="board-label">
            ODDS, ENDS & THINGS I LOVE / KEEM’S NOTICEBOARD
          </span>
        </div>
      </div>
    </section>
  );
}
