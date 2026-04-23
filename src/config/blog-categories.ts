export interface CategoryConfig {
  slug: string;
  label: string;
  bg: string;
  text: string;
  border: string;
  solid: string;
  gradient: string;
}

export const BLOG_CATEGORIES: CategoryConfig[] = [
  { slug: "bestellsysteme",   label: "Bestellsysteme",    bg: "bg-cyan-500/10",    text: "text-cyan-400",    border: "border-cyan-500/30",    solid: "bg-cyan-500",    gradient: "from-cyan-500/10"    },
  { slug: "lieferservice",    label: "Lieferservice",     bg: "bg-orange-500/10",  text: "text-orange-400",  border: "border-orange-500/30",  solid: "bg-orange-500",  gradient: "from-orange-500/10"  },
  { slug: "website-marketing",label: "Website & Marketing",bg:"bg-pink-500/10",   text: "text-pink-400",    border: "border-pink-500/30",    solid: "bg-pink-500",    gradient: "from-pink-500/10"    },
  { slug: "recht-compliance", label: "Recht & Compliance",bg: "bg-amber-500/10",  text: "text-amber-400",   border: "border-amber-500/30",   solid: "bg-amber-500",   gradient: "from-amber-500/10"   },
  { slug: "personal-schulung",label: "Personal & Schulung",bg:"bg-violet-500/10", text: "text-violet-400",  border: "border-violet-500/30",  solid: "bg-violet-500",  gradient: "from-violet-500/10"  },
  { slug: "finanzen",         label: "Finanzen",          bg: "bg-emerald-500/10", text: "text-emerald-400", border: "border-emerald-500/30", solid: "bg-emerald-500", gradient: "from-emerald-500/10" },
  { slug: "gruendung",        label: "Gründung",          bg: "bg-sky-500/10",     text: "text-sky-400",     border: "border-sky-500/30",     solid: "bg-sky-500",     gradient: "from-sky-500/10"     },
  { slug: "betrieb-service",  label: "Betrieb & Service", bg: "bg-rose-500/10",    text: "text-rose-400",    border: "border-rose-500/30",    solid: "bg-rose-500",    gradient: "from-rose-500/10"    },
  { slug: "trends-zukunft",   label: "Trends & Zukunft",  bg: "bg-indigo-500/10",  text: "text-indigo-400",  border: "border-indigo-500/30",  solid: "bg-indigo-500",  gradient: "from-indigo-500/10"  },
];

const DEFAULT_CAT: CategoryConfig = {
  slug: "sonstige", label: "Sonstige",
  bg: "bg-zinc-500/10", text: "text-zinc-400", border: "border-zinc-500/30",
  solid: "bg-zinc-500", gradient: "from-zinc-500/10",
};

const _map: Record<string, CategoryConfig> = {};
for (const c of BLOG_CATEGORIES) {
  _map[c.label] = c;
  _map[c.slug]  = c;
}

export function getCategoryConfig(label: string): CategoryConfig {
  return _map[label] ?? DEFAULT_CAT;
}
