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

    const articleItems = screen.getAllByText("TODO: article title");
    const totalArticles = learningCategories.reduce(
      (sum, category) => sum + category.articles.length,
      0
    );
    expect(articleItems).toHaveLength(totalArticles);
  });
});
