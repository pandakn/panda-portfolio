# My Web Portfolio

Requires Node.js 22.13 or newer and pnpm 11.25.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Run `pnpm lint`, `pnpm typecheck`, and `pnpm build` before shipping changes.

The project uses TypeScript 7 through the `@typescript/native` alias. The
`typescript` alias provides the TypeScript 6 API required by Next.js and
typescript-eslint, following the official
[side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-6-0).

Next.js's transitive `eslint-plugin-import`, `eslint-plugin-jsx-a11y`, and
`eslint-plugin-react` packages still declare ESLint 9 peer ranges. pnpm reports
these warnings with ESLint 10; the project's lint command has been verified.
