import type { Metadata } from "next";
import type { ReactNode } from "react";
import { fontSerif, fontSans, fontMono } from "@/lib/fonts";
import { PageShell } from "@/components/layout/PageShell";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Yash Mulimani",
    template: "%s — Yash Mulimani",
  },
  description: "TODO: Add a one-line site description for search/social previews.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en"
      className={`${fontSerif.variable} ${fontSans.variable} ${fontMono.variable}`}
    >
      <body>
        <PageShell>{children}</PageShell>
      </body>
    </html>
  );
}
