import Image from "next/image";

export default function Navbar() {
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <a href="#main-content" aria-label="Keem home" className="site-wordmark">
        <Image src="/me.svg" alt="" width={34} height={34} />
        <span>
          keem<span className="wordmark-dot">*</span>
        </span>
      </a>
      <nav aria-label="Main navigation" className="page-nav">
        <a href="#project">Work</a>
        <a href="#about">About me</a>
      </nav>
      <a href="#footer" className="nav-contact">
        Say hello <span aria-hidden="true">↗</span>
      </a>
    </header>
  );
}
