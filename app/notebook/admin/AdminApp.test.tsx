import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AdminApp } from "./AdminApp";
import * as github from "@/lib/githubContent";
import type { NotebookArticle } from "@/data/notebook";

vi.mock("@/lib/githubContent", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@/lib/githubContent")>();
  return {
    ...actual,
    verifyToken: vi.fn(),
    fetchArticles: vi.fn(),
    saveArticles: vi.fn(),
  };
});

const sportsMoments: NotebookArticle = {
  slug: "top-5-sports-moments",
  title: "Top 5 Sports Moments",
  tags: ["Sports"],
  date: "2026-09-10",
  href: "/notebook/top-5-sports-moments",
};

function connect() {
  fireEvent.change(screen.getByPlaceholderText("github_pat_…"), {
    target: { value: "test-token" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Connect" }));
}

describe("AdminApp", () => {
  beforeEach(() => {
    sessionStorage.clear();
    vi.mocked(github.verifyToken).mockResolvedValue(undefined);
    vi.mocked(github.fetchArticles).mockResolvedValue({
      articles: [sportsMoments],
      sha: "sha-1",
    });
    vi.mocked(github.saveArticles).mockResolvedValue({
      commitUrl: "https://github.com/imsqsh/personal-website/commit/abc",
    });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("shows the token gate when no token is stored", () => {
    render(<AdminApp />);
    expect(screen.getByPlaceholderText("github_pat_…")).toBeInTheDocument();
  });

  it("shows a friendly error when the token is rejected", async () => {
    vi.mocked(github.verifyToken).mockRejectedValue(new Error("401"));
    render(<AdminApp />);

    connect();

    expect(await screen.findByText(/that token didn't work/i)).toBeInTheDocument();
  });

  it("lists existing articles after connecting", async () => {
    render(<AdminApp />);
    connect();

    expect(await screen.findByText("Top 5 Sports Moments")).toBeInTheDocument();
    expect(screen.getByText("Sports")).toBeInTheDocument();
  });

  it("hides the body field and shows a note when editing a hand-coded article", async () => {
    render(<AdminApp />);
    connect();

    fireEvent.click(await screen.findByRole("button", { name: "Edit" }));

    expect(screen.getByText(/hand-coded page/i)).toBeInTheDocument();
    expect(screen.queryByLabelText("Body")).not.toBeInTheDocument();
  });

  it("publishes a new article with a slugified title and tag list", async () => {
    render(<AdminApp />);
    connect();

    fireEvent.click(await screen.findByRole("button", { name: "+ New Article" }));

    fireEvent.change(screen.getByLabelText("Title"), {
      target: { value: "Learning the Moonlight Sonata" },
    });
    fireEvent.change(screen.getByLabelText("Tags (comma-separated)"), {
      target: { value: "Music, Piano" },
    });
    fireEvent.change(screen.getByLabelText("Body"), {
      target: { value: "First paragraph.\n> A quote." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    await waitFor(() => expect(github.saveArticles).toHaveBeenCalledTimes(1));
    const [, articles, sha, message] = vi.mocked(github.saveArticles).mock.calls[0];
    expect(sha).toBe("sha-1");
    expect(message).toContain("add");
    expect(articles).toHaveLength(2);
    const added = articles[1];
    expect(added.slug).toBe("learning-the-moonlight-sonata");
    expect(added.tags).toEqual(["Music", "Piano"]);
    expect(added.body).toBe("First paragraph.\n> A quote.");

    expect(
      await screen.findByText(/published "learning the moonlight sonata"/i)
    ).toBeInTheDocument();
  });

  it("shows an error and keeps the form open if saving fails", async () => {
    vi.mocked(github.saveArticles).mockRejectedValue(new Error("409 conflict"));
    render(<AdminApp />);
    connect();

    fireEvent.click(await screen.findByRole("button", { name: "+ New Article" }));
    fireEvent.change(screen.getByLabelText("Title"), { target: { value: "Draft" } });
    fireEvent.change(screen.getByLabelText("Body"), { target: { value: "Text." } });
    fireEvent.click(screen.getByRole("button", { name: "Publish" }));

    expect(await screen.findByText("409 conflict")).toBeInTheDocument();
    expect(screen.getByLabelText("Title")).toBeInTheDocument();
  });
});
