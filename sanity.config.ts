import { defineConfig, defineField, defineType } from "sanity";
import { structureTool } from "sanity/structure";
import settings from "./sanity.settings.json";

const project = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "category",
      type: "string",
      options: { list: ["Web apps", "Backend", "Audio", "Play"] },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "stack",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      type: "text",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "previewKind",
      title: "Preview type",
      type: "string",
      options: { list: ["image", "api"] },
      initialValue: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "image",
      type: "image",
      hidden: ({ document }) => document?.previewKind === "api",
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.previewKind !== "api" && !value
            ? "Image is required"
            : true,
        ),
    }),
    defineField({
      name: "imageAlt",
      title: "Image description",
      type: "string",
      hidden: ({ document }) => document?.previewKind === "api",
      validation: (rule) =>
        rule.custom((value, context) =>
          context.document?.previewKind !== "api" && !value
            ? "Image description is required"
            : true,
        ),
    }),
    defineField({
      name: "webUrl",
      title: "Website URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
    defineField({
      name: "githubLink",
      title: "Source code URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }).required(),
    }),
    defineField({ name: "attributionLabel", type: "string" }),
    defineField({
      name: "attributionUrl",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }),
    }),
  ],
});
const certification = defineType({
  name: "certification",
  title: "Certifications",
  type: "document",
  fields: [
    defineField({
      name: "title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "level",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "date",
      title: "Issue date",
      type: "date",
      validation: (rule) => rule.required(),
    }),
    defineField({ name: "order", type: "number", initialValue: 0 }),
    defineField({
      name: "image",
      title: "Badge",
      type: "image",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "alt",
      title: "Badge description",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "credentialUrl",
      title: "Credential URL",
      type: "url",
      validation: (rule) => rule.uri({ scheme: ["http", "https"] }).required(),
    }),
  ],
});
export default defineConfig({
  name: "portfolio",
  title: "Portfolio",
  projectId: settings.projectId || "placeholder",
  dataset: settings.dataset,
  plugins: [structureTool()],
  schema: { types: [project, certification] },
});
