import type { NextConfig } from "next";

/** Repo name on GitHub Pages: https://9BaoTran1.github.io/coreprint/ */
const REPO_NAME = "coreprint";

/** Set GH_PAGES=true in GitHub Actions for project-site basePath */
const useGhPages = process.env.GH_PAGES === "true";

const nextConfig: NextConfig = {
  // Static HTML — free host on GitHub Pages / any CDN (300–500 users trivial)
  output: "export",
  images: { unoptimized: true },
  trailingSlash: true,
  ...(useGhPages
    ? {
        basePath: `/${REPO_NAME}`,
        assetPrefix: `/${REPO_NAME}/`,
      }
    : {}),
};

export default nextConfig;
