import { type BentoGridItemProps } from "../ui/bento-grid";
import TechStack from "./TechStack";
import Thumbnail from "./Thumbnail";

const fretFlowImages = [
  "/fret-flow/scales.webp",
  "/fret-flow/chords-light.webp",
  "/fret-flow/learn.webp",
  "/fret-flow/practice.webp",
  "/fret-flow/progress.webp",
];
const mayerismImages = [
  "/mayerism/envelope-filter.webp",
  "/mayerism/amp.webp",
  "/mayerism/post-effects.webp",
];
const brickrImages = ["/brickr/studs.webp", "/brickr/flat.webp"];

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
  <div className="project-code-preview" aria-hidden="true">
    <span className="project-code-symbol">{"{ go }"}</span>
    <span className="project-code-label">A little less manual work.</span>
  </div>
);

export const projectsData: BentoGridItemProps[] = [
  {
    title: "Fret Flow",
    description:
      "A guitar practice companion for exploring scales, chords, and arpeggios on an interactive fretboard. See how the notes connect, then hear them played back.",
    header: <Thumbnail images={fretFlowImages} title="Fret Flow" />,
    className: "project-card-wide",
    webUrl: "https://fret-flow-guitar.vercel.app/en",
    githubLink: "https://github.com/pandakn/fret-flow",
    techStack: (
      <TechStack
        techStack={["next", "react", "typescript", "tailwind", "vercel"]}
      />
    ),
  },
  {
    title: "Mayerism",
    description:
      "My fork of the open-source Mayerism guitar plugin. I added an envelope filter pedal to its amp and effects chain for tones that respond to your playing dynamics.",
    header: <Thumbnail images={mayerismImages} title="Mayerism" />,
    githubLink: "https://github.com/pandakn/Mayerism",
    techStack: <TechStack techStack={["c++"]} />,
  },
  {
    title: "brickr",
    description:
      "Turn a photo into LEGO-style pixel art, right in your browser. Play with brick sizes and stud textures, then download your mosaic and building guide.",
    header: <Thumbnail images={brickrImages} title="brickr" />,
    webUrl: "https://brickr.vercel.app/",
    githubLink: "https://github.com/pandakn/brickr",
    techStack: (
      <TechStack
        techStack={["next", "react", "typescript", "tailwind", "vercel"]}
      />
    ),
  },
  {
    title: "SUT Schedule",
    description:
      "An easier way for SUT students to plan their class schedules and share stories, course insights, and advice with each other.",
    header: <Thumbnail images={sutScheduleImages} title="SUT Schedule" />,
    className: "project-card-wide",
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
    title: "SUT Course API",
    description:
      "A Go API that collects course data from SUT’s registration system, making it easier to build tools for students.",
    header: <Skeleton />,
    githubLink: "https://github.com/pandakn/go-sut-course-api",
    techStack: <TechStack techStack={["golang", "docker", "aws"]} />,
  },
  {
    title: "Favtify",
    description:
      "Your nine most-played Spotify tracks, together in one little snapshot.",
    header: <Thumbnail images={favtifyImages} title="Favtify" />,
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
    description:
      "Find twelve new tracks based on your Spotify taste, then save your discoveries straight to a playlist.",
    header: <Thumbnail images={suggestifyImages} title="Suggestify" />,
    className: "project-card-wide",
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
    description:
      "A Pokémon guessing game built while learning Svelte. Match the name to the face and see how many you know.",
    header: <Thumbnail images={pikaGuess} title="Pika Guess" />,
    webUrl: "https://pika-guess.vercel.app/",
    githubLink: "https://github.com/pandakn/pika-guess",
    techStack: (
      <TechStack techStack={["svelte", "tailwind", "pokemon", "vercel"]} />
    ),
  },
  {
    title: "Pokédex",
    description:
      "A Pokémon reference built with React. A small project for exploring a very big collection of creatures.",
    header: <Thumbnail images={pokedex} title="Pokédex" />,
    webUrl: "https://pokemon-dex-two.vercel.app/",
    githubLink: "https://github.com/pandakn/pokemon-dex?tab=readme-ov-file",
    techStack: (
      <TechStack
        techStack={["react", "javascript", "tailwind", "pokemon", "vercel"]}
      />
    ),
  },
];
