import type { Metadata } from "next";

export const metadata: Metadata = { title: "Not Found" };

export default function NotFound() {
  return (
    <>
      <h1>Page not found</h1>
      <p>There&apos;s nothing here. Try the navigation above.</p>
    </>
  );
}
