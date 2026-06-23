"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/blog", label: "Writing" },
  { href: "/#experience", label: "Experience" },
  { href: "/#skills", label: "Skills" },
];

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-shell">
        <Link className="brand" href="/" aria-label="Shoaib Kabir, home" onClick={close}>
          <span className="brand-mark" aria-hidden="true">SK</span>
          <span>Shoaib Kabir</span>
        </Link>

        <button
          className="nav-toggle"
          type="button"
          aria-expanded={open}
          aria-controls="site-nav"
          onClick={() => setOpen((value) => !value)}
        >
          <span className="sr-only">Toggle navigation</span>
          <span />
          <span />
        </button>

        <nav
          id="site-nav"
          className={`site-nav${open ? " is-open" : ""}`}
          aria-label="Primary navigation"
        >
          {links.map((link) => (
            <Link href={link.href} key={link.href} onClick={close}>
              {link.label}
            </Link>
          ))}
          <Link className="nav-cta" href="/#contact" onClick={close}>
            Contact
          </Link>
        </nav>
      </div>
    </header>
  );
}
