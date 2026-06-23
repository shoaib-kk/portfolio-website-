import Image from "next/image";
import Link from "next/link";

export function ProjectCard({ project }) {
  return (
    <article className="content-card project-content-card">
      <Link
        className="content-card-image"
        href={`/projects/${project.slug}`}
        aria-label={`Read the ${project.title} case study`}
      >
        {project.coverImage ? (
          <Image
            src={project.coverImage}
            alt=""
            width={1280}
            height={768}
            sizes="(max-width: 900px) 100vw, 44vw"
          />
        ) : (
          <span className="image-placeholder">{project.title}</span>
        )}
      </Link>

      <div className="content-card-body">
        <div className="content-card-meta">
          <span>{project.status}</span>
          <span>{project.readingTime} min read</span>
        </div>
        <h3>
          <Link href={`/projects/${project.slug}`}>{project.title}</Link>
        </h3>
        <p>{project.description}</p>
        <ul className="tag-list" aria-label={`${project.title} technologies`}>
          {project.technologies.map((technology) => (
            <li key={technology}>{technology}</li>
          ))}
        </ul>
        <div className="content-card-links">
          <Link href={`/projects/${project.slug}`}>Case study →</Link>
          {project.liveDemo ? (
            <a href={project.liveDemo} target="_blank" rel="noreferrer">
              Live demo ↗
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
