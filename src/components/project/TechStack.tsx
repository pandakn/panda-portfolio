import {
  IconBrandAuth0,
  IconBrandAws,
  IconBrandCpp,
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
  "c++": <IconBrandCpp />,
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

type iconType = keyof typeof icons;

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
