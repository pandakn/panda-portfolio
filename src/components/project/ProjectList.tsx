"use client";

import Image from "next/image";
import { useState } from "react";
import { projectsData, type ProjectCategory } from "./data";

const filters: readonly ("All" | ProjectCategory)[] = [
  "All",
  "Web apps",
  "Backend",
  "Audio",
  "Play",
];

export default function ProjectList() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const count = projectsData.filter(
    (project) => filter === "All" || project.category === filter,
  ).length;

  return (
    <>
      <div className="collection-title">
        <h2 id="work-heading">
          More things
          <br />
          <span className="heading-emphasis">
            I&apos;ve made<span className="accent-period">.</span>
          </span>
        </h2>
        <span role="status">
          {String(count).padStart(2, "0")}{" "}
          {count === 1 ? "project" : "projects"}
          <span className="sr-only">
            {" "}
            shown{filter !== "All" ? `, ${filter}` : ""}
          </span>
        </span>
      </div>
      <p className="collection-intro">
        Web apps, music tools and small experiments.
        <br className="desktop-break" /> Choose a project and take a look
        inside.
      </p>
      <div className="filters" role="group" aria-label="Filter projects">
        {filters.map((category) => (
          <button
            type="button"
            key={category}
            onClick={() => setFilter(category)}
            aria-pressed={filter === category}
            aria-controls="project-list"
          >
            {category}
          </button>
        ))}
      </div>
      <div className="collection-grid" id="project-list">
        {projectsData.map((project, index) => (
          <article
            key={project.id}
            className="project-item"
            hidden={filter !== "All" && project.category !== filter}
            aria-labelledby={`${project.id}-title`}
          >
            <a
              className={`project-visual project-visual-${project.id}`}
              href={project.webUrl ?? project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title}${project.webUrl ? "" : " source code"} (opens in a new tab)`}
            >
              {project.preview.kind === "image" ? (
                <Image
                  src={project.preview.src}
                  alt=""
                  fill
                  sizes="(max-width: 640px) calc(100vw - 40px), (max-width: 1100px) 42vw, 470px"
                />
              ) : (
                <div className="api-art">
                  <span>{"{ }"}</span>
                  <b>Go / SUT Course API</b>
                  <small>Course data for student tools.</small>
                </div>
              )}
              <span className="preview-arrow" aria-hidden="true">
                ↗
              </span>
            </a>
            <div className="project-info">
              <p className="stack">
                <span className="project-number">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {project.stack}
              </p>
              <h3 id={`${project.id}-title`}>
                <a
                  href={project.webUrl ?? project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.title}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </h3>
              <p className="project-desc">{project.description}</p>
              {project.attribution ? (
                <a
                  className="project-attribution"
                  href={project.attribution.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {project.attribution.label} ↗
                </a>
              ) : null}
              <div className="project-links">
                {project.webUrl ? (
                  <a
                    href={project.webUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${project.title} (opens in a new tab)`}
                  >
                    Visit project <span aria-hidden="true">↗</span>
                  </a>
                ) : null}
                <a
                  href={project.githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} source code (opens in a new tab)`}
                >
                  Source code <span aria-hidden="true">↗</span>
                </a>
              </div>
            </div>
          </article>
        ))}
      </div>
      <a
        className="github-more"
        href="https://github.com/pandakn"
        target="_blank"
        rel="noopener noreferrer"
      >
        More experiments on GitHub <span aria-hidden="true">↗</span>
      </a>
    </>
  );
}
