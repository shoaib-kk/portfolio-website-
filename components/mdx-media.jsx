function Caption({ children }) {
  return children ? <figcaption>{children}</figcaption> : null;
}

export function ProjectImage({
  src,
  alt,
  caption,
  fullWidth = false,
  priority = false,
}) {
  return (
    <figure className={`mdx-image${fullWidth ? " mdx-image-full" : ""}`}>
      {/* Dimensions are author-controlled, so native images keep MDX flexible. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading={priority ? "eager" : "lazy"} />
      <Caption>{caption}</Caption>
    </figure>
  );
}

export function ImageGallery({ images = [], columns = 2 }) {
  return (
    <div
      className="image-gallery"
      style={{ "--gallery-columns": Math.min(Math.max(columns, 1), 3) }}
    >
      {images.map((image) => (
        <ProjectImage
          key={`${image.src}-${image.alt}`}
          src={image.src}
          alt={image.alt}
          caption={image.caption}
        />
      ))}
    </div>
  );
}

export function Comparison({ before, after, beforeLabel = "Before", afterLabel = "After" }) {
  return (
    <div className="comparison">
      <figure>
        <span>{beforeLabel}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before.src} alt={before.alt} loading="lazy" />
        <Caption>{before.caption}</Caption>
      </figure>
      <figure>
        <span>{afterLabel}</span>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={after.src} alt={after.alt} loading="lazy" />
        <Caption>{after.caption}</Caption>
      </figure>
    </div>
  );
}

export function Video({ src, poster, title = "Embedded video", caption }) {
  return (
    <figure className="mdx-video">
      <video controls preload="metadata" poster={poster} aria-label={title}>
        <source src={src} />
        Your browser does not support embedded video.
      </video>
      <Caption>{caption}</Caption>
    </figure>
  );
}

export function ArchitectureDiagram({ src, alt, caption }) {
  return (
    <figure className="architecture-diagram">
      <div className="diagram-label">System architecture</div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} loading="lazy" />
      <Caption>{caption}</Caption>
    </figure>
  );
}

export function Callout({ title = "Note", type = "note", children }) {
  return (
    <aside className={`callout callout-${type}`}>
      <strong>{title}</strong>
      <div>{children}</div>
    </aside>
  );
}
