import {
  IconBrandAuth0,
  IconBrandAws,
  IconBrandDocker,
  IconBrandGolang,
  IconBrandMongodb,
  IconBrandNextjs,
  IconBrandNodejs,
  IconBrandReact,
  IconBrandSpotify,
  IconBrandSvelte,
  IconBrandTailwind,
  IconBrandTypescript,
  IconBrandVercel,
  IconBrandJavascript,
  IconPokeball,
} from "@tabler/icons-react";

const icons = {
  react: <IconBrandReact />,
  svelte: <IconBrandSvelte />,
  next: <IconBrandNextjs />,
  spotify: <IconBrandSpotify />,
  aws: <IconBrandAws />,
  docker: <IconBrandDocker />,
  typescript: <IconBrandTypescript />,
  golang: <IconBrandGolang />,
  auth: <IconBrandAuth0 />,
  tailwind: <IconBrandTailwind />,
  nodejs: <IconBrandNodejs />,
  mongo: <IconBrandMongodb />,
  vercel: <IconBrandVercel />,
  javascript: <IconBrandJavascript />,
  pokemon: <IconPokeball />,
};

type iconType =
  | "react"
  | "svelte"
  | "next"
  | "spotify"
  | "aws"
  | "docker"
  | "typescript"
  | "golang"
  | "auth"
  | "tailwind"
  | "nodejs"
  | "mongo"
  | "vercel"
  | "javascript"
  | "pokemon";

type TechStackProps = {
  techStack: iconType[];
};

const TechStack = ({ techStack }: TechStackProps) => {
  return (
    <ul className="project-tech" aria-label="Technologies used">
      {techStack.map((t, idx) => (
        <li key={idx} title={t}>
          <span role="img" aria-label={t}>
            {icons[t]}
          </span>
        </li>
      ))}
    </ul>
  );
};

export default TechStack;
