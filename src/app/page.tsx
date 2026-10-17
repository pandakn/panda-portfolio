import About from "@/components/about/About";
import Hero from "@/components/hero/Hero";
import { projectsData } from "@/components/project/data";
import Certifications from "@/components/certifications/Certifications";

export default function Home() {
  return (
    <main id="main-content">
      <Hero />

      <section
        id="project"
        className="work-section"
        aria-labelledby="work-heading"
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">01 / OFF THE DRAWING BOARD</span>
            <h2 id="work-heading">
              Things I’ve made
              <span className="pink-star" aria-hidden="true">
                ✳
              </span>
            </h2>
          </div>
          <p className="hand-note">
            A few ideas that escaped
            <br />
            my notes app. ↙
          </p>
        </div>
        <div className="cutting-mat">
          <div className="mat-ruler" aria-hidden="true">
            <span>0</span>
            <span>5</span>
            <span>10</span>
            <span>15</span>
            <span>20</span>
            <span>25</span>
            <span>30</span>
            <span>35</span>
            <span>40</span>
          </div>
          <div className="mat-caption">
            <span>KEEM’S PROJECT BOARD</span>
            <span>A1 / ALWAYS A WORK IN PROGRESS</span>
          </div>
          <div className="collage-grid">
            {projectsData.map((project, index) => (
              <article
                key={project.title}
                className={`work-paper paper-${index + 1}`}
              >
                <span className="tape" aria-hidden="true" />
                <div className="paper-top">
                  <span>EXPERIMENT / {String(index + 1).padStart(2, "0")}</span>
                  <span aria-hidden="true">✦</span>
                </div>
                <div className="paper-preview">{project.header}</div>
                <div className="paper-details">
                  <h3>
                    <a
                      href={project.webUrl ?? project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {project.title}
                      <span aria-hidden="true">↗</span>
                    </a>
                  </h3>
                  <p>{project.description}</p>
                  <div className="paper-bottom">
                    {project.techStack}
                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${project.title} source code on GitHub`}
                    >
                      SOURCE ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mat-bottom">
            <span>✂ CUT FROM CURIOSITY</span>
            <a
              href="https://github.com/pandakn"
              target="_blank"
              rel="noopener noreferrer"
            >
              More experiments on GitHub ↗
            </a>
          </div>
        </div>
      </section>

      <About />
      <Certifications />
    </main>
  );
}
