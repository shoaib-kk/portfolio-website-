import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { getAllProjects, getProjectBySlug } from "@/lib/content";
import { formatDate } from "@/lib/format";

export const dynamicParams = false;

export async function generateStaticParams() {
  const projects = await getAllProjects();
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.description,
      publishedTime: project.date,
      images: project.coverImage ? [{ url: project.coverImage }] : [],
    },
  };
}

export default async function ProjectPage({ params }) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <article>
      <header className="article-hero">
        <div className="container narrow">
          <Link className="back-link" href="/projects">← All projects</Link>
          <p className="kicker">{project.status}</p>
          <h1>{project.title}</h1>
          <p className="article-summary">{project.description}</p>
          <div className="article-byline">
            <time dateTime={project.date}>{formatDate(project.date)}</time>
            <span>{project.readingTime} min read</span>
          </div>
          <ul className="tag-list">
            {project.technologies.map((technology) => <li key={technology}>{technology}</li>)}
          </ul>
          <div className="article-actions">
            {project.github ? (
              <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">GitHub ↗</a>
            ) : null}
            {project.liveDemo ? (
              <a className="button button-primary" href={project.liveDemo} target="_blank" rel="noreferrer">Live demo ↗</a>
            ) : null}
          </div>
        </div>
      </header>

      {project.coverImage ? (
        <div className="container article-cover">
          <Image src={project.coverImage} alt="" width={1600} height={960} priority sizes="100vw" />
        </div>
      ) : null}

      <section className="article-body container narrow">
        <MdxContent source={project.body} />
      </section>
    </article>
  );
}
