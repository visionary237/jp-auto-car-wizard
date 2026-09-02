// @lovable.dev/vite-tanstack-config already includes the following — do NOT add them manually
// or the app will break with duplicate plugins:
//   - TanStack devtools (dev-only, first), tanstackStart, viteReact, tailwindcss, tsConfigPaths,
//     nitro (build-only using cloudflare as a default target), VITE_* env injection, @ path alias,
//     React/TanStack dedupe, error logger plugins, and sandbox detection (port/host/strictPort).
// You can pass additional config via defineConfig({ vite: { ... }, etc... }) if needed.
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    // Redirect TanStack Start's bundled server entry to src/server.ts (our SSR error wrapper).
    // nitro/vite builds from this
    server: { entry: "server" },
    // Pré-rendu HTML statique de toutes les routes publiques (hébergement Hostinger).
    pages: [
      { path: "/" },
      { path: "/garage-le-havre" },
      { path: "/revision-vidange-le-havre" },
      { path: "/freinage-le-havre" },
      { path: "/pneus-le-havre" },
      { path: "/embrayage-le-havre" },
      { path: "/boite-automatique-le-havre" },
      { path: "/diagnostic-auto-le-havre" },
      { path: "/nettoyage-fap-le-havre" },
      { path: "/suspension-le-havre" },
      { path: "/batterie-demarrage-le-havre" },
    ],
    prerender: { enabled: true, autoStaticPathsDiscovery: false },
  },
});

