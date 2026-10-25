import Image from "next/image";
import awsBadge from "/public/aws-solutions-architect-associate.png";
import { SITE_LINKS } from "@/lib/links";

export default function Certifications() {
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
      <article className="certification-card">
        <Image
          src={awsBadge}
          alt="AWS Certified Solutions Architect Associate badge"
          width={96}
          height={96}
          sizes="96px"
        />
        <div>
          <h4>AWS Certified Solutions Architect</h4>
          <p>
            Associate <span aria-hidden="true">·</span> Issued{" "}
            <time dateTime="2026-09-28">September 2026</time>
          </p>
          <a
            className="text-link"
            href={SITE_LINKS.credentials.awsSolutionsArchitect}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View AWS credential (opens in a new tab)"
          >
            View credential <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </section>
  );
}
