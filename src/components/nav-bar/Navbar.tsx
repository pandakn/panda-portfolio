import AvatarIcon from "./AvatarIcon";
import { SITE_LINKS } from "@/lib/links";

export default function Navbar() {
  return (
    <header className="site-header">
      <a href={SITE_LINKS.sections.projects} className="skip-link">
        Skip to all projects
      </a>
      <a
        href={SITE_LINKS.sections.home}
        aria-label="Keem, back to home"
        className="site-wordmark"
      >
        <AvatarIcon />
        <span className="wordmark-text">keem*</span>
      </a>
      <nav aria-label="Main navigation" className="page-nav">
        <a href={SITE_LINKS.sections.projects}>Work</a>
        <a href={SITE_LINKS.sections.about}>About</a>
        <a
          href={SITE_LINKS.resume}
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <a href={SITE_LINKS.sections.footer} className="nav-contact">
        Say hello <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
