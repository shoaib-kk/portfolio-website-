import Link from "next/link";
import { PostCard } from "@/components/post-card";
import { ProjectCard } from "@/components/project-card";
import { SectionHeading } from "@/components/section-heading";
import { getAllPosts, getAllProjects, withoutBody } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export const dynamic = "force-static";

const skillGroups = [
  ["Core engineering", "Python, Flask, Git, REST APIs, debugging, automation"],
  ["Data systems", "pandas, NumPy, data cleaning, exploratory analysis, reproducible notebooks"],
  ["Machine learning", "scikit-learn, regression, recommendation systems, model evaluation"],
  ["Communication", "Technical documentation, problem framing, architecture summaries, visual explanation"],
];

export default async function HomePage() {
  const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()]);
  const featuredProjects = projects.filter((project) => project.featured);
  const latestPosts = posts.slice(0, 3);

  return (
    <>
      <section className="hero" id="top">
        <div className="container hero-grid">
          <div className="hero-copy">
            <p className="eyebrow"><span className="status-dot" /> Open to engineering conversations</p>
            <h1>Shoaib Kabir</h1>
            <p className="hero-lede">
              Python developer building dependable automation, machine learning
              systems, and data products.
            </p>
            <p className="hero-note">
              I care about clear problem framing, maintainable systems, and
              software that earns its place in someone&apos;s workflow.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href="#projects">View projects</Link>
              <Link className="button button-secondary" href="#experience">Résumé</Link>
              <a className="text-link" href={siteConfig.github} target="_blank" rel="noreferrer">
                GitHub <span aria-hidden="true">↗</span>
              </a>
            </div>
          </div>

          <aside className="hero-panel" aria-label="Engineering profile">
            <div className="panel-topbar">
              <span>profile.json</span>
              <div className="window-dots" aria-hidden="true"><i /><i /><i /></div>
            </div>
            <pre><code><span className="code-key">&quot;focus&quot;</span>: [
  <span className="code-string">&quot;automation&quot;</span>,
  <span className="code-string">&quot;machine learning&quot;</span>,
  <span className="code-string">&quot;data products&quot;</span>
],
<span className="code-key">&quot;principles&quot;</span>: [
  <span className="code-string">&quot;clarity&quot;</span>,
  <span className="code-string">&quot;reliability&quot;</span>,
  <span className="code-string">&quot;measurable value&quot;</span>
]</code></pre>
            <div className="panel-status"><span /> Independent developer</div>
          </aside>
        </div>
      </section>

      <section className="section projects-section" id="projects">
        <div className="container">
          <SectionHeading kicker="Selected work" title="Engineering, explained.">
            Featured projects are selected in MDX frontmatter and rendered here automatically.
          </SectionHeading>
          <div className="project-list">
            {featuredProjects.map((project) => (
              <ProjectCard project={withoutBody(project)} key={project.slug} />
            ))}
          </div>
          <div className="section-action">
            <Link className="button button-secondary" href="/projects">Browse all projects</Link>
          </div>
        </div>
      </section>

      <section className="section writing-section" id="writing">
        <div className="container">
          <SectionHeading kicker="Technical writing" title="Notes from the work.">
            Articles are published from the blog collection, with no listing code to update.
          </SectionHeading>
          <div className="post-list">
            {latestPosts.map((post, index) => (
              <PostCard post={withoutBody(post)} index={index} key={post.slug} />
            ))}
          </div>
          <div className="section-action">
            <Link className="button button-secondary" href="/blog">Read all writing</Link>
          </div>
        </div>
      </section>

      <section className="section experience-section" id="experience">
        <div className="container narrow">
          <SectionHeading kicker="Experience" title="Built through practice." />
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-date">Current</div>
              <div>
                <h3>Independent software projects</h3>
                <p className="timeline-role">Python development · Machine learning · Data analysis</p>
                <p>
                  Designing and shipping focused projects across desktop automation,
                  predictive modelling, recommendation systems, and analytical workflows.
                </p>
                <ul>
                  <li>Translate open-ended problems into small, testable software systems.</li>
                  <li>Build reproducible data workflows with clear separation between preprocessing, modelling, and evaluation.</li>
                  <li>Document architecture and trade-offs so projects can be understood beyond the source code.</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <div className="container">
          <SectionHeading kicker="Capabilities" title="A focused technical toolkit.">
            Tools are grouped by how they contribute to a system, not ranked with arbitrary percentages.
          </SectionHeading>
          <div className="skills-grid">
            {skillGroups.map(([title, description], index) => (
              <article className="skill-group" key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section contact-section" id="contact">
        <div className="container">
          <div className="contact-card">
            <div>
              <p className="kicker">Contact</p>
              <h2>Let&apos;s build something useful.</h2>
              <p>I&apos;m interested in Python engineering, automation, machine learning, and data-focused opportunities.</p>
            </div>
            <div className="contact-actions">
              <a className="button button-primary" href={siteConfig.github} target="_blank" rel="noreferrer">
                Connect on GitHub <span aria-hidden="true">↗</span>
              </a>
              <p>GitHub is the currently verified contact channel.</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
