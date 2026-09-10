import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotebookPage from "./page";
import { notebookArticles } from "@/data/notebook";

describe("NotebookPage", () => {
  it("renders every article as a single flat list", () => {
    render(<NotebookPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Notebook" })
    ).toBeInTheDocument();

    for (const article of notebookArticles) {
      expect(screen.getByText(article.title)).toBeInTheDocument();
    }

    expect(screen.queryAllByRole("heading", { level: 2 })).toHaveLength(0);
  });

  it("shows each article's tags next to its title", () => {
    render(<NotebookPage />);

    for (const article of notebookArticles) {
      for (const tag of article.tags) {
        expect(screen.getByText(tag)).toBeInTheDocument();
      }
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
