import { getAllPosts, getAllProjects } from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default async function sitemap() {
  const [projects, posts] = await Promise.all([getAllProjects(), getAllPosts()]);

  return [
    { url: siteConfig.url, lastModified: new Date(), changeFrequency: "monthly", priority: 1 },
    { url: `${siteConfig.url}/projects`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.9 },
    { url: `${siteConfig.url}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    ...projects.map((project) => ({
      url: `${siteConfig.url}/projects/${project.slug}`,
      lastModified: new Date(project.date),
      changeFrequency: "monthly",
      priority: project.featured ? 0.9 : 0.7,
    })),
    ...posts.map((post) => ({
      url: `${siteConfig.url}/blog/${post.slug}`,
      lastModified: new Date(post.date),
      changeFrequency: "monthly",
      priority: 0.7,
    })),
  ];
}
