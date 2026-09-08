import { afterEach, describe, expect, it } from "vitest";
import { mkdtemp, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { z } from "zod";
import { listMDXSlugs, loadMDXCollection, loadMDXEntry } from "./content";

const frontmatterSchema = z.object({
  title: z.string(),
  summary: z.string(),
});

describe("content loader", () => {
  let dir: string;

  afterEach(async () => {
    if (dir) {
      await rm(dir, { recursive: true, force: true });
    }
  });

  it("lists mdx slugs from a collection directory, ignoring non-mdx files", async () => {
    dir = await mkdtemp(path.join(tmpdir(), "content-test-"));
    await writeFile(
      path.join(dir, "first-post.mdx"),
      "---\ntitle: First\nsummary: One\n---\nBody"
    );
    await writeFile(
      path.join(dir, "second-post.mdx"),
      "---\ntitle: Second\nsummary: Two\n---\nBody"
    );
    await writeFile(path.join(dir, "notes.txt"), "ignore me");

    const slugs = await listMDXSlugs(dir);

    expect(slugs).toEqual(["first-post", "second-post"]);
  });

  it("loads and validates a single entry's frontmatter", async () => {
    dir = await mkdtemp(path.join(tmpdir(), "content-test-"));
    await writeFile(
      path.join(dir, "hello-world.mdx"),
      "---\ntitle: Hello World\nsummary: A test entry\n---\n\nBody content."
    );

    const entry = await loadMDXEntry(dir, "hello-world", frontmatterSchema);

    expect(entry.slug).toBe("hello-world");
    expect(entry.frontmatter).toEqual({
      title: "Hello World",
      summary: "A test entry",
    });
    expect(entry.content).toBeDefined();
  });

  it("throws a descriptive error when frontmatter fails schema validation", async () => {
    dir = await mkdtemp(path.join(tmpdir(), "content-test-"));
    await writeFile(
      path.join(dir, "broken.mdx"),
      "---\ntitle: Missing summary\n---\n\nBody."
    );

    await expect(
      loadMDXEntry(dir, "broken", frontmatterSchema)
    ).rejects.toThrow(/broken\.mdx/);
  });

  it("loads every entry in a collection", async () => {
    dir = await mkdtemp(path.join(tmpdir(), "content-test-"));
    await writeFile(
      path.join(dir, "a.mdx"),
      "---\ntitle: A\nsummary: First\n---\nBody"
    );
    await writeFile(
      path.join(dir, "b.mdx"),
      "---\ntitle: B\nsummary: Second\n---\nBody"
    );

    const entries = await loadMDXCollection(dir, frontmatterSchema);

    expect(entries.map((entry) => entry.slug)).toEqual(["a", "b"]);
  });
});
