"use client";

import Image from "next/image";
import Link from "next/link";
import SocialMedia from "../social-media/SocialMedia";
import MeIcon from "/public/logo.svg";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="flex h-28 items-center justify-between gap-x-2 lg:mx-0">
      <Link href="/">
        <Image src={MeIcon} alt="logo" width={60} height={60} priority={true} />
      </Link>
      <div className="flex items-center gap-4 sm:gap-6">
        <SocialMedia />
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default Navbar;
