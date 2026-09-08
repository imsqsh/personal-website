import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Nav } from "./Nav";
import { siteConfig } from "@/data/site";

describe("Nav", () => {
  it("renders a link for every primary nav item defined in site config", () => {
    render(<Nav />);

    for (const item of siteConfig.nav) {
      const link = screen.getByRole("link", { name: item.label });
      expect(link).toHaveAttribute("href", item.href);
    }
  });
});
