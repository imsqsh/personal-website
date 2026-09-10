import "@testing-library/jest-dom/vitest";
import { vi } from "vitest";
import { createElement, type ImgHTMLAttributes } from "react";

// jsdom doesn't implement matchMedia. Default to "no preference" so
// components that check prefers-reduced-motion (e.g. PortraitCarousel)
// don't crash; individual tests can override with vi.spyOn as needed.
window.matchMedia =
  window.matchMedia ||
  vi.fn().mockImplementation((query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));

// next/image relies on Next's build/runtime pipeline for its loader.
// Under Vitest (plain Node, no Next process) it's mocked to a plain <img>
// so component tests can assert on src/alt/etc. without that pipeline.
// `fill`/`priority` are Next-only props the real component strips before
// reaching the DOM — drop them here too instead of forwarding to <img>.
vi.mock("next/image", () => ({
  __esModule: true,
  // Leading underscores mark these as intentionally unused (see the
  // no-unused-vars override in eslint.config.mjs) — destructured only to
  // exclude them from the DOM props spread below.
  default: ({
    fill: _fill,
    priority: _priority,
    ...props
  }: ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
  }) => createElement("img", props),
}));
