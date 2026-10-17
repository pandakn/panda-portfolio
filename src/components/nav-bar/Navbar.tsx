"use client";

import Image from "next/image";
import Link from "next/link";
import SocialMedia from "../social-media/SocialMedia";
import MeIcon from "/public/logo.svg";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex h-28 items-center justify-between gap-x-2 lg:mx-0">
      <Link
        href="/"
        aria-label="Keem home"
        className="-ml-2 inline-flex shrink-0 rounded-[20px] p-2 transition-colors duration-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring motion-reduce:transition-none dark:bg-[#f0ede5] dark:shadow-[0_4px_18px_rgb(0_0_0/20%)] dark:ring-1 dark:ring-white/15"
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
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
