import { readFile, writeFile, mkdir, access } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import ts from "typescript";

const root = process.cwd();
const compile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
const dataUrl = (source) =>
  `data:text/javascript;base64,${Buffer.from(source).toString("base64")}`;
const links = dataUrl(
  compile(await readFile(path.join(root, "src/lib/links.ts"), "utf8")),
);
const source = (
  await readFile(path.join(root, "src/components/project/data.tsx"), "utf8")
).replace('"@/lib/links"', JSON.stringify(links));
const { projectsData } = await import(dataUrl(compile(source)));
const { SITE_LINKS } = await import(links);

async function image(src) {
  const file = path.join(root, "public", src.replace(/^\//, ""));
  await access(file);
  return { _type: "image", _sanityAsset: `image@${pathToFileURL(file).href}` };
}

const documents = [];
for (const [index, project] of projectsData.entries()) {
  const doc = {
    _id: `portfolio-project-${project.id}`,
    _type: "project",
    title: project.title,
    category: project.category,
    order: index,
    featured: index < 3,
    stack: project.stack,
    tagline: project.tagline,
    description: project.description,
    previewKind: project.preview.kind,
    ...(project.preview.kind === "image"
      ? {
          image: await image(project.preview.src),
          imageAlt: project.preview.alt,
        }
      : {}),
    ...(project.webUrl ? { webUrl: project.webUrl } : {}),
    githubLink: project.githubLink,
    ...(project.attribution
      ? {
          attributionLabel: project.attribution.label,
          attributionUrl: project.attribution.href,
        }
      : {}),
  };
  documents.push(doc);
}
documents.push({
  _id: "portfolio-certification-aws-solutions-architect-associate",
  _type: "certification",
  title: "AWS Certified Solutions Architect",
  level: "Associate",
  date: "2026-09-28",
  order: 0,
  image: await image("/aws-solutions-architect-associate.png"),
  alt: "AWS Certified Solutions Architect Associate badge",
  credentialUrl: SITE_LINKS.credentials.awsSolutionsArchitect,
});
const destination = path.join(root, ".sanity", "portfolio-import.ndjson");
await mkdir(path.dirname(destination), { recursive: true });
await writeFile(
  destination,
  documents.map((doc) => JSON.stringify(doc)).join("\n") + "\n",
);
console.log(
  `Prepared ${projectsData.length} projects and 1 certification: ${destination}`,
);
