export function SectionHeading({ kicker, title, children }) {
  return (
    <div className="section-heading">
      <div>
        <p className="kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {children ? <p>{children}</p> : null}
    </div>
  );
}
