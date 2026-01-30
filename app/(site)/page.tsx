// app/(site)/page.tsx
import Link from "next/link";
import { getAllPosts } from "../../lib/posts";
import { siteConfig } from "../../lib/site";

export const revalidate = 60;

export default async function HomePage() {
  const posts = await getAllPosts();
  const latest = posts.slice(0, 5);

  return (
    <div className="stack">
      <section className="hero">
        <h1 className="title">{siteConfig.name}</h1>
        <p className="muted">{siteConfig.description}</p>

        <div className="row">
          <Link className="btn" href="/blog">
            Read blog
          </Link>
          <Link className="btn ghost" href="/projects">
            View projects
          </Link>
        </div>
      </section>

      <section className="card">
        <div className="cardHeader">
          <h2>Latest posts</h2>
          <Link className="link" href="/blog">
            All posts →
          </Link>
        </div>

        {latest.length === 0 ? (
          <p className="muted">No posts yet. Add MDX files in content/posts/.</p>
        ) : (
          <ul className="list">
            {latest.map((p) => (
              <li key={p.slug} className="listItem">
                <Link className="link" href={`/blog/${p.slug}`}>
                  {p.title}
                </Link>
                <div className="meta">
                  <span>{formatDate(p.date)}</span>
                  {p.tags?.length ? (
                    <span className="tags">
                      {p.tags.slice(0, 3).map((t) => (
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
      </section>
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
