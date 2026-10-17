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
          <h2 id="human-heading">
            A little about me
            <span className="pink-star" aria-hidden="true">
              ✳
            </span>
          </h2>
        </div>
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
          </figure>

          <article className="board-bio board-paper">
            <span className="board-pin" aria-hidden="true" />
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
            <span className="note-signature">Keem</span>
          </article>

          <div className="board-music board-paper">
            <span className="tape" aria-hidden="true" />
            <div className="vinyl-record" aria-hidden="true">
              <span>♪</span>
            </div>
            <h3>
              A little music.
              <br />A little code.
            </h3>
          </div>

          <div className="curiosity-sticker" aria-hidden="true">
            <b>curiosity</b>
          </div>

          <a
            className="board-ticket"
            href="https://www.linkedin.com/in/ntthwt/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="ticket-body">
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
        </div>
      </div>
    </section>
  );
}
