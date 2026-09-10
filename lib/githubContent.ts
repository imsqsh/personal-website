import type { NotebookArticle } from "@/data/notebook";

const OWNER = "imsqsh";
const REPO = "personal-website";
const BRANCH = "main";
const DATA_PATH = "data/notebookArticles.json";
const API_ROOT = "https://api.github.com";

export class GitHubApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);
    this.name = "GitHubApiError";
    this.status = status;
  }
}

function decodeBase64Utf8(base64: string): string {
  const binary = atob(base64.replace(/\n/g, ""));
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder("utf-8").decode(bytes);
}

function encodeBase64Utf8(text: string): string {
  const bytes = new TextEncoder().encode(text);
  let binary = "";
  for (const byte of bytes) {
    binary += String.fromCharCode(byte);
  }
  return btoa(binary);
}

async function githubRequest(token: string, path: string, init?: RequestInit) {
  const res = await fetch(`${API_ROOT}${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: "application/vnd.github+json",
      ...(init?.headers ?? {}),
    },
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new GitHubApiError(
      res.status,
      `GitHub API error ${res.status}: ${body || res.statusText}`
    );
  }

  return res.json();
}

/** Verifies the token can read the repo — used to validate before storing it. */
export async function verifyToken(token: string): Promise<void> {
  await githubRequest(token, `/repos/${OWNER}/${REPO}`);
}

export async function fetchArticles(
  token: string
): Promise<{ articles: NotebookArticle[]; sha: string }> {
  const data = await githubRequest(
    token,
    `/repos/${OWNER}/${REPO}/contents/${DATA_PATH}?ref=${BRANCH}`
  );
  const articles = JSON.parse(decodeBase64Utf8(data.content)) as NotebookArticle[];
  return { articles, sha: data.sha as string };
}

export async function saveArticles(
  token: string,
  articles: NotebookArticle[],
  sha: string,
  message: string
): Promise<{ commitUrl: string }> {
  const data = await githubRequest(
    token,
    `/repos/${OWNER}/${REPO}/contents/${DATA_PATH}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: encodeBase64Utf8(JSON.stringify(articles, null, 2) + "\n"),
        sha,
        branch: BRANCH,
      }),
    }
  );
  return { commitUrl: data.commit?.html_url as string };
}

export function slugify(title: string): string {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
