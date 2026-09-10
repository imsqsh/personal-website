import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { usePathname } from "next/navigation";
import { HeaderName } from "./HeaderName";

vi.mock("next/navigation", () => ({
  usePathname: vi.fn(),
}));

describe("HeaderName", () => {
  it("renders nothing on the home page", () => {
    vi.mocked(usePathname).mockReturnValue("/");

    const { container } = render(<HeaderName />);

    expect(container).toBeEmptyDOMElement();
  });

  it("renders a Home link on every other page", () => {
    vi.mocked(usePathname).mockReturnValue("/notebook/");

    render(<HeaderName />);

    expect(screen.getByRole("link", { name: "Home" })).toHaveAttribute(
      "href",
      "/"
    );
  });
});
