import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Quote } from "./Quote";

describe("Quote", () => {
  it("renders the quoted text", () => {
    render(<Quote>Simplicity is the ultimate sophistication.</Quote>);

    expect(
      screen.getByText("Simplicity is the ultimate sophistication.")
    ).toBeInTheDocument();
  });

  it("renders a citation when given one", () => {
    render(<Quote cite="Leonardo da Vinci">A quote</Quote>);

    expect(screen.getByText("— Leonardo da Vinci")).toBeInTheDocument();
  });

  it("omits the citation when none is given", () => {
    const { container } = render(<Quote>A quote</Quote>);

    expect(container.querySelector("cite")).toBeNull();
  });
});
