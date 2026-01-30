// app/(site)/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "../../../../lib/posts";
import MDXComponents from "../../../../components/MDXComponents";
import { siteConfig } from "../../../../lib/site";

export const revalidate = 60;

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params; // ✅ unwrap params Promise
  const post = await getPostBySlug(slug);
  if (!post) return {};

  const url = `${siteConfig.url}/blog/${post.slug}`;
  return {
    title: post.title,
    description: post.description ?? "",
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description ?? "",
      url,
      siteName: siteConfig.name,
      type: "article",
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params; // ✅ unwrap here too
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article className="prose">
      <h1>{post.title}</h1>
      <MDXRemote source={post.content} components={MDXComponents} />
    </article>
  );
}
