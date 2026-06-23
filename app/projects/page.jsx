import { ProjectCard } from "@/components/project-card";
import { getAllProjects, withoutBody } from "@/lib/content";

export const metadata = {
  title: "Projects",
  description: "Engineering case studies across automation, machine learning, and data.",
};

export const dynamic = "force-static";

export default async function ProjectsPage() {
  const projects = await getAllProjects();

  return (
    <>
      <header className="page-hero">
        <div className="container narrow">
          <p className="kicker">Project archive</p>
          <h1>Selected engineering work.</h1>
          <p>Each case study is generated from an MDX file and can include rich technical media.</p>
        </div>
      </header>
      <section className="section">
        <div className="container project-list">
          {projects.map((project) => (
            <ProjectCard project={withoutBody(project)} key={project.slug} />
          ))}
        </div>
      </section>
    </>
  );
}
