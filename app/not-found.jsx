import Link from "next/link";

export default function NotFound() {
  return (
    <section className="error-page">
      <div className="container">
        <p className="kicker">404</p>
        <h1>This page isn&apos;t here.</h1>
        <p>The link may be outdated, or the content may have moved.</p>
        <Link className="button button-primary" href="/">Back home</Link>
      </div>
    </section>
  );
}
