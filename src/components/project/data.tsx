import { IconPhotoOff } from "@tabler/icons-react";

import { BentoGridItemProps } from "../ui/bento-grid";
import TechStack from "./TechStack";
import Thumbnail from "./Thumbnail";

const sutScheduleImages = [
  "/sut-schedule/home.jpeg",
  "/sut-schedule/schedule.jpeg",
  "/sut-schedule/search.jpeg",
  "/sut-schedule/write.jpeg",
  "/sut-schedule/blog.jpeg",
  "/sut-schedule/comment.jpeg",
];

const suggestifyImages = [
  "/suggestify/login.jpeg",
  "/suggestify/home.jpeg",
  "/suggestify/playlists.jpeg",
];

const favtifyImages = ["/favtify/login.gif", "/favtify/home.png"];

const pokedex = ["/pokedex/home-md.png"];
const pikaGuess = ["/pika-guess/home.gif"];

const Skeleton = () => (
  <div className="flex h-full min-h-[6rem] w-full flex-1 items-center justify-center rounded-xl bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
    <IconPhotoOff className="h-10 w-10 text-gray-400" />
  </div>
);

export const projectsData: BentoGridItemProps[] = [
  {
    title: "SUT Schedule",
    description: `The "SUT Schedule" project enables SUT students to efficiently plan
        class schedules (courses from SUT-REG) while also providing a platform
        for personalized blogs, allowing them to share insights on majors,
        classes, and more.`,
    header: <Thumbnail images={sutScheduleImages} />,
    className: "md:col-span-3",
    githubLink: "https://github.com/pandakn/sut-schedule",
    techStack: (
      <TechStack
        techStack={[
          "react",
          "typescript",
          "tailwind",
          "nodejs",
          "mongo",
          "docker",
        ]}
      />
    ),
  },
  {
    title: "SUT COURSE API (Go version)",
    description: `scrape course data from Suranaree University of Technology's registration system.`,
    header: <Skeleton />,
    className: "md:col-span-1",
    githubLink: "https://github.com/pandakn/go-sut-course-api",
    techStack: <TechStack techStack={["golang", "docker", "aws"]} />,
  },
  {
    title: "Favtify",
    description: `"Favtify" is a simple and easy-to-use tool that lets you display your 9 most-played tracks on Spotify.`,
    header: <Thumbnail images={favtifyImages} />,
    className: "md:col-span-2",
    webUrl: "https://favtify.vercel.app/",
    githubLink: "https://github.com/pandakn/favtify",
    techStack: (
      <TechStack
        techStack={[
          "react",
          "javascript",
          "tailwind",
          "spotify",
          "auth",
          "vercel",
        ]}
      />
    ),
  },
  {
    title: "Suggestify",
    description: `"Suggestify" is a tool that recommends 12 awesome Spotify tracks that come from your taste and lets you add them to your playlist hassle-free!.`,
    header: <Thumbnail images={suggestifyImages} />,
    className: "md:col-span-3",
    webUrl: "https://suggestify-pnd.vercel.app/login",
    githubLink: "https://github.com/pandakn/suggestify",
    techStack: (
      <TechStack
        techStack={["next", "typescript", "tailwind", "spotify", "vercel"]}
      />
    ),
  },
  {
    title: "Pika Guess",
    description: `Project for Learning Svelte : Match Pokemon images with names, earn points.`,
    header: <Thumbnail images={pikaGuess} />,
    className: "md:col-span-2",
    webUrl: "https://pika-guess.vercel.app/",
    githubLink: "https://github.com/pandakn/pika-guess",
    techStack: (
      <TechStack techStack={["svelte", "tailwind", "pokemon", "vercel"]} />
    ),
  },
  {
    title: "Pokédex",
    description: "pokedex.",
    header: <Thumbnail images={pokedex} />,
    className: "md:col-span-1",
    webUrl: "https://pokemon-dex-two.vercel.app/",
    githubLink: "https://github.com/pandakn/pokemon-dex?tab=readme-ov-file",
    techStack: (
      <TechStack
        techStack={["react", "javascript", "tailwind", "pokemon", "vercel"]}
      />
    ),
  },
];
