import fs from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { parse as parseYaml } from "yaml";
import { z } from "zod";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const COLLECTIONS = {
  projects: path.join(CONTENT_ROOT, "projects"),
  blog: path.join(CONTENT_ROOT, "blog"),
};

const imagePath = z
  .string()
  .refine(
    (value) => value.startsWith("/images/"),
    "Image paths must start with /images/ and point into public/images.",
  );

const sharedSchema = z.object({
  title: z.string().min(1),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Use a lowercase URL-safe slug."),
  date: z.coerce.date(),
  coverImage: imagePath.optional(),
});

const projectSchema = sharedSchema.extend({
  description: z.string().min(1),
  status: z.string().min(1),
  featured: z.boolean().default(false),
  technologies: z.array(z.string().min(1)).default([]),
  github: z.string().url().optional(),
  liveDemo: z.string().url().optional(),
});

const blogSchema = sharedSchema.extend({
  summary: z.string().min(1),
  tags: z.array(z.string().min(1)).default([]),
});

const schemas = {
  projects: projectSchema,
  blog: blogSchema,
};

async function walk(directory) {
  const entries = await fs.readdir(directory, { withFileTypes: true });
  const files = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name);
      return entry.isDirectory() ? walk(entryPath) : entryPath;
    }),
  );

  return files.flat().filter((file) => file.endsWith(".mdx"));
}

function splitFrontmatter(source, filePath) {
  const match = source.match(/^---\s*\r?\n([\s\S]*?)\r?\n---\s*(?:\r?\n|$)/);
  if (!match) {
    throw new Error(`Missing YAML frontmatter in ${filePath}`);
  }

  return {
    data: parseYaml(match[1]) || {},
    body: source.slice(match[0].length),
  };
}

function normalizeMetadata(collection, rawMetadata, filePath, body) {
  const result = schemas[collection].safeParse(rawMetadata);

  if (!result.success) {
    const details = result.error.issues
      .map((issue) => `${issue.path.join(".") || "frontmatter"}: ${issue.message}`)
      .join("\n");
    throw new Error(`Invalid frontmatter in ${filePath}\n${details}`);
  }

  const metadata = result.data;
  return {
    ...metadata,
    date: metadata.date.toISOString(),
    readingTime: getReadingTime(body),
  };
}

function getReadingTime(body) {
  const words = body
    .replace(/<[^>]+>/g, " ")
    .replace(/[`#>*_[\]()-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

async function loadCollection(collection) {
  const directory = COLLECTIONS[collection];
  if (!directory) {
    throw new Error(`Unknown content collection: ${collection}`);
  }

  const filePaths = await walk(directory);
  const entries = await Promise.all(
    filePaths.map(async (filePath) => {
      const source = await fs.readFile(filePath, "utf8");
      const { data, body } = splitFrontmatter(source, filePath);
      const metadata = normalizeMetadata(collection, data, filePath, body);

      return {
        ...metadata,
        body,
        filePath,
      };
    }),
  );

  const seen = new Set();
  for (const entry of entries) {
    if (seen.has(entry.slug)) {
      throw new Error(
        `Duplicate slug "${entry.slug}" found in content/${collection}.`,
      );
    }
    seen.add(entry.slug);
  }

  return entries.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export const getAllProjects = cache(() => loadCollection("projects"));
export const getAllPosts = cache(() => loadCollection("blog"));

export async function getProjectBySlug(slug) {
  const projects = await getAllProjects();
  return projects.find((project) => project.slug === slug) || null;
}

export async function getPostBySlug(slug) {
  const posts = await getAllPosts();
  return posts.find((post) => post.slug === slug) || null;
}

export function withoutBody(entry) {
  const { body: _body, filePath: _filePath, ...metadata } = entry;
  return metadata;
}
