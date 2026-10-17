import { cn } from "@/lib/utils";
import { IconBrandGithub } from "@tabler/icons-react";
import Link from "next/link";

export function BentoGrid({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  return <div className={cn("project-grid", className)}>{children}</div>;
}

export interface BentoGridItemProps {
  className?: string;
  title: string;
  description: React.ReactNode;
  header: React.ReactNode;
  githubLink: string;
  webUrl?: string;
  techStack?: React.ReactNode;
}

export function BentoGridItem({
  className,
  title,
  description,
  header,
  techStack,
  githubLink,
  webUrl,
  index,
}: BentoGridItemProps & { index: number }) {
  return (
    <article className={cn("project-card", className)}>
      <div className="project-preview">{header}</div>
      <div className="project-details">
        <div className="project-topline">
          <div>
            <span className="project-number">
              {String(index).padStart(2, "0")} / PROJECT
            </span>
            <h3 className="project-title">
              <Link
                href={webUrl ?? githubLink}
                target="_blank"
                rel="noopener noreferrer"
              >
                {title}
              </Link>
            </h3>
          </div>
          <Link
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${title} source on GitHub`}
            className="project-source"
          >
            <IconBrandGithub size={20} stroke={1.5} aria-hidden="true" />
          </Link>
        </div>
        <p className="project-description">{description}</p>
        {techStack}
      </div>
    </article>
  );
}
