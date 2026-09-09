import { describe, expect, it } from "vitest";
import { render, screen } from "@testing-library/react";
import NotebookPage from "./page";
import { notebookPlaceholders } from "@/data/notebook";

describe("NotebookPage", () => {
  it("renders a single section with one placeholder line per entry", () => {
    render(<NotebookPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Notebook" })
    ).toBeInTheDocument();

    const entries = screen.getAllByText("TODO: post title");
    expect(entries).toHaveLength(notebookPlaceholders.length);
  });
});
