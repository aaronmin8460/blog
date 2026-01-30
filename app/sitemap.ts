// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts, getAllTags } from "../lib/posts";
import { siteConfig } from "../lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  const tags = await getAllTags();

  const routes: MetadataRoute.Sitemap = [
    { url: siteConfig.url, lastModified: new Date() },
    { url: `${siteConfig.url}/about`, lastModified: new Date() },
    { url: `${siteConfig.url}/projects`, lastModified: new Date() },
    { url: `${siteConfig.url}/blog`, lastModified: new Date() },
  ];

  for (const p of posts) {
    routes.push({
      url: `${siteConfig.url}/blog/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : new Date(),
    });
  }

  for (const t of tags) {
    routes.push({
      url: `${siteConfig.url}/tags/${encodeURIComponent(t)}`,
      lastModified: new Date(),
    });
  }

  return routes;
}
