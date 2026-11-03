# Hey, I'm Keem

I'm Natthawut Klangyod, a software engineer who enjoys making web apps,
music tools, and small experiments.

Visit [heykeem.com](https://www.heykeem.com/) to explore my projects,
get to know me, and get in touch.

[LinkedIn](https://www.linkedin.com/in/ntthwt/) ·
[GitHub](https://github.com/pandakn) ·
[Medium](https://medium.com/@natthawut.k)

## Sanity CMS

The site is a static export. It loads published projects and certifications from a
public Sanity dataset in the browser. The bundled content remains visible until
the request succeeds, and is also used when Sanity is unconfigured or unavailable.
A successful response with an empty collection displays an empty collection.

1. Create a Sanity project and a **public** dataset. Set its project ID and dataset
   in `sanity.settings.json`. These values are public and become part of the site
   bundle; do not put tokens or other secrets in this file.
2. In the Sanity project API settings, add the site's production origin and local
   development origin (for example `http://localhost:3000`) to CORS. Add the Studio
   origin as well, with credentials allowed for Studio authentication.
3. Run `pnpm studio`, sign in, and create and publish project and certification
   documents. The Studio runs separately from the static website. Deploy the Studio
   using Sanity's hosting workflow if remote editing is needed.
4. Copy the existing project and certification details into Studio before deploying
   the configured site. The existing entries are not automatically imported. Use
   `order` to control ordering and mark image or API projects as featured. Upload
   images and supply their descriptions. Publish changes to make them public.
5. Build and deploy the website again after changing `sanity.settings.json`.
   Subsequent published content changes appear when visitors load or reload the page;
   no website rebuild is needed for those changes.

The static HTML and search previews contain the bundled fallback content, not live
CMS data. If the Sanity request fails or returned content fails validation, the site
keeps the bundled content and logs an error in the browser console. Deleted documents
remain in that fallback until the bundled data is updated and the site is rebuilt.

### Import the original portfolio content

Generate an import file on the machine that contains this repository, then sign in
and import it into the configured project and dataset:

```bash
node scripts/prepare-sanity-import.mjs
pnpm exec sanity login
pnpm exec sanity dataset import .sanity/portfolio-import.ndjson --missing
```

The generator includes the original nine projects, one certification and their
local images. It uses absolute image paths, so regenerate the file if the repository
moves. The import creates published documents, which appear on the website after
refresh. `--missing` preserves documents with the same generated IDs on later runs;
it does not detect duplicates created manually with different IDs. Review existing
Studio documents before importing to avoid duplicates.
