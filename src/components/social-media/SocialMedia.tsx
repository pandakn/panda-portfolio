import { IconBrandGithub, IconBrandLinkedin } from "@tabler/icons-react";
import { NotebookPen } from "lucide-react";
import Link from "next/link";
import { SITE_LINKS } from "@/lib/links";

export const socialMedia = [
  {
    icon: <IconBrandGithub />,
    label: "GitHub",
    href: SITE_LINKS.profiles.github,
  },
  {
    icon: <IconBrandLinkedin />,
    label: "LinkedIn",
    href: SITE_LINKS.profiles.linkedin,
  },
  {
    icon: <NotebookPen />,
    label: "Medium",
    href: SITE_LINKS.profiles.medium,
  },
];

export default function SocialMedia() {
  return (
    <ul className="social-links" aria-label="Social links">
      {socialMedia.map(({ icon, label, href }) => (
        <li key={label}>
          <Link
            href={href}
            aria-label={label}
            target="_blank"
            rel="noopener noreferrer"
          >
            {icon}
          </Link>
        </li>
      ))}
    </ul>
  );
}
