import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import type { ComponentType, ReactElement } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import { z } from "zod";

export type MDXEntry<TFrontmatter> = {
  slug: string;
  frontmatter: TFrontmatter;
  content: ReactElement;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- MDX component maps are heterogeneous; each component's own props differ.
type MDXComponents = Record<string, ComponentType<any>>;

export async function listMDXSlugs(dir: string): Promise<string[]> {
  const files = await readdir(dir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""))
    .sort();
}

export async function loadMDXEntry<TFrontmatter>(
  dir: string,
  slug: string,
  schema: z.ZodType<TFrontmatter>,
  components?: MDXComponents
): Promise<MDXEntry<TFrontmatter>> {
  const filePath = path.join(dir, `${slug}.mdx`);
  const source = await readFile(filePath, "utf8");

  const { content, frontmatter } = await compileMDX<Record<string, unknown>>({
    source,
    options: { parseFrontmatter: true },
    components,
  });

  const parsed = schema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new Error(
      `Invalid frontmatter in ${filePath}: ${parsed.error.message}`
    );
  }

  return { slug, frontmatter: parsed.data, content };
}

export async function loadMDXCollection<TFrontmatter>(
  dir: string,
  schema: z.ZodType<TFrontmatter>,
  components?: MDXComponents
): Promise<MDXEntry<TFrontmatter>[]> {
  const slugs = await listMDXSlugs(dir);
  return Promise.all(
    slugs.map((slug) => loadMDXEntry(dir, slug, schema, components))
  );
}
