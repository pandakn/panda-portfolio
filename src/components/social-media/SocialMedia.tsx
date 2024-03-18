"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Github, Linkedin, NotebookPen } from "lucide-react";
import Link from "next/link";

export const socialMedia = [
  {
    icon: <Github />,
    href: "https://github.com/pandakn",
  },
  {
    icon: <Linkedin />,
    href: "https://www.linkedin.com/in/ntthwt/",
  },
  {
    icon: <NotebookPen />,
    href: "https://medium.com/@natthawut.k",
  },
];

const SocialMedia = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-6 lg:space-x-10">
        {socialMedia.map((menu, idx) => (
          <NavigationMenuItem key={idx} className="first:font-bold">
            <Link href={menu.href} legacyBehavior passHref>
              <NavigationMenuLink
                className="text-sm capitalize text-primary/80 hover:text-primary lg:text-lg"
                target="_blank"
              >
                {menu.icon}
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SocialMedia;
