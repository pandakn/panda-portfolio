"use client";

import Image from "next/image";
import { usePortfolioContent } from "@/sanity/content";

export default function Certifications() {
  const { certifications } = usePortfolioContent();
  return (
    <section
      id="certifications"
      className="board-certifications pinned-paper"
      aria-labelledby="certifications-heading"
      tabIndex={-1}
    >
      <h3 id="certifications-heading" className="eyebrow">
        Always learning
      </h3>
      {certifications.map((certification) => (
        <article className="certification-card" key={certification.id}>
          <Image
            src={certification.image}
            alt={certification.alt}
            width={96}
            height={96}
            sizes="96px"
          />
          <div>
            <h4>{certification.title}</h4>
            <p>
              {certification.level} <span aria-hidden="true">·</span> Issued{" "}
              <time dateTime={certification.date}>
                {new Intl.DateTimeFormat("en-US", {
                  month: "long",
                  year: "numeric",
                  timeZone: "UTC",
                }).format(new Date(`${certification.date}T00:00:00Z`))}
              </time>
            </p>
            <a
              className="text-link"
              href={certification.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              View credential{" "}
              <span className="sr-only">(opens in a new tab)</span>{" "}
              <span aria-hidden="true">↗</span>
            </a>
          </div>
        </article>
      ))}
    </section>
  );
}
