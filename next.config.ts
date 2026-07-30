import type { NextConfig } from "next";

/**
 * basePath is required when the site is served from a GitHub Pages *project*
 * URL (https://<user>.github.io/<repo>). It must be empty for a custom domain
 * or a <user>.github.io user site.
 *
 * The value is injected by .github/workflows/deploy.yml so that local builds
 * stay at the root path. Change it in one place: the workflow's env block.
 */
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  // Emit a fully static site into ./out — this is what GitHub Pages serves.
  output: "export",

  basePath,
  assetPrefix: basePath || undefined,

  // Pages has no Node runtime, so the on-demand image optimizer cannot run.
  images: { unoptimized: true },

  // Emit /about/index.html rather than /about.html so static hosts resolve
  // directory-style URLs without redirect rules.
  trailingSlash: true,

  reactStrictMode: true,
};

export default nextConfig;
