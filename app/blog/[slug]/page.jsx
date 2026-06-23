import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { getAllPosts, getPostBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.summary,
      publishedTime: post.date,
      tags: post.tags,
      images: post.coverImage ? [{ url: post.coverImage }] : [],
    },
  };
}

export default async function BlogPostPage({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  if (!post) notFound();

  return (
    <article>
      <header className="article-hero">
        <div className="container narrow">
          <Link className="back-link" href="/blog">← All writing</Link>
          <p className="kicker">Technical writing</p>
          <h1>{post.title}</h1>
          <p className="article-summary">{post.summary}</p>
          <div className="article-byline">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span>{post.readingTime} min read</span>
          </div>
          <ul className="tag-list">
            {post.tags.map((tag) => <li key={tag}>{tag}</li>)}
          </ul>
        </div>
      </header>

      {post.coverImage ? (
        <div className="container article-cover">
          <Image src={post.coverImage} alt="" width={1600} height={960} priority sizes="100vw" />
        </div>
      ) : null}

      <section className="article-body container narrow">
        <MdxContent source={post.body} />
      </section>
    </article>
  );
}
