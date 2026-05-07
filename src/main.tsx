import { createRoot } from "react-dom/client";
import "./i18n";
import App from "./App.tsx";
// Self-hosted Outfit Variable Font (ersetzt render-blocking Google Fonts CDN).
// Latin + Latin-Ext-Subset wird via unicode-range nur geladen wenn entsprechende
// Glyphen sichtbar sind (font-display: swap → kein FOIT). FA/SI/RU/Cyrillic-Glyphen
// fallen weiterhin auf System-Sans zurück (Outfit hatte auch via Google Fonts keine
// Non-Latin-Subsets, Verhalten für nicht-latinische Sprachen ändert sich nicht).
import "@fontsource-variable/outfit/wght.css";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
