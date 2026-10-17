"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { NotebookPen } from "lucide-react";
import Link from "next/link";

export const socialMedia = [
  {
    icon: <IconBrandGithub />,
    label: "GitHub",
    href: "https://github.com/pandakn",
  },
  {
    icon: <IconBrandLinkedin />,
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ntthwt/",
  },
  {
    icon: <NotebookPen />,
    label: "Medium",
    href: "https://medium.com/@natthawut.k",
  },
];

const SocialMedia = () => {
  return (
    <NavigationMenu>
      <NavigationMenuList className="space-x-6 lg:space-x-10">
        {socialMedia.map((menu, idx) => (
          <NavigationMenuItem key={idx} className="first:font-bold">
            <NavigationMenuLink asChild>
              <Link
                href={menu.href}
                aria-label={menu.label}
                className="text-sm text-primary/80 capitalize hover:text-primary lg:text-lg"
                target="_blank"
                rel="noopener noreferrer"
              >
                {menu.icon}
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
};

export default SocialMedia;
