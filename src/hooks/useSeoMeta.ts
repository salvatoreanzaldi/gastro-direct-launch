import { useEffect } from "react";

const DEFAULT_OG_IMAGE = "https://gastro-master.de/og-image.png";

interface SeoMetaProps {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  twitterCard?: "summary" | "summary_large_image";
}

function upsertMeta(selector: string, attr: string, value: string) {
  let el = document.querySelector(selector) as HTMLElement | null;
  if (!el) {
    el = document.createElement("meta");
    const matches = selector.matchAll(/\[([^=\]]+)="([^"]+)"\]/g);
    for (const m of matches) el.setAttribute(m[1], m[2]);
    document.head.appendChild(el);
  }
  el.setAttribute(attr, value);
}

function upsertLink(rel: string, href: string) {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function removeMeta(selector: string) {
  const el = document.querySelector(selector);
  if (el) el.remove();
}

export function useSeoMeta({
  title,
  description,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  type = "website",
  publishedTime,
  modifiedTime,
  twitterCard = "summary_large_image",
}: SeoMetaProps) {
  useEffect(() => {
    const prevTitle = document.title;

    document.title = title;
    upsertMeta('meta[name="description"]', "content", description);
    upsertLink("canonical", canonical);

    upsertMeta('meta[property="og:title"]', "content", title);
    upsertMeta('meta[property="og:description"]', "content", description);
    upsertMeta('meta[property="og:image"]', "content", ogImage);
    upsertMeta('meta[property="og:url"]', "content", canonical);
    upsertMeta('meta[property="og:type"]', "content", type);
    upsertMeta('meta[property="og:locale"]', "content", "de_DE");

    if (type === "article") {
      if (publishedTime) {
        upsertMeta('meta[property="article:published_time"]', "content", publishedTime);
      }
      if (modifiedTime) {
        upsertMeta('meta[property="article:modified_time"]', "content", modifiedTime);
      }
    } else {
      removeMeta('meta[property="article:published_time"]');
      removeMeta('meta[property="article:modified_time"]');
    }

    upsertMeta('meta[name="twitter:card"]', "content", twitterCard);
    upsertMeta('meta[name="twitter:title"]', "content", title);
    upsertMeta('meta[name="twitter:description"]', "content", description);
    upsertMeta('meta[name="twitter:image"]', "content", ogImage);

    return () => {
      document.title = prevTitle;
    };
  }, [title, description, canonical, ogImage, type, publishedTime, modifiedTime, twitterCard]);
}
