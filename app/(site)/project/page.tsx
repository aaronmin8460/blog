// app/(site)/projects/page.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Things I’m building",
};

const projects = [
  {
    name: "Example Project",
    description: "Replace this with your real project.",
    href: "https://example.com",
    tags: ["nextjs", "mdx"],
  },
];

export default function ProjectsPage() {
  return (
    <div className="stack">
      <header className="pageHeader">
        <h1>Projects</h1>
        <p className="muted">A short list of things I’m building.</p>
      </header>

      <ul className="grid">
        {projects.map((p) => (
          <li key={p.name} className="card">
            <div className="cardHeader">
              <h2>{p.name}</h2>
              {p.href ? (
                <a className="link" href={p.href} target="_blank" rel="noreferrer">
                  Visit →
                </a>
              ) : null}
            </div>
            <p className="muted">{p.description}</p>
            <div className="tags">
              {p.tags.map((t) => (
                <span key={t} className="tag static">
                  #{t}
                </span>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
