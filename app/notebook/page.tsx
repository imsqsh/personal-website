import type { Metadata } from "next";

export const metadata: Metadata = { title: "Notebook" };

export default function NotebookPage() {
  return (
    <>
      <h1>Notebook</h1>
      <p>Nothing published yet — check back soon.</p>
    </>
  );
}
