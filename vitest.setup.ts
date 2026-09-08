import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { createElement, type ImgHTMLAttributes } from "react";

// next/image relies on Next's build/runtime pipeline for its loader.
// Under Vitest (plain Node, no Next process) it's mocked to a plain <img>
// so component tests can assert on src/alt/etc. without that pipeline.
vi.mock("next/image", () => ({
  __esModule: true,
  default: (props: ImgHTMLAttributes<HTMLImageElement>) =>
    createElement("img", props),
}));
