import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <Link className="brand footer-brand" href="/">
            <span className="brand-mark" aria-hidden="true">SK</span>
            <span>{siteConfig.name}</span>
          </Link>
          <p>Building useful software with care.</p>
        </div>

        <div className="footer-links">
          <a href={siteConfig.github} target="_blank" rel="noreferrer">
            GitHub <span aria-hidden="true">↗</span>
          </a>
          <Link href="/blog">Writing</Link>
          <Link href="/#contact">Contact</Link>
          <a href="/rss.xml">RSS</a>
        </div>

        <p className="copyright">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
      </div>
    </footer>
  );
}
