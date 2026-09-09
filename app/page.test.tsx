import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { siteConfig } from "@/data/site";

describe("HomePage", () => {
  it("renders identity content from siteConfig", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: siteConfig.name })
    ).toBeInTheDocument();
    expect(screen.getByText(siteConfig.tagline)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.intro)).toBeInTheDocument();
    expect(screen.getByText(siteConfig.location)).toBeInTheDocument();
  });

  it("renders a link for every social entry in siteConfig", () => {
    render(<HomePage />);

    for (const link of siteConfig.social) {
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });
});
