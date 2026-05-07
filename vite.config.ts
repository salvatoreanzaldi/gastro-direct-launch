import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import { compression } from "vite-plugin-compression2";
import { imagetools } from "vite-imagetools";
import { ViteImageOptimizer } from "vite-plugin-image-optimizer";

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
    // Image-Pipeline: PNG/JPG-Imports mit `?as=picture`-Suffix bekommen automatisch
    // AVIF + WebP + Original-Format generiert, plus Width-Variants für responsive
    // srcset. Bilder OHNE Suffix bleiben unverändert (= sicherer Opt-in pro Bild).
    // Sharp (peer-dep) ist Build-Time, kein Runtime-Effekt.
    imagetools(),
    // PNG/JPG-In-place-Optimierung für ALLE Bilder (auch die ohne ?as=picture-Opt-in,
    // z. B. Hero). Re-encode via sharp mit pragmatischen Quality-Settings — typisch
    // -30 bis -50% Bytes, visuell verlustfrei für Web-Auflösungen. Kein Component-
    // Refactor, kein Filename-Rename, keine Risiko für Asset-Resolution.
    // Hero-Section bleibt ABSOLUT unangetastet (Salvatore-Constraint Confidence 10/10).
    ViteImageOptimizer({
      png: { quality: 85 },
      jpeg: { quality: 85 },
      jpg: { quality: 85 },
      webp: { quality: 82 }, // betrifft Bilder die schon als WebP via imagetools generiert sind
    }),
    // Pre-built Brotli + Gzip Compression (Vercel serviert .br/.gz wenn vorhanden,
    // höheres Compression-Level als on-the-fly). Fallback: wenn pre-built fehlt,
    // greift Vercel-eigene on-the-fly-Compression — kein User-Risiko.
    // Bilder/Fonts sind bereits komprimiert → exclude Pattern.
    compression({
      algorithm: "brotliCompress",
      exclude: [/\.(br|gz|png|jpg|jpeg|webp|avif|woff2?)$/i],
      threshold: 1024,
    }),
    compression({
      algorithm: "gzip",
      exclude: [/\.(br|gz|png|jpg|jpeg|webp|avif|woff2?)$/i],
      threshold: 1024,
    }),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    // CSS-code-splitting (Vite-Default ist true seit v3, explizit zur Sicherheit).
    cssCodeSplit: true,
    rollupOptions: {
      output: {
        // Object-basiertes Chunking — robust gegen Circular-Dependency-Issues.
        // Funktions-basierte Per-Package-Splitting (z.B. Radix per-package) hat
        // bei Vite 5 + React 18 zu Load-Order-Bugs geführt (i18n-Chunk lud vor
        // vendor → React.createContext undefined → White Screen). Dies ist die
        // bewährte Form. Win bleibt: framer-motion, vendor, i18n separiert.
        manualChunks: {
          'framer-motion': ['framer-motion'],
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'i18n': ['react-i18next', 'i18next'],
        },
      },
    },
  },
}));
