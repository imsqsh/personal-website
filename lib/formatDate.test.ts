import { describe, expect, it } from "vitest";
import { formatDate } from "./formatDate";

describe("formatDate", () => {
  it("formats an ISO date as a long-form date", () => {
    expect(formatDate("2026-09-10")).toBe("September 10, 2026");
  });
});
