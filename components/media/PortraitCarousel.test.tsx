import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { act, render, screen, fireEvent } from "@testing-library/react";
import { PortraitCarousel } from "./PortraitCarousel";

const images = [
  { src: "/a.jpg", alt: "Photo A" },
  { src: "/b.jpg", alt: "Photo B" },
  { src: "/c.jpg", alt: "Photo C" },
];

describe("PortraitCarousel", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it("renders every photo and a dot per photo, with the first selected", () => {
    render(<PortraitCarousel images={images} />);

    for (const image of images) {
      expect(screen.getByAltText(image.alt)).toBeInTheDocument();
    }

    const dots = screen.getAllByRole("tab");
    expect(dots).toHaveLength(images.length);
    expect(dots[0]).toHaveAttribute("aria-selected", "true");
    expect(dots[1]).toHaveAttribute("aria-selected", "false");
  });

  it("advances to the next photo automatically every 5 seconds", () => {
    render(<PortraitCarousel images={images} />);

    expect(screen.getAllByRole("tab")[0]).toHaveAttribute(
      "aria-selected",
      "true"
    );

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(screen.getAllByRole("tab")[1]).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("pauses auto-advance while hovered and resumes after", () => {
    const { container } = render(<PortraitCarousel images={images} />);
    const frame = container.firstChild as HTMLElement;

    fireEvent.mouseEnter(frame);
    act(() => {
      vi.advanceTimersByTime(10000);
    });
    expect(screen.getAllByRole("tab")[0]).toHaveAttribute(
      "aria-selected",
      "true"
    );

    fireEvent.mouseLeave(frame);
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(screen.getAllByRole("tab")[1]).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });

  it("jumps to a photo when its dot is clicked", () => {
    render(<PortraitCarousel images={images} />);

    fireEvent.click(screen.getAllByRole("tab")[2]);

    expect(screen.getAllByRole("tab")[2]).toHaveAttribute(
      "aria-selected",
      "true"
    );
  });
});
