import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";
import { siteConfig } from "@/data/site";

describe("Footer", () => {
  it("renders the copyright with the current year and site name", () => {
    render(<Footer />);

    const year = new Date().getFullYear();
    expect(
      screen.getByText(`© ${year} ${siteConfig.name}`)
    ).toBeInTheDocument();
  });

  it("renders an icon link for every real social entry, labeled by name", () => {
    render(<Footer />);

    for (const link of siteConfig.social) {
      if (link.isPlaceholder) continue;
      expect(
        screen.getByRole("link", { name: link.label })
      ).toHaveAttribute("href", link.href);
    }
  });

  it("opens every real social link in a new tab safely", () => {
    render(<Footer />);

    for (const link of siteConfig.social) {
      if (link.isPlaceholder) continue;
      const anchor = screen.getByRole("link", { name: link.label });
      expect(anchor).toHaveAttribute("target", "_blank");
      expect(anchor).toHaveAttribute("rel", "noopener noreferrer");
    }
  });

  it("renders any placeholder social entries as non-interactive, not dead links", () => {
    render(<Footer />);

    const placeholders = siteConfig.social.filter(
      (link) => link.isPlaceholder
    );

    for (const link of placeholders) {
      expect(
        screen.queryByRole("link", { name: link.label })
      ).not.toBeInTheDocument();
    }
  });
});
