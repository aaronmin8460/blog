// components/Header.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "../lib/site";

const nav = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="header">
      <div className="container headerInner">
        <Link className="brand" href="/">
          {siteConfig.name}
        </Link>

        <nav className="nav">
          {nav.map((item) => {
            const active = pathname === item.href || (item.href !== "/" && pathname?.startsWith(item.href));
            return (
              <Link key={item.href} className={`navLink ${active ? "active" : ""}`} href={item.href}>
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
