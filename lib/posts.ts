// lib/posts.ts
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";

export type PostMeta = {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  tags?: string[];
  draft?: boolean;
};

export type Post = PostMeta & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

export async function getAllPosts(): Promise<PostMeta[]> {
  const slugs = await getPostSlugs();
  const metas = await Promise.all(slugs.map((s) => getPostMetaBySlug(s)));
  return metas
    .filter(Boolean)
    .filter((p) => !p!.draft)
    .sort((a, b) => {
      const da = a!.date ? new Date(a!.date).getTime() : 0;
      const db = b!.date ? new Date(b!.date).getTime() : 0;
      return db - da;
    }) as PostMeta[];
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const file = path.join(POSTS_DIR, `${slug}.mdx`);
  try {
    const raw = await fs.readFile(file, "utf8");
    const { data, content } = matter(raw);

    const meta = normalizeMeta(slug, data);
    if (meta.draft) return null;

    return { ...meta, content };
  } catch {
    return null;
  }
}

export async function getPostsByTag(tag: string): Promise<PostMeta[]> {
  const posts = await getAllPosts();
  return posts.filter((p) => (p.tags ?? []).map(normalizeTag).includes(normalizeTag(tag)));
}

export async function getAllTags(): Promise<string[]> {
  const posts = await getAllPosts();
  const set = new Set<string>();
  for (const p of posts) {
    for (const t of p.tags ?? []) set.add(normalizeTag(t));
  }
  return Array.from(set).sort((a, b) => a.localeCompare(b));
}

async function getPostSlugs(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files
      .filter((f) => f.endsWith(".mdx"))
      .map((f) => f.replace(/\.mdx$/, ""));
  } catch {
    return [];
  }
}

async function getPostMetaBySlug(slug: string): Promise<PostMeta | null> {
  const post = await getPostBySlug(slug);
  if (!post) return null;
  const { content: _content, ...meta } = post;
  return meta;
}

function normalizeMeta(slug: string, data: any): PostMeta {
  const title = typeof data?.title === "string" ? data.title : slug;
  const description = typeof data?.description === "string" ? data.description : undefined;
  const date = typeof data?.date === "string" ? data.date : undefined;
  const draft = Boolean(data?.draft);

  let tags: string[] | undefined;
  if (Array.isArray(data?.tags)) {
    tags = data.tags.filter((t: any) => typeof t === "string").map(normalizeTag);
  } else if (typeof data?.tags === "string") {
    tags = data.tags
      .split(",")
      .map((s: string) => s.trim())
      .filter(Boolean)
      .map(normalizeTag);
  }

  return { slug, title, description, date, tags, draft };
}

function normalizeTag(t: string) {
  return t.trim().replace(/^#/, "");
}
