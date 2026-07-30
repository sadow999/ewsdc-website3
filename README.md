# EWSDC — Egypt Workforce & Skills Development Corporation

Static marketing site for EWSDC. Next.js 16 App Router, Tailwind v4, exported to
plain HTML/CSS/JS and served by GitHub Pages. No server, no database.

Live URL (after the first deploy): `https://sadow999.github.io/ewsdc-website3/`

---

## Why the previous version did not deploy

Four independent failures, any one of which was enough:

1. **`next.config.ts` had no `output: "export"`.** `next build` produced a
   `.next` server bundle. Pages has no Node runtime, so there was nothing to
   serve.
2. **The `build` script could not succeed.** It ran
   `next build && cp -r .next/static .next/standalone/.next/`, but
   `.next/standalone` only exists with `output: "standalone"`, which was not
   set. The `cp` exited non-zero and failed the workflow.
3. **The workflow referenced `actions/deploy-pages@v5`,** which does not exist.
   The job errored before deploying. Latest is `v4`.
4. **No `basePath`.** The repo is a *project* site served from
   `/ewsdc-website3`, so root-relative asset URLs would have 404'd even after a
   successful export.

A fifth, latent problem: `typescript.ignoreBuildErrors: true` was hiding a real
type error in `page.tsx` (`GearDecoration` received a `style` prop it did not
accept). That flag is now removed and the error is fixed.

## What changed

| Area | Change |
| --- | --- |
| `next.config.ts` | `output: "export"`, `basePath`/`assetPrefix`, `images.unoptimized`, `trailingSlash`; dropped `ignoreBuildErrors` |
| `package.json` | `build` is plain `next build`; removed Prisma/NextAuth/db scripts; dependencies cut from 60 to 10 |
| Removed | `src/app/api/route.ts` (API routes are illegal in a static export), `src/lib/db.ts`, `prisma/`, `tailwind.config.ts` (dead under Tailwind v4) |
| Fonts | `next/font/google` → the self-hosted `geist` package, so builds do not depend on fonts.googleapis.com being reachable |
| Contact form | Was a 1.5 s `setTimeout` that discarded the message. Now posts to a configurable endpoint with success/failure toasts, and falls back to the visitor's mail client when no endpoint is set |
| Assets | Image and favicon URLs go through one `asset()` helper that applies `basePath` |
| Added | `public/.nojekyll`, `public/favicon.svg`, `app/sitemap.ts`, `robots.txt` sitemap line, `metadataBase`, Open Graph/Twitter tags, `.env.example` |
| Workflow | Correct action versions, npm with lockfile caching, and a step that fails loudly if `out/index.html` is missing |

The 44 unused shadcn/ui components were removed along with the ~35 Radix
packages they pulled in. Only `button`, `input`, `textarea`, `badge`, `toast`,
and `toaster` are imported by the site. Add any others back with
`npx shadcn@latest add <name>`.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000
```

Build and preview exactly what Pages will serve:

```bash
npm run build        # writes ./out
npm run serve        # http://localhost:3000
```

Local builds use an empty `basePath`, so the preview lives at the root.

## Deploying

1. Push this repo to `main`.
2. In GitHub: **Settings → Pages → Build and deployment → Source → GitHub
   Actions**. This is a one-time manual step; the workflow cannot set it.
3. The workflow runs on every push to `main`. Watch it under **Actions**.

### Custom domain

In `.github/workflows/deploy.yml`, set `NEXT_PUBLIC_BASE_PATH` to an empty
string and `NEXT_PUBLIC_SITE_URL` to your domain, then add a `public/CNAME`
file containing the bare hostname. Update the `Sitemap:` line in
`public/robots.txt` to match.

## Enabling the contact form

A static host cannot receive a POST, so delivery needs a third-party endpoint.

1. Create a form at [formspree.io](https://formspree.io) and copy its endpoint
   (`https://formspree.io/f/xxxxxxxx`).
2. In GitHub: **Settings → Secrets and variables → Actions → Variables → New
   repository variable**, named `FORM_ENDPOINT`, with that URL as the value.
3. Re-run the workflow.

Until then the form opens the visitor's mail client pre-addressed to
`info@afys-ewb.org`. It never silently drops a message.

## Structure

```
src/app/layout.tsx      metadata, fonts, toast host
src/app/page.tsx        the entire single-page site
src/app/globals.css     Tailwind v4 theme; EWSDC brand tokens
src/app/sitemap.ts      generates sitemap.xml at build time
src/components/ui/      the six shadcn primitives actually in use
public/                 images, favicon, robots.txt, .nojekyll
```

Section content (services, sectors, stats, partners) lives in `const` arrays at
the top of `page.tsx` — edit those rather than the JSX below them.

## Constraints of a static export

Do not add API routes, server actions, middleware, `revalidate`, or
`cookies()`/`headers()`. Any of these will fail the build. Anything needing a
server means moving off Pages — Vercel imports this repo unchanged and supports
all of it.
