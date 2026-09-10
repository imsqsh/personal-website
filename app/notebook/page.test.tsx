import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotebookPage from "./page";
import { notebookArticles } from "@/data/notebook";

describe("NotebookPage", () => {
  it("renders untagged articles as a general list", () => {
    render(<NotebookPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Notebook" })
    ).toBeInTheDocument();

    const general = notebookArticles.filter((a) => a.tags.length === 0);
    const placeholders = screen.getAllByText("TODO: post title");
    expect(placeholders).toHaveLength(general.length);
  });

  it("groups tagged articles under a heading per distinct tag", () => {
    render(<NotebookPage />);

    const tags = new Set(notebookArticles.flatMap((a) => a.tags));
    for (const tag of tags) {
      expect(
        screen.getByRole("heading", { level: 2, name: tag })
      ).toBeInTheDocument();
    }
  });

  it("links an article with an href, and renders others as plain text", () => {
    render(<NotebookPage />);

    const linked = notebookArticles.filter((a) => a.href);
    for (const article of linked) {
      expect(
        screen.getByRole("link", { name: article.title })
      ).toHaveAttribute("href", article.href);
    }
  });
});
