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
