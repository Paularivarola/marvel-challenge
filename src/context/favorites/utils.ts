import type { Favorite } from "../types";

export const dedupeById = (list: Favorite[]): Favorite[] => {
  const seen = new Set<number>();
  const res: Favorite[] = [];
  for (const it of list) {
    if (!seen.has(it.id)) {
      seen.add(it.id);
      res.push(it);
    }
  }
  return res;
}