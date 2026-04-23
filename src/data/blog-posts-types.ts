// Shared types for blog posts — imported by blog-posts.ts and blog-posts-generated.ts
export type SectionType = "h2" | "h3" | "p" | "ul" | "ol";

export interface ContentSection {
  type: SectionType;
  content: string | string[];
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface InternalLink {
  title: string;
  href: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  description: string;
  excerpt?: string;  // Human-readable teaser for BlogCard (≤160 chars, no §-refs)
  sections: ContentSection[];
  author: string;
  publishedDate: string;
  category: string;
  tags: string[];
  keywords: string[];
  metaDescription: string;
  readingTime: number;
  featured: boolean;
  internalLinks: InternalLink[];
  faqItems: FAQItem[];
  bodyHtml?: string;   // HTML from wordpress.html
  jsonLd?: string;     // JSON-LD string for head injection
}
