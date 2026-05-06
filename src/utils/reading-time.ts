/**
 * Compute reading time in minutes from a word count.
 * Baseline: 200 words per minute (average adult reading speed).
 * Always returns a minimum of 1 minute.
 */
export function readingTimeFromWordCount(wordCount: number): number {
  const minutes = Math.ceil(wordCount / 200);
  return Math.max(1, minutes);
}

/**
 * Compute reading time directly from raw markdown text.
 * Strips frontmatter, code fences, and HTML before counting.
 */
export function readingTimeFromMarkdown(markdown: string): number {
  const stripped = markdown
    .replace(/^---[\s\S]*?---/, "")
    .replace(/```[\s\S]*?```/g, "")
    .replace(/<[^>]*>/g, "");
  const wordCount = stripped.trim().split(/\s+/).filter(Boolean).length;
  return readingTimeFromWordCount(wordCount);
}
