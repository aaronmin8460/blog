// lib/site.ts
export const siteConfig = {
  name: "My Blog",
  description: "A minimal tech blog built with Next.js + MDX.",
  url: "http://localhost:3000", // 배포하면 여기만 바꾸면 됨
};

export function absoluteUrl(path: string) {
  return `${siteConfig.url}${path.startsWith("/") ? path : `/${path}`}`;
}
