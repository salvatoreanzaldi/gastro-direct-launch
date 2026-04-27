import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import imagemin from "vite-plugin-imagemin";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    imagemin({
      gifsicle: { optimizationLevel: 7 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 75 },
      pngquant: { quality: [0.65, 0.90] },
      svgo: { plugins: [{ name: "removeViewBox", active: false }] },
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Pin the i18n bundle (with bundled locale JSONs) into the i18n
          // chunk so the ~150 KB of common.json data does not migrate into
          // arbitrary lazy chunks based on Rollup's chunking heuristic.
          if (id.endsWith("/src/i18n.ts") || /\/public\/locales\/.+\.json$/.test(id)) {
            return "i18n";
          }

          // Force shared landing sections used across multiple pages into
          // dedicated chunks so they stay split when several pages lazy-import
          // them — otherwise Rollup may inline them back into the entry.
          if (id.includes("/src/components/landing/CalculatorSection")) return "shared-calculator";
          if (id.includes("/src/components/landing/TargetGroupSection")) return "shared-target-group";
          if (id.includes("/src/components/landing/Footer")) return "shared-footer";
          if (id.includes("/src/components/GoogleReviewsGrid")) return "shared-reviews";

          if (!id.includes("node_modules")) return;
          if (id.includes("framer-motion")) return "framer-motion";
          if (id.includes("@radix-ui")) return "radix";
          if (id.includes("@tanstack/react-query")) return "tanstack";
          if (id.includes("embla-carousel")) return "embla";
          if (id.includes("lucide-react")) return "icons";
          if (id.includes("date-fns")) return "date-fns";
          if (id.includes("react-i18next") || id.includes("/i18next")) return "i18n";
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router") ||
            id.includes("/scheduler/")
          ) {
            return "vendor";
          }
        },
      },
    },
  },
}));
