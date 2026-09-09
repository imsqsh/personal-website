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

  it("renders a link for every real social entry in siteConfig", () => {
    render(<HomePage />);

    for (const link of siteConfig.social) {
      if (link.isPlaceholder) continue;
      expect(screen.getByRole("link", { name: link.label })).toHaveAttribute(
        "href",
        link.href
      );
    }
  });

  it("renders placeholder social entries as non-interactive text, not dead links", () => {
    render(<HomePage />);

    const placeholders = siteConfig.social.filter((link) => link.isPlaceholder);
    expect(placeholders.length).toBeGreaterThan(0);

    for (const link of placeholders) {
      expect(
        screen.queryByRole("link", { name: link.label })
      ).not.toBeInTheDocument();
      expect(screen.getByText(link.label)).toBeInTheDocument();
    }
  });
});
