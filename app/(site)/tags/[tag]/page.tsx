// app/(site)/tags/[tag]/page.tsx
import Link from "next/link";
import { getAllTags, getPostsByTag } from "../../../../lib/posts";

export const revalidate = 60;

type Props = { params: { tag: string } };

export async function generateStaticParams() {
  const tags = await getAllTags();
  return tags.map((t) => ({ tag: t }));
}

export default async function TagPage({ params }: Props) {
  const tag = decodeURIComponent(params.tag);
  const posts = await getPostsByTag(tag);

  return (
    <div className="stack">
      <header className="pageHeader">
        <h1>#{tag}</h1>
        <p className="muted">{posts.length} post(s)</p>
      </header>

      {posts.length === 0 ? (
        <p className="muted">No posts for this tag.</p>
      ) : (
        <ul className="list">
          {posts.map((p) => (
            <li key={p.slug} className="listItem">
              <Link className="link" href={`/blog/${p.slug}`}>
                {p.title}
              </Link>
              <div className="meta">
                <span>{p.date ?? ""}</span>
              </div>
              {p.description ? <p className="muted">{p.description}</p> : null}
            </li>
          ))}
        </ul>
      )}

      <div className="card">
        <div className="cardHeader">
          <h2>All tags</h2>
          <Link className="link" href="/blog">
            Back to blog →
          </Link>
        </div>
        <TagCloud />
      </div>
    </div>
  );
}

async function TagCloud() {
  const tags = await getAllTags();
  return (
    <div className="tags">
      {tags.map((t) => (
        <Link key={t} className="tag" href={`/tags/${encodeURIComponent(t)}`}>
          #{t}
        </Link>
      ))}
    </div>
  );
}
