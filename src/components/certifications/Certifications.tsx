import Image from "next/image";
import awsBadge from "/public/aws-solutions-architect-associate.png";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="certifications-section"
      aria-labelledby="certifications-heading"
    >
      <h2 id="certifications-heading" className="eyebrow">
        Always learning
      </h2>
      <article className="certification-card">
        <Image
          src={awsBadge}
          alt="AWS Certified Solutions Architect Associate badge"
          width={96}
          height={96}
          sizes="96px"
        />
        <div>
          <h3>AWS Certified Solutions Architect</h3>
          <p>
            Associate <span aria-hidden="true">·</span> Issued{" "}
            <time dateTime="2026-09-28">September 2026</time>
          </p>
        </div>
        <a
          className="text-link"
          href="https://www.credly.com/badges/bee88c48-3c60-40f1-8105-6ff17cc49b19/public_url"
          target="_blank"
          rel="noopener noreferrer"
        >
          View credential <span aria-hidden="true">↗</span>
        </a>
      </article>
    </section>
  );
}
