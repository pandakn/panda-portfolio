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
            <h2 id="work-heading">
              Things I’ve made
              <span className="pink-star" aria-hidden="true">
                ✳
              </span>
            </h2>
          </div>
        </div>
        <div className="cutting-mat">
          <div className="mat-ruler" aria-hidden="true" />
          <div className="collage-grid">
            {projectsData.map((project, index) => (
              <article
                key={project.title}
                className={`work-paper paper-${index + 1}`}
              >
                <span className="tape" aria-hidden="true" />
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
                      Code ↗
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
          <div className="mat-bottom">
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
