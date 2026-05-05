/**
 * Single Source of Truth for SEO metadata (titles, descriptions) for pre-rendered pages.
 * Used by scripts/generate-prerendered-html.mjs to inject page-specific meta tags.
 */

export const SEO_META = {
  '/preise': {
    title: 'Gastro Master — Preise & Pakete',
    description: 'Alle Gastro Master Pakete im Überblick: Von der Website über Webshop bis zur Kasse. Transparente Preise, monatlich kündbar.',
  },
  '/loesungen/lieferdienst': {
    title: 'Lieferdienst — Provisionsfreie Lieferplattform',
    description: 'Starten Sie Ihren eigenen Lieferdienst mit 0 % Provision. Gastro Master bietet die komplette Lösung: Lieferapp, Fahrerverwaltung, Telemetrie.',
  },
  '/produkte/add-ons': {
    title: 'Add-Ons — Erweitern Sie Ihr System',
    description: 'Add-Ons für Gastro Master: QR-Code-Flyer, Fahrer-App, Tischbestell-System, Kitchen Display, Kiosk Self-Ordering.',
  },
} as const;
