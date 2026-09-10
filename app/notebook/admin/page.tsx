import type { Metadata } from "next";
import { AdminApp } from "./AdminApp";

export const metadata: Metadata = {
  title: "Notebook Admin",
  robots: { index: false, follow: false },
};

export default function NotebookAdminPage() {
  return <AdminApp />;
}
