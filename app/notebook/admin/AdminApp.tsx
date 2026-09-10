"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  fetchArticles,
  saveArticles,
  verifyToken,
  slugify,
  GitHubApiError,
} from "@/lib/githubContent";
import type { NotebookArticle } from "@/data/notebook";
import { ArticleForm, type ArticleFormValues } from "./ArticleForm";
import styles from "./AdminApp.module.css";

const TOKEN_KEY = "notebook-admin-token";

type Screen =
  | { kind: "loading" }
  | { kind: "error"; message: string }
  | { kind: "ready"; articles: NotebookArticle[] };

function uniqueSlug(base: string, articles: NotebookArticle[]): string {
  const root = base || "article";
  let slug = root;
  let n = 2;
  while (articles.some((article) => article.slug === slug)) {
    slug = `${root}-${n++}`;
  }
  return slug;
}

export function AdminApp() {
  const [token, setToken] = useState<string | null>(null);
  const [tokenInput, setTokenInput] = useState("");
  const [screen, setScreen] = useState<Screen>({ kind: "error", message: "" });
  const [editing, setEditing] = useState<"new" | string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  useEffect(() => {
    // Reading sessionStorage can't happen during the initial (server/build)
    // render, so this has to be an effect rather than a lazy initial state —
    // otherwise the static export's prerendered HTML and the first client
    // render would disagree on whether a token is present.
    const stored = sessionStorage.getItem(TOKEN_KEY);
    if (stored) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- syncing from sessionStorage on mount, not a cascading update
      setToken(stored);
    }
  }, []);

  useEffect(() => {
    if (token) {
      void load(token);
    }
  }, [token]);

  async function load(activeToken: string) {
    setScreen({ kind: "loading" });
    try {
      const { articles } = await fetchArticles(activeToken);
      setScreen({ kind: "ready", articles });
    } catch (err) {
      setScreen({
        kind: "error",
        message:
          err instanceof GitHubApiError ? err.message : "Couldn't load articles.",
      });
    }
  }

  async function handleConnect(event: FormEvent) {
    event.preventDefault();
    setScreen({ kind: "loading" });
    try {
      await verifyToken(tokenInput);
      sessionStorage.setItem(TOKEN_KEY, tokenInput);
      setToken(tokenInput);
    } catch {
      setScreen({
        kind: "error",
        message:
          "That token didn't work. Check it's a fine-grained personal access token scoped to this repo with Contents: Read and write access.",
      });
    }
  }

  function handleDisconnect() {
    sessionStorage.removeItem(TOKEN_KEY);
    setToken(null);
    setTokenInput("");
    setEditing(null);
    setNotice(null);
  }

  async function handleSave(values: ArticleFormValues) {
    if (!token) {
      return;
    }
    setSaving(true);
    setSaveError(null);
    try {
      // Refetch right before writing so we edit the latest version and
      // minimize the chance of a stale-sha conflict.
      const { articles, sha } = await fetchArticles(token);
      const isNew = editing === "new";
      const existing = isNew
        ? undefined
        : articles.find((article) => article.slug === editing);

      if (!isNew && !existing) {
        throw new Error("That article no longer exists — reload and try again.");
      }

      const slug = isNew ? uniqueSlug(slugify(values.title), articles) : existing!.slug;

      const entry: NotebookArticle = {
        ...existing,
        slug,
        title: values.title,
        tags: values.tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        date: values.date || undefined,
        ...(existing?.href ? {} : { body: values.body }),
      };

      const updated = isNew
        ? [...articles, entry]
        : articles.map((article) => (article.slug === slug ? entry : article));

      await saveArticles(
        token,
        updated,
        sha,
        `content: ${isNew ? "add" : "update"} notebook article "${values.title}"`
      );

      setEditing(null);
      setNotice(
        `Published "${values.title}" — GitHub Pages will redeploy in a minute or two.`
      );
      await load(token);
    } catch (err) {
      setSaveError(
        err instanceof GitHubApiError || err instanceof Error
          ? err.message
          : "Couldn't save. Try again."
      );
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.wrapInner}>
        <h1 className={styles.title}>Notebook Admin</h1>

        {!token ? (
          <form className={styles.tokenForm} onSubmit={handleConnect}>
            <p className={styles.intro}>
              Paste a GitHub personal access token — fine-grained, scoped to
              just this repo, with only Contents: Read and write permission.
              It&apos;s kept in this tab&apos;s session storage only and sent
              nowhere but api.github.com.
            </p>
            <input
              type="password"
              className={styles.tokenInput}
              value={tokenInput}
              onChange={(event) => setTokenInput(event.target.value)}
              placeholder="github_pat_…"
              required
            />
            <button
              type="submit"
              className={styles.primaryButton}
              disabled={screen.kind === "loading"}
            >
              {screen.kind === "loading" ? "Connecting…" : "Connect"}
            </button>
            {screen.kind === "error" && screen.message ? (
              <p className={styles.error}>{screen.message}</p>
            ) : null}
          </form>
        ) : (
          <>
            <div className={styles.toolbar}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={handleDisconnect}
              >
                Disconnect
              </button>
            </div>

            {notice ? <p className={styles.success}>{notice}</p> : null}
            {screen.kind === "loading" ? (
              <p className={styles.muted}>Loading…</p>
            ) : null}
            {screen.kind === "error" ? (
              <p className={styles.error}>{screen.message}</p>
            ) : null}

            {screen.kind === "ready" &&
              (editing ? (
                <ArticleForm
                  initial={
                    editing === "new"
                      ? undefined
                      : screen.articles.find((article) => article.slug === editing)
                  }
                  isHandCoded={
                    editing !== "new" &&
                    Boolean(
                      screen.articles.find((article) => article.slug === editing)?.href
                    )
                  }
                  saving={saving}
                  error={saveError}
                  onSave={handleSave}
                  onCancel={() => {
                    setEditing(null);
                    setSaveError(null);
                  }}
                />
              ) : (
                <>
                  <button
                    type="button"
                    className={styles.primaryButton}
                    onClick={() => {
                      setNotice(null);
                      setEditing("new");
                    }}
                  >
                    + New Article
                  </button>
                  <ul className={styles.list}>
                    {screen.articles.map((article) => (
                      <li key={article.slug} className={styles.row}>
                        <div className={styles.rowInfo}>
                          <span className={styles.rowTitle}>{article.title}</span>
                          {article.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                        <button
                          type="button"
                          className={styles.secondaryButton}
                          onClick={() => {
                            setNotice(null);
                            setEditing(article.slug);
                          }}
                        >
                          Edit
                        </button>
                      </li>
                    ))}
                  </ul>
                </>
              ))}
          </>
        )}
      </div>
    </div>
  );
}
