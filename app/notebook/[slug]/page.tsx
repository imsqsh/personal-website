import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { notebookArticles } from "@/data/notebook";
import { formatDate } from "@/lib/formatDate";
import { MarkdownLite } from "@/components/typography/MarkdownLite";
import styles from "./page.module.css";

function findArticle(slug: string) {
  return notebookArticles.find((article) => article.slug === slug && article.body);
}

export function generateStaticParams() {
  const slugs = notebookArticles
    .filter((article) => article.body)
    .map((article) => ({ slug: article.slug }));

  // Static export requires at least one generated route. Until the first
  // admin-authored article exists, fall back to a param that resolves to
  // notFound() below rather than failing the build.
  return slugs.length > 0 ? slugs : [{ slug: "_placeholder" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  return { title: findArticle(slug)?.title ?? "Notebook" };
}

export default async function NotebookArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = findArticle(slug);

  if (!article) {
    notFound();
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <Link href="/notebook" className={styles.back}>
          ← Notebook
        </Link>
        <h1 className={styles.title}>{article.title}</h1>
        <p className={styles.byline}>
          {article.tags.join(", ")}
          {article.date ? ` · Published ${formatDate(article.date)}` : null}
        </p>
        <MarkdownLite text={article.body!} />
      </div>
    </div>
  );
}
