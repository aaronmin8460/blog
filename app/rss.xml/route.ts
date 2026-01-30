// app/rss.xml/route.ts
import { getAllPosts } from "../../lib/posts";
import { siteConfig } from "../../lib/site";

export const revalidate = 3600;
export const dynamic = "force-static";

export async function GET() {
  const posts = await getAllPosts();

  const items = posts
    .map((p) => {
      const link = `${siteConfig.url}/blog/${p.slug}`;
      return `
        <item>
          <title><![CDATA[${p.title}]]></title>
          <link>${link}</link>
          <guid>${link}</guid>
          ${p.description ? `<description><![CDATA[${p.description}]]></description>` : ""}
          ${p.date ? `<pubDate>${new Date(p.date).toUTCString()}</pubDate>` : ""}
        </item>
      `.trim();
    })
    .join("\n");

  const xml = `
    <?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title><![CDATA[${siteConfig.name}]]></title>
        <link>${siteConfig.url}</link>
        <description><![CDATA[${siteConfig.description}]]></description>
        ${items}
      </channel>
    </rss>
  `.trim();

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
}
