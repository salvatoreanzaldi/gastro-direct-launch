import { BlogPostLayout } from "@/components/blog/BlogPostLayout";
import BlogContent from "@/components/blog/BlogContent";
import { getBlogPostBySlug } from "@/data/blog-posts";

const post = getBlogPostBySlug("bestellsystem-gastronomie")!;

const POST_META = {
  title: post.title,
  description: post.metaDescription,
  category: post.category,
  readingTime: `${post.readingTime} min`,
  publishDate: "21. April 2026",
  slug: post.slug,
};

export default function BlogPostBestellsystemPage() {
  return (
    <BlogPostLayout {...POST_META}>
      <BlogContent post={post} />
    </BlogPostLayout>
  );
}
