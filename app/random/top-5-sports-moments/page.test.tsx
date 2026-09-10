import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TopFiveSportsMomentsPage from "./page";
import { sportsMoments } from "@/data/sportsMoments";

describe("TopFiveSportsMomentsPage", () => {
  it("renders a numbered heading and a video for each moment", () => {
    render(<TopFiveSportsMomentsPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Top 5 Sports Moments" })
    ).toBeInTheDocument();

    const headings = screen.getAllByRole("heading", { level: 2 });
    expect(headings).toHaveLength(sportsMoments.length);

    for (const moment of sportsMoments) {
      expect(screen.getByLabelText(moment.title)).toBeInTheDocument();
    }
  });
});
