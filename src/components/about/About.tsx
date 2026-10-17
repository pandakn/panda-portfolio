import Image from "next/image";

export default function About() {
  return (
    <section
      id="about"
      className="about-section"
      aria-labelledby="human-heading"
    >
      <div className="section-heading">
        <div>
          <span className="eyebrow">02 / THE HUMAN BEHIND THE TABS</span>
          <h2 id="human-heading">
            A little about me
            <span className="pink-star" aria-hidden="true">
              ✳
            </span>
          </h2>
        </div>
        <p className="hand-note">
          A few things that
          <br />
          make me, me. ↙
        </p>
      </div>
      <div className="cork-frame">
        <div className="cork-board">
          <figure className="board-portrait board-paper">
            <span className="board-pin" aria-hidden="true" />
            <Image
              src="/me.jpg"
              alt="Keem taking a photo in a round mirror"
              width={400}
              height={400}
              sizes="(max-width: 700px) 70vw, 280px"
            />
            <figcaption>
              <span>hello, I’m</span> KEEM
              <span className="portrait-doodle" aria-hidden="true">
                ☺
              </span>
            </figcaption>
            <div className="photo-barcode" aria-hidden="true" />
            <p>NATTHAWUT KLANGYOD / SOFTWARE DEVELOPER</p>
          </figure>

          <article className="board-bio board-paper">
            <span className="board-pin" aria-hidden="true" />
            <span className="note-kicker">A NOTE TO THE INTERNET</span>
            <h3>
              Curious mind.
              <br />
              Full browser.
            </h3>
            <p>
              I’m Natthawut, but you can call me Keem. I’m a software developer
              who enjoys turning “what if?” into something you can actually use.
            </p>
            <p>
              Sometimes that’s a better way to practice guitar. Sometimes it’s
              turning a photo into tiny bricks. I learn by making things and
              seeing where the next idea goes.
            </p>
            <span className="note-signature">
              See you down the next rabbit hole,
              <br />
              <b>Keem</b>
            </span>
          </article>

          <div className="board-music board-paper">
            <span className="tape" aria-hidden="true" />
            <span className="note-kicker">ON REPEAT</span>
            <div className="vinyl-record" aria-hidden="true">
              <span>♪</span>
            </div>
            <h3>
              A little music.
              <br />A little code.
            </h3>
            <p>
              Guitar practice meets
              <br />
              side-project energy.
            </p>
          </div>

          <div className="curiosity-sticker" aria-hidden="true">
            <span>FOLLOW YOUR</span>
            <b>curiosity</b>
            <span>SEE WHAT HAPPENS</span>
          </div>

          <a
            className="board-ticket"
            href="https://www.linkedin.com/in/ntthwt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ticket-edge">ADMIT ONE</span>
            <span className="ticket-body">
              <span className="note-kicker">LET’S CONNECT</span>
              <strong>Internet friends club</strong>
              <span>
                Find me on LinkedIn <span aria-hidden="true">↗</span>
              </span>
            </span>
            <span className="ticket-star" aria-hidden="true">
              ✳
            </span>
          </a>

          <figure className="board-desk board-paper">
            <span className="tape" aria-hidden="true" />
            <div>
              <Image
                src="/desk-preview.webp"
                alt="Keem’s illustrated desk with a keyboard, speakers, and monitor"
                width={400}
                height={350}
                sizes="(max-width: 700px) 65vw, 280px"
              />
            </div>
            <figcaption>where the “what ifs” happen.</figcaption>
          </figure>
          <span className="board-flower" aria-hidden="true">
            ✿
          </span>
          <span className="board-caption">SMALL THINGS. BIG CURIOSITY.</span>
        </div>
      </div>
    </section>
  );
}
