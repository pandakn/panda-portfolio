export default function Navbar() {
  return (
    <header className="site-header">
      <a href="#project" className="skip-link">
        Skip to all projects
      </a>
      <a
        href="#main-content"
        aria-label="Keem, back to home"
        className="site-wordmark"
      >
        keem<span>*</span>
      </a>
      <nav aria-label="Main navigation" className="page-nav">
        <a href="#project">Work</a>
        <a href="#about">About</a>
        <a
          href="https://ntthwt.notion.site/Natthawut-Klangyod-3dc1098ae5084158b157c78ff809f9c3?pvs=4"
          target="_blank"
          rel="noopener noreferrer"
        >
          Résumé <span aria-hidden="true">↗</span>
        </a>
      </nav>
      <a href="#footer" className="nav-contact">
        Say hello <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
