"use client";

import Image from "next/image";
import Link from "next/link";
import SocialMedia from "../social-media/SocialMedia";
import MeIcon from "/public/me.svg";
import { PullCord } from "../pull-cord";

const Navbar = () => {
  return (
    <nav className="flex h-28 items-center justify-between gap-x-2 lg:mx-0">
      <Link
        href="/"
        aria-label="Keem home"
        className="-ml-2 inline-flex shrink-0 rounded-[20px] p-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
      >
        <Image
          src={MeIcon}
          alt="logo"
          width={60}
          height={60}
          className="h-auto w-[60px]"
          priority={true}
        />
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <SocialMedia />
        <PullCord />
      </div>
    </nav>
  );
};

export default Navbar;
