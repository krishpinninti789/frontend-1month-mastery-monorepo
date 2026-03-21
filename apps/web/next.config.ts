import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["@repo/ui", "@repo/lib"],
};

export default nextConfig;
