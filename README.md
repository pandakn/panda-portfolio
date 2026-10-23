# My Web Portfolio

Requires Node.js 22.13 or newer and pnpm 11.25.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before shipping changes.

## Build and deploy

```sh
pnpm build
```

Upload the contents of `out/` to your static host. The export includes HTML,
CSS, JavaScript, fonts, and public assets and requires no Node.js server.
Deploy at the domain root. Images use their original files without a runtime
image optimization service.

To preview the exported site locally after building:

```sh
pnpm start
```

Open `http://localhost:3000`. To use another port, run `pnpm start --listen 3001`.

The project uses TypeScript 7 through the `@typescript/native` alias. The
`typescript` alias provides the TypeScript 6 API required by Next.js and
typescript-eslint, following the official
[side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6-0).

Next.js's transitive `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and
`eslint-plugin-react` packages still declare ESLint 9 peer ranges. pnpm reports
these warnings with ESLint 10; the project's lint command has been verified.
