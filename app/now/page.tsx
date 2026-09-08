import type { Metadata } from "next";

export const metadata: Metadata = { title: "Now" };

export default function NowPage() {
  return (
    <>
      <h1>Now</h1>
      <p>
        TODO: Replace with current focus — see
        docs/superpowers/specs/2026-09-08-personal-website-design.md.
      </p>
    </>
  );
}
