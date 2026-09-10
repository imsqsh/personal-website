import { afterEach, describe, expect, it, vi } from "vitest";
import { fetchArticles, saveArticles, slugify } from "./githubContent";
import type { NotebookArticle } from "@/data/notebook";

describe("slugify", () => {
  it("lowercases, hyphenates, and strips punctuation", () => {
    expect(slugify("Mbappé's Two Goals!")).toBe("mbapp-s-two-goals");
    expect(slugify("  Leading and trailing  ")).toBe("leading-and-trailing");
  });
});

describe("fetchArticles / saveArticles", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("round-trips UTF-8 content (accents, em dashes) through base64", async () => {
    const articles: NotebookArticle[] = [
      {
        slug: "mbappe-magic",
        title: "Mbappé Magic — a night to remember",
        tags: ["Sports"],
        body: "Some prose with an em dash — and an accent: café.",
      },
    ];
    const encoded = Buffer.from(
      JSON.stringify(articles),
      "utf-8"
    ).toString("base64");

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ content: encoded, sha: "abc123" }),
      text: async () => "",
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("atob", (b64: string) => Buffer.from(b64, "base64").toString("binary"));
    vi.stubGlobal("btoa", (bin: string) => Buffer.from(bin, "binary").toString("base64"));

    const result = await fetchArticles("fake-token");

    expect(result.sha).toBe("abc123");
    expect(result.articles).toEqual(articles);
  });

  it("sends a base64-encoded body and the given sha on save", async () => {
    const articles: NotebookArticle[] = [
      { slug: "a", title: "A", tags: [] },
    ];

    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ commit: { html_url: "https://github.com/x/y/commit/z" } }),
      text: async () => "",
    });
    vi.stubGlobal("fetch", fetchMock);
    vi.stubGlobal("btoa", (bin: string) => Buffer.from(bin, "binary").toString("base64"));

    const result = await saveArticles("fake-token", articles, "sha-1", "commit message");

    expect(result.commitUrl).toBe("https://github.com/x/y/commit/z");
    const [, init] = fetchMock.mock.calls[0];
    const body = JSON.parse(init.body as string);
    expect(body.sha).toBe("sha-1");
    expect(body.message).toBe("commit message");
    expect(body.branch).toBe("main");
    expect(typeof body.content).toBe("string");
  });

  it("throws GitHubApiError on a non-ok response", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: false,
      status: 401,
      statusText: "Unauthorized",
      text: async () => "Bad credentials",
    });
    vi.stubGlobal("fetch", fetchMock);

    await expect(fetchArticles("bad-token")).rejects.toThrow(/401/);
  });
});
