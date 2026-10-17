"use client";

import Image from "next/image";
import Link from "next/link";
import SocialMedia from "../social-media/SocialMedia";
import MeIcon from "/public/me.svg";
import { PullCord } from "../pull-cord";

export default function Navbar() {
  return (
    <header className="site-header">
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Link href="/" aria-label="Keem home" className="site-wordmark">
        <Image
          src={MeIcon}
          alt="logo"
          width={60}
          height={60}
          className="h-auto w-[60px]"
          priority
        />
        <span>
          Keem<span className="wordmark-dot">.</span>
        </span>
      </Link>
      <div className="header-right">
        <nav aria-label="Main navigation" className="page-nav">
          <a href="#about">About</a>
          <a href="#project">Work</a>
        </nav>
        <div className="header-socials">
          <SocialMedia />
        </div>
        <PullCord />
      </div>
    </header>
  );
}
