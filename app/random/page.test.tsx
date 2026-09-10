import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import RandomPage from "./page";
import { randomCategories } from "@/data/random";

describe("RandomPage", () => {
  it("renders a heading and article list for every category", () => {
    render(<RandomPage />);

    expect(randomCategories).toHaveLength(6);

    for (const category of randomCategories) {
      expect(
        screen.getByRole("heading", { level: 2, name: category.name })
      ).toBeInTheDocument();
    }

    const totalArticles = randomCategories.reduce(
      (sum, category) => sum + category.articles.length,
      0
    );
    const linkedArticles = randomCategories
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
