import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import { Figure } from "./Figure";
import styles from "./Figure.module.css";

describe("Figure", () => {
  it("renders the image with required alt text and an optional caption", () => {
    render(
      <Figure
        src="/images/projects/example/hero.jpg"
        alt="Example project screenshot"
        width={800}
        height={600}
        caption="A test caption"
      />
    );

    expect(
      screen.getByRole("img", { name: "Example project screenshot" })
    ).toBeInTheDocument();
    expect(screen.getByText("A test caption")).toBeInTheDocument();
  });

  it("omits the figcaption element when no caption is provided", () => {
    const { container } = render(
      <Figure
        src="/images/projects/example/hero.jpg"
        alt="Example project screenshot"
        width={800}
        height={600}
      />
    );

    expect(container.querySelector("figcaption")).toBeNull();
  });

  it("composes a passed className with the base image styling instead of replacing it", () => {
    render(
      <Figure
        src="/images/projects/example/hero.jpg"
        alt="Example project screenshot"
        width={800}
        height={600}
        className="custom-class"
      />
    );

    const img = screen.getByRole("img", { name: "Example project screenshot" });
    expect(img.className).toContain(styles.image);
    expect(img.className).toContain("custom-class");
  });
});
