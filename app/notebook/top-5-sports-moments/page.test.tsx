import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import TopFiveSportsMomentsPage from "./page";
import { sportsMoments } from "@/data/sportsMoments";
import { topFiveSportsMoments } from "@/data/notebook";
import { formatDate } from "@/lib/formatDate";

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

  it("shows the article's tag and published date in the byline", () => {
    render(<TopFiveSportsMomentsPage />);

    expect(
      screen.getByText(
        `Sports · Published ${formatDate(topFiveSportsMoments.date!)}`
      )
    ).toBeInTheDocument();
  });
});
