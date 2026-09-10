import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import LearningsPage from "./page";
import { learningCategories } from "@/data/learnings";

describe("LearningsPage", () => {
  it("renders a heading and article list for every category", () => {
    render(<LearningsPage />);

    expect(learningCategories).toHaveLength(6);

    for (const category of learningCategories) {
      expect(
        screen.getByRole("heading", { level: 2, name: category.name })
      ).toBeInTheDocument();
    }

    const totalArticles = learningCategories.reduce(
      (sum, category) => sum + category.articles.length,
      0
    );
    const linkedArticles = learningCategories
      .flatMap((category) => category.articles)
      .filter((article) => article.href);

    const placeholderItems = screen.getAllByText("TODO: article title");
    expect(placeholderItems).toHaveLength(totalArticles - linkedArticles.length);

    for (const article of linkedArticles) {
      const link = screen.getByRole("link", { name: article.title });
      expect(link).toHaveAttribute("href", article.href);
    }
  });
});
