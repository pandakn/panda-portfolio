"use client";

import { useEffect, useState } from "react";
import { z } from "zod";
import settings from "../../sanity.settings.json";
import { projectsData } from "@/components/project/data";
import { SITE_LINKS } from "@/lib/links";

const url = z.url().refine((value) => /^https?:\/\//i.test(value));
const project = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  category: z.enum(["Web apps", "Backend", "Audio", "Play"]),
  stack: z.string(),
  tagline: z.string(),
  description: z.string(),
  preview: z.discriminatedUnion("kind", [
    z.object({ kind: z.literal("image"), src: url, alt: z.string() }),
    z.object({ kind: z.literal("api") }),
  ]),
  webUrl: url.nullable(),
  githubLink: url,
  attribution: z.object({ label: z.string(), href: url }).nullable(),
  featured: z.boolean(),
});
const certification = z.object({
  id: z.string(),
  title: z.string(),
  level: z.string(),
  date: z.iso.date(),
  image: url,
  alt: z.string(),
  credentialUrl: url,
});
const responseSchema = z.object({
  projects: z.array(project),
  certifications: z.array(certification),
});
type Content = z.infer<typeof responseSchema>;

const fallback: Content = {
  projects: projectsData.map((item, index) => ({
    ...item,
    attribution: item.attribution ?? null,
    featured: index < 3,
  })),
  certifications: [
    {
      id: "aws",
      title: "AWS Certified Solutions Architect",
      level: "Associate",
      date: "2026-09-28",
      image: "/aws-solutions-architect-associate.png",
      alt: "AWS Certified Solutions Architect Associate badge",
      credentialUrl: SITE_LINKS.credentials.awsSolutionsArchitect,
    },
  ],
};

const query = `{
  "projects": *[_type == "project"] | order(order asc, _createdAt asc) {
    "id": _id, title, category, stack, tagline, description,
    "preview": select(previewKind == "api" => {"kind": "api"}, {"kind": "image", "src": image.asset->url, "alt": imageAlt}),
    "webUrl": coalesce(webUrl, null), githubLink,
    "attribution": select(defined(attributionLabel) && defined(attributionUrl) => {"label": attributionLabel, "href": attributionUrl}, null),
    "featured": coalesce(featured, false)
  },
  "certifications": *[_type == "certification"] | order(order asc, _createdAt asc) {
    "id": _id, title, level, date, "image": image.asset->url, alt, credentialUrl
  }
}`;

let request: Promise<Content> | undefined;
function loadContent() {
  if (!request) {
    const endpoint = new URL(
      `https://${settings.projectId}.api.sanity.io/v2026-01-01/data/query/${settings.dataset}`,
    );
    endpoint.searchParams.set("query", query);
    endpoint.searchParams.set("perspective", "published");
    request = fetch(endpoint)
      .then((response) => {
        if (!response.ok) throw new Error("Sanity request failed");
        return response.json();
      })
      .then(
        (body: unknown) =>
          z.object({ result: responseSchema }).parse(body).result,
      )
      .catch((error: unknown) => {
        request = undefined;
        throw error;
      });
  }
  return request;
}

export function usePortfolioContent() {
  const [content, setContent] = useState(fallback);
  useEffect(() => {
    if (!settings.projectId || !settings.dataset) return;
    let active = true;
    loadContent()
      .then((value) => {
        if (active) setContent(value);
      })
      .catch((error: unknown) => {
        console.error("Could not load portfolio content from Sanity", error);
      });
    return () => {
      active = false;
    };
  }, []);
  return content;
}
