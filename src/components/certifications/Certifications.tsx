import Image from "next/image";
import SketchMark from "@/components/ui/SketchMark";
import awsBadge from "/public/aws-solutions-architect-associate.png";

const credentialUrl =
  "https://www.credly.com/badges/bee88c48-3c60-40f1-8105-6ff17cc49b19/public_url";

export default function Certifications() {
  return (
    <section
      id="certifications"
      className="certifications-section"
      aria-labelledby="certifications-heading"
    >
      <h2 id="certifications-heading" className="section-title">
        <SketchMark color="ochre">Certifications.</SketchMark>
      </h2>
      <article className="certification-card">
        <div className="certification-copy">
          <h3>AWS Certified Solutions Architect</h3>
          <p className="certification-level">Associate</p>
          <dl className="certification-dates">
            <div>
              <dt>Issued</dt>
              <dd>
                <time dateTime="2026-09-28">September 28, 2026</time>
              </dd>
            </div>
            <div>
              <dt>Expires</dt>
              <dd>
                <time dateTime="2029-09-28">September 28, 2029</time>
              </dd>
            </div>
          </dl>
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-link"
          >
            Verify on Credly
            <span className="sr-only"> (opens in a new tab)</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
        <a
          href={credentialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="certification-badge"
        >
          <Image
            src={awsBadge}
            alt="Verify AWS Certified Solutions Architect Associate on Credly (opens in a new tab)"
            width={180}
            height={180}
            sizes="180px"
          />
        </a>
      </article>
    </section>
  );
}
