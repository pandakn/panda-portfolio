import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const output = new URL("../out/", import.meta.url);
const read = (path) => readFile(new URL(path, output), "utf8");
const [html, notFound, robots, sitemap] = await Promise.all([
  read("index.html"),
  read("404.html"),
  read("robots.txt"),
  read("sitemap.xml"),
]);

const decode = (value) =>
  value.replace(/&(?:amp|quot|apos|lt|gt|#39|#x27);/g, (entity) => {
    const entities = {
      "&amp;": "&",
      "&quot;": '"',
      "&apos;": "'",
      "&lt;": "<",
      "&gt;": ">",
      "&#39;": "'",
      "&#x27;": "'",
    };
    return entities[entity];
  });
const tags = (source, name) =>
  [...source.matchAll(new RegExp(`<${name}\\b([^>]*)>`, "g"))].map(
    ([, attributes]) =>
      Object.fromEntries(
        [...attributes.matchAll(/([\w:-]+)="([^"]*)"/g)].map(
          ([, key, value]) => [key, decode(value)],
        ),
      ),
  );

const head = html.slice(0, html.indexOf("</head>"));
const metaTags = tags(head, "meta");
const meta = (name) => {
  const matches = metaTags.filter(
    (tag) => tag.name === name || tag.property === name,
  );
  assert.equal(matches.length, 1, `Expected one ${name} meta tag`);
  return matches[0].content;
};
const canonicalLinks = tags(head, "link").filter(
  (tag) => tag.rel === "canonical",
);
assert.equal(canonicalLinks.length, 1, "Expected one homepage canonical");
const canonical = new URL(canonicalLinks[0].href);
assert.equal(canonical.href, "https://www.heykeem.com/");
assert.match(
  head,
  /<title>Natthawut Klangyod \(Keem\) \| Software Engineer<\/title>/,
);
assert.match(meta("description"), /Natthawut Klangyod.*React.*TypeScript/);
assert.match(meta("robots"), /\bindex\b/);
assert.doesNotMatch(meta("robots"), /noindex|nofollow/);
assert.match(meta("googlebot"), /max-image-preview:large/);
assert.equal(new URL(meta("og:url")).href, canonical.href);
assert.equal(meta("og:type"), "website");
assert.equal(meta("og:site_name"), "Hey Keem");
assert.equal(meta("og:title"), meta("twitter:title"));
assert.equal(meta("og:description"), meta("description"));
assert.equal(meta("twitter:card"), "summary_large_image");

const favicon = tags(head, "link").find(
  (tag) => tag.rel === "icon" && tag.type === "image/png",
);
assert.ok(favicon, "Provide a PNG favicon supported by Google Search");
assert.equal(favicon.sizes, "192x192");
const faviconUrl = new URL(favicon.href, canonical);
assert.equal(faviconUrl.origin, canonical.origin);
const faviconImage = await readFile(new URL(`.${faviconUrl.pathname}`, output));
assert.equal(faviconImage.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
assert.equal(faviconImage.readUInt32BE(16), 192);
assert.equal(faviconImage.readUInt32BE(20), 192);

for (const name of ["og:image", "twitter:image"]) {
  const imageUrl = new URL(meta(name));
  assert.equal(imageUrl.origin, canonical.origin);
  const image = await readFile(new URL(`.${imageUrl.pathname}`, output));
  assert.equal(image.subarray(0, 8).toString("hex"), "89504e470d0a1a0a");
  assert.equal(image.readUInt32BE(16), 1200);
  assert.equal(image.readUInt32BE(20), 630);
  assert.ok(image.byteLength < 5_000_000, "Social image must be under 5 MB");
}

const headings = [...html.matchAll(/<h1\b[^>]*>([\s\S]*?)<\/h1>/g)];
assert.equal(headings.length, 1, "Homepage must have one H1");
assert.match(headings[0][1], /Natthawut Klangyod/);
const about = html.match(
  /<section\b[^>]*id="about"[^>]*>([\s\S]*?)<\/section>/,
);
assert.ok(about, "About section must be prerendered");
assert.match(about[1], /Natthawut Klangyod/);
assert.equal(
  tags(html, "article").filter((tag) => tag.class === "project-item").length,
  9,
);
for (const image of tags(html, "img")) {
  if (!image.src?.startsWith("/")) continue;
  await readFile(new URL(`.${new URL(image.src, canonical).pathname}`, output));
}

const scripts = [...html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)];
const jsonLd = scripts.filter(([, attributes]) =>
  attributes.includes('type="application/ld+json"'),
);
assert.equal(jsonLd.length, 1, "Expected one structured data graph");
const data = JSON.parse(jsonLd[0][2]);
assert.equal(data["@context"], "https://schema.org");
const person = data["@graph"].find((node) => node["@type"] === "Person");
const profile = data["@graph"].find((node) => node["@type"] === "ProfilePage");
const website = data["@graph"].find((node) => node["@type"] === "WebSite");
assert.equal(person.name, "Natthawut Klangyod");
assert.equal(person.alternateName, "Keem");
assert.equal(person.url, canonical.href);
assert.equal(profile.mainEntity["@id"], person["@id"]);
assert.equal(profile.isPartOf["@id"], website["@id"]);
assert.equal(website.url, canonical.href);
assert.ok(person.sameAs.includes("https://github.com/pandakn"));
assert.ok(person.sameAs.includes("https://www.linkedin.com/in/ntthwt/"));

assert.match(robots, /User-Agent: \*\r?\nAllow: \/(?:\r?\n|$)/i);
assert.ok(
  robots.includes(`Sitemap: ${new URL("sitemap.xml", canonical).href}`),
);
assert.doesNotMatch(robots, /^Disallow:\s*\/\s*$/im);
const locations = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(([, url]) =>
  decode(url),
);
assert.deepEqual(locations, [canonical.href]);
assert.doesNotMatch(sitemap, /<lastmod>/, "Do not invent a modification date");

assert.ok(
  tags(notFound, "meta").some(
    (tag) => tag.name === "robots" && tag.content.includes("noindex"),
  ),
  "404 page must remain noindex",
);
assert.equal(
  tags(notFound, "link").filter((tag) => tag.rel === "canonical").length,
  0,
  "404 page must not claim the homepage canonical",
);

console.log(
  "SEO checks passed: metadata, canonical, crawl files, profile data, social images, prerendered content, local images, and 404.",
);
