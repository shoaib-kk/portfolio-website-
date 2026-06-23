import Image from "next/image";
import Link from "next/link";
import { formatDate } from "@/lib/format";

export function PostCard({ post, index }) {
  return (
    <article className="post-card">
      <div className="post-card-index">{String(index + 1).padStart(2, "0")}</div>
      {post.coverImage ? (
        <Link className="post-card-image" href={`/blog/${post.slug}`}>
          <Image
            src={post.coverImage}
            alt=""
            width={720}
            height={420}
            sizes="(max-width: 720px) 100vw, 240px"
          />
        </Link>
      ) : null}
      <div className="post-card-copy">
        <div className="content-card-meta">
          <time dateTime={post.date}>{formatDate(post.date)}</time>
          <span>{post.readingTime} min read</span>
        </div>
        <h3>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p>{post.summary}</p>
        <ul className="tag-list" aria-label={`${post.title} tags`}>
          {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
        </ul>
      </div>
      <Link className="post-card-arrow" href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
        →
      </Link>
    </article>
  );
}
