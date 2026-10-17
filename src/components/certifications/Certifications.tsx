import Image from "next/image";
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
        Certifications.
      </h2>
      <article className="certification-card">
        <span className="calendar-tape" aria-hidden="true" />
        <div className="calendar-heading" aria-hidden="true">
          <span>September</span>
          <span>2026</span>
        </div>
        <div className="calendar-weekdays" aria-hidden="true">
          {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="certificate-calendar">
          <div className="calendar-dates" aria-hidden="true">
            {Array.from({ length: 35 }, (_, index) => (
              <span
                key={index}
                className={index === 28 ? "certified-day" : undefined}
              >
                {index > 0 && index <= 30 ? <span>{index}</span> : null}
              </span>
            ))}
          </div>
          <div className="certification-badge">
            <Image
              src={awsBadge}
              alt="AWS Certified Solutions Architect Associate badge"
              width={180}
              height={180}
              sizes="(max-width: 700px) 90px, 130px"
            />
          </div>
          <div
            className="passport-stamp"
            aria-label="AWS certified, issued September 28, 2026"
          >
            <span>AWS CERTIFIED</span>
            <time dateTime="2026-09-28">28 SEP 2026</time>
          </div>
        </div>
        <div className="certification-copy">
          <div>
            <h3>AWS Certified Solutions Architect</h3>
            <p className="certification-level">Associate</p>
          </div>
          <a
            href={credentialUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="credential-link"
          >
            View credential
            <span className="sr-only"> (opens in a new tab)</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </article>
    </section>
  );
}
