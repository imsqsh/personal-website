import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import HomePage from "./page";
import { siteConfig } from "@/data/site";
import { education, experience } from "@/data/resume";

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

  it("links to the Notebook from the explore line", () => {
    render(<HomePage />);

    expect(screen.getByRole("link", { name: "Notebook" })).toHaveAttribute(
      "href",
      "/notebook"
    );
  });

  it("renders every education entry with its logo and blurb", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Education" })
    ).toBeInTheDocument();

    for (const entry of education) {
      expect(screen.getByText(entry.organization)).toBeInTheDocument();
      expect(screen.getByText(entry.blurb)).toBeInTheDocument();
      expect(
        screen.getByAltText(`${entry.organization} logo`)
      ).toBeInTheDocument();
    }
  });

  it("renders every experience entry with its logo and blurb", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 2, name: "Experience" })
    ).toBeInTheDocument();

    for (const entry of experience) {
      expect(screen.getByText(entry.organization)).toBeInTheDocument();
      expect(screen.getByText(entry.blurb)).toBeInTheDocument();
      expect(
        screen.getByAltText(`${entry.organization} logo`)
      ).toBeInTheDocument();
    }
  });
});
