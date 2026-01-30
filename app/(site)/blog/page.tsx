// app/(site)/blog/page.tsx
import Link from "next/link";
import { getAllPosts } from "../../../lib/posts";

export const revalidate = 60;

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <div className="stack">
      <header className="pageHeader">
        <h1>Blog</h1>
        <p className="muted">All posts from content/posts/*.mdx</p>
      </header>

      {posts.length === 0 ? (
        <p className="muted">No posts yet.</p>
      ) : (
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug} className="listItem">
              <Link className="link" href={`/blog/${p.slug}`}>
                {p.title}
              </Link>
              <div className="meta">
                <span>{formatDate(p.date)}</span>
                {p.tags?.length ? (
                  <span className="tags">
                    {p.tags.map((t) => (
                      <Link key={t} className="tag" href={`/tags/${encodeURIComponent(t)}`}>
                        #{t}
                      </Link>
                    ))}
                  </span>
                ) : null}
              </div>
              {p.description ? <p className="muted">{p.description}</p> : null}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDate(dateISO?: string) {
  if (!dateISO) return "";
  try {
    return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "short", day: "2-digit" }).format(
      new Date(dateISO)
    );
  } catch {
    return dateISO;
  }
}
