import { SITE_LINKS } from "@/lib/links";

export type ProjectCategory = "Web apps" | "Backend" | "Audio" | "Play";

type ProjectPreview =
  { kind: "image"; src: string; alt: string } | { kind: "api" };

export type PortfolioProject = {
  id: string;
  title: string;
  category: ProjectCategory;
  stack: string;
  tagline: string;
  description: string;
  preview: ProjectPreview;
  webUrl: string | null;
  githubLink: string;
  attribution?: { label: string; href: string };
};

const fretFlow: PortfolioProject = {
  id: "fret-flow",
  title: "Fret Flow",
  category: "Web apps",
  stack: "Next.js · TypeScript",
  tagline: "Find your way around the fretboard.",
  description:
    "Explore scales, chords and arpeggios on an interactive fretboard. See how the notes connect, then hear them played back.",
  preview: {
    kind: "image",
    src: "/fret-flow/scales.webp",
    alt: "Fret Flow's interactive guitar fretboard and scale controls",
  },
  webUrl: SITE_LINKS.projects.fretFlow.website,
  githubLink: SITE_LINKS.projects.fretFlow.source,
};

const brickr: PortfolioProject = {
  id: "brickr",
  title: "brickr",
  category: "Web apps",
  stack: "Next.js · TypeScript",
  tagline: "Your photos, a little more brick-shaped.",
  description:
    "Turn a photo into LEGO-style pixel art, right in your browser. Adjust the bricks, then download your mosaic and building guide.",
  preview: {
    kind: "image",
    src: "/brickr/studs.webp",
    alt: "A photo converted into a brick mosaic in brickr",
  },
  webUrl: SITE_LINKS.projects.brickr.website,
  githubLink: SITE_LINKS.projects.brickr.source,
};

const sutSchedule: PortfolioProject = {
  id: "sut-schedule",
  title: "SUT Schedule",
  category: "Web apps",
  stack: "React · Node.js · MongoDB",
  tagline: "A better plan for the next semester.",
  description:
    "A place for SUT students to plan classes and exchange course insights, stories and advice.",
  preview: {
    kind: "image",
    src: "/sut-schedule/home.jpeg",
    alt: "SUT Schedule's course planning and student community interface",
  },
  webUrl: null,
  githubLink: SITE_LINKS.projects.sutSchedule.source,
};

export const featuredProjects: readonly [
  PortfolioProject,
  PortfolioProject,
  PortfolioProject,
] = [fretFlow, brickr, sutSchedule];

export const projectsData: readonly PortfolioProject[] = [
  ...featuredProjects,
  {
    id: "sut-course-api",
    title: "SUT Course API",
    category: "Backend",
    stack: "Go · Docker · AWS",
    tagline: "A little less manual work.",
    description:
      "An API that collects course data from SUT's registration system, making it easier to build tools for students.",
    preview: { kind: "api" },
    webUrl: null,
    githubLink: SITE_LINKS.projects.sutCourseApi.source,
  },
  {
    id: "mayerism",
    title: "Mayerism",
    category: "Audio",
    stack: "C++",
    tagline: "A little more feeling in the signal.",
    description:
      "I added an envelope filter pedal to the amp and effects chain for tones that respond to your playing dynamics.",
    preview: {
      kind: "image",
      src: "/mayerism/envelope-filter.webp",
      alt: "Mayerism's guitar amp and envelope filter controls",
    },
    webUrl: SITE_LINKS.projects.mayerism.website,
    githubLink: SITE_LINKS.projects.mayerism.source,
    attribution: {
      label: "Forked from Mayerism by timpelser",
      href: SITE_LINKS.projects.mayerism.originalSource,
    },
  },
  {
    id: "favtify",
    title: "Favtify",
    category: "Web apps",
    stack: "React · Spotify",
    tagline: "Your listening habits, at a glance.",
    description:
      "Your nine most-played Spotify tracks, together in one little snapshot.",
    preview: {
      kind: "image",
      src: "/favtify/home.png",
      alt: "Favtify's collection of most-played Spotify tracks",
    },
    webUrl: SITE_LINKS.projects.favtify.website,
    githubLink: SITE_LINKS.projects.favtify.source,
  },
  {
    id: "suggestify",
    title: "Suggestify",
    category: "Web apps",
    stack: "Next.js · Spotify",
    tagline: "Meet your next favorite track.",
    description:
      "Find twelve new tracks based on your Spotify taste, then save your discoveries straight to a playlist.",
    preview: {
      kind: "image",
      src: "/suggestify/home.jpeg",
      alt: "Suggested tracks and playlist controls in Suggestify",
    },
    webUrl: SITE_LINKS.projects.suggestify.website,
    githubLink: SITE_LINKS.projects.suggestify.source,
  },
  {
    id: "pika-guess",
    title: "Pika Guess",
    category: "Play",
    stack: "Svelte · Pokémon",
    tagline: "Know that face?",
    description:
      "A Pokémon guessing game built while learning Svelte. Match the name to the face and see how many you know.",
    preview: {
      kind: "image",
      src: "/pika-guess/home.jpeg",
      alt: "The Pokémon guessing game Pika Guess",
    },
    webUrl: SITE_LINKS.projects.pikaGuess.website,
    githubLink: SITE_LINKS.projects.pikaGuess.source,
  },
  {
    id: "pokedex",
    title: "Pokédex",
    category: "Play",
    stack: "React · JavaScript",
    tagline: "A very big collection of creatures.",
    description:
      "A Pokémon reference built with React. A small project for exploring a very big collection of creatures.",
    preview: {
      kind: "image",
      src: "/pokedex/home-md.png",
      alt: "Pokémon entries and search in Pokédex",
    },
    webUrl: SITE_LINKS.projects.pokedex.website,
    githubLink: SITE_LINKS.projects.pokedex.source,
  },
];
