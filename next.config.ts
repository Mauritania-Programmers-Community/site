import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";
import { build } from "velite";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.githubusercontent.com",
      },
    ],
  },
  // Velite integration - Turbopack compatible
  webpack: (config) => {
    config.plugins.push(new VeliteWebpackPlugin());
    return config;
  },
};

class VeliteWebpackPlugin {
  static started = false;
  apply(compiler: {
    options?: { mode?: string };
    hooks: { beforeCompile: { tapPromise: (arg0: string, arg1: () => Promise<void>) => void } };
  }) {
    compiler.hooks.beforeCompile.tapPromise("VeliteWebpackPlugin", async () => {
      if (VeliteWebpackPlugin.started) return;
      VeliteWebpackPlugin.started = true;
      const dev = compiler.options?.mode === "development";
      await build({ watch: dev, clean: !dev });
    });
  }
}

export default withNextIntl(nextConfig);
