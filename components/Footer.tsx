// components/Footer.tsx
import { siteConfig } from "../lib/site";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footerInner">
        <span className="muted">
          © {new Date().getFullYear()} {siteConfig.name}
        </span>
        <div className="row">
          <a className="link" href="/rss.xml">
            RSS
          </a>
          <a className="link" href="/sitemap.xml">
            Sitemap
          </a>
        </div>
      </div>
    </footer>
  );
}
