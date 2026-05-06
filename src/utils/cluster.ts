import { getCollection, type CollectionEntry } from "astro:content";

export type WritingEntry = CollectionEntry<"writing">;

const isPublished = (entry: WritingEntry): boolean => {
  if (entry.data.draft) return false;
  if (import.meta.env.PROD && entry.data.draft === false) return true;
  return import.meta.env.DEV ? true : !entry.data.draft;
};

export async function getAllPublished(): Promise<WritingEntry[]> {
  const all = await getCollection("writing", isPublished);
  return all.sort(
    (a, b) => b.data.publishDate.valueOf() - a.data.publishDate.valueOf()
  );
}

export async function getCornerstone(): Promise<WritingEntry | null> {
  const all = await getAllPublished();
  return all.find((e) => e.data.cornerstone === true) ?? null;
}

export async function getSpokes(cornerstoneSlug: string): Promise<WritingEntry[]> {
  const all = await getAllPublished();
  return all.filter((e) => e.data.spokeOf === cornerstoneSlug);
}

export async function getSiblingsOf(entry: WritingEntry, limit = 3): Promise<WritingEntry[]> {
  const all = await getAllPublished();
  if (entry.data.cornerstone) {
    return all.filter((e) => e.data.spokeOf === entry.slug).slice(0, limit);
  }
  if (!entry.data.spokeOf) {
    return all.filter((e) => e.slug !== entry.slug).slice(0, limit);
  }
  const siblings = all.filter(
    (e) => e.data.spokeOf === entry.data.spokeOf && e.slug !== entry.slug
  );
  return siblings.slice(0, limit);
}
