import { PostCard } from "@/components/post-card";
import { getAllPosts, withoutBody } from "@/lib/content";

export const metadata = {
  title: "Technical Writing",
  description: "Notes on engineering decisions, machine learning, automation, and data.",
};

export const dynamic = "force-static";

export default async function BlogPage() {
  const posts = await getAllPosts();

  return (
    <>
      <header className="page-hero">
        <div className="container narrow">
          <p className="kicker">Technical writing</p>
          <h1>Notes from the work.</h1>
          <p>Practical explanations of architecture, implementation choices, and engineering trade-offs.</p>
        </div>
      </header>
      <section className="section">
        <div className="container post-list">
          {posts.map((post, index) => (
            <PostCard post={withoutBody(post)} index={index} key={post.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
