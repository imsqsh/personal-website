"use client";

import { useState, type FormEvent } from "react";
import type { NotebookArticle } from "@/data/notebook";
import styles from "./ArticleForm.module.css";

export type ArticleFormValues = {
  title: string;
  tags: string;
  date: string;
  body: string;
};

type ArticleFormProps = {
  /** Existing article being edited, or undefined when creating a new one. */
  initial?: NotebookArticle;
  /** True if this article has a hand-coded page — body isn't editable here. */
  isHandCoded: boolean;
  saving: boolean;
  error: string | null;
  onSave: (values: ArticleFormValues) => void;
  onCancel: () => void;
};

export function ArticleForm({
  initial,
  isHandCoded,
  saving,
  error,
  onSave,
  onCancel,
}: ArticleFormProps) {
  const [title, setTitle] = useState(initial?.title ?? "");
  const [tags, setTags] = useState(initial?.tags.join(", ") ?? "");
  const [date, setDate] = useState(
    initial?.date ?? new Date().toISOString().slice(0, 10)
  );
  const [body, setBody] = useState(initial?.body ?? "");

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onSave({ title, tags, date, body });
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.field}>
        <label className={styles.label} htmlFor="article-title">
          Title
        </label>
        <input
          id="article-title"
          className={styles.input}
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          required
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="article-tags">
          Tags (comma-separated)
        </label>
        <input
          id="article-tags"
          className={styles.input}
          value={tags}
          onChange={(event) => setTags(event.target.value)}
          placeholder="Music, Piano"
        />
      </div>

      <div className={styles.field}>
        <label className={styles.label} htmlFor="article-date">
          Date
        </label>
        <input
          id="article-date"
          type="date"
          className={styles.input}
          value={date}
          onChange={(event) => setDate(event.target.value)}
        />
      </div>

      {isHandCoded ? (
        <p className={styles.note}>
          This article has a hand-coded page — edit its content directly in{" "}
          <code>app/notebook/{initial?.slug}/page.tsx</code>. Only the title,
          tags, and date above can be changed here.
        </p>
      ) : (
        <div className={styles.field}>
          <label className={styles.label} htmlFor="article-body">
            Body
          </label>
          <p id="article-body-hint" className={styles.hint}>
            Blank line = new paragraph. <code>{"> text"}</code> = quote.{" "}
            <code>{"![alt](/images/notebook/x.jpg)"}</code> = image (upload the
            file to that folder yourself first).
          </p>
          <textarea
            id="article-body"
            aria-describedby="article-body-hint"
            className={styles.textarea}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            rows={14}
            required
          />
        </div>
      )}

      {error ? <p className={styles.error}>{error}</p> : null}

      <div className={styles.actions}>
        <button type="submit" className={styles.primaryButton} disabled={saving}>
          {saving ? "Publishing…" : "Publish"}
        </button>
        <button
          type="button"
          className={styles.secondaryButton}
          onClick={onCancel}
          disabled={saving}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
