// app/(site)/about/page.tsx
import type { Metadata } from "next";
import { siteConfig } from "../../../lib/site";

export const metadata: Metadata = {
  title: "About",
  description: `About ${siteConfig.name}`,
};

export default function AboutPage() {
  return (
    <article className="prose">
      <h1>About</h1>
      <p>
        This is a simple Next.js + MDX tech blog starter. Edit this page in{" "}
        <code>app/(site)/about/page.tsx</code>.
      </p>

      <h2>What’s inside</h2>
      <ul>
        <li>MDX posts in <code>content/posts</code></li>
        <li>Blog list, tag pages, RSS, sitemap, robots, OG image</li>
        <li>Minimal styling (no Tailwind dependency)</li>
      </ul>
    </article>
  );
}
