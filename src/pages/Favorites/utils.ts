import type { Favorite } from "../../context/types";

const normalize = (s: string): string =>
  s
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

export function favoriteMatchesQuery(
  favorite: Favorite,
  query: string
): boolean {
  if (!query) return true;
  const q = normalize(query);

  const idStr = String((favorite as Favorite).id ?? "");
  if (/^\d+$/.test(q) && idStr.includes(q)) return true;

  const fields: Array<unknown> = [favorite.name];

  return fields.some(
    (v): v is string => typeof v === "string" && normalize(v).includes(q)
  );
}

export function filterFavorites(list: Favorite[], query: string): Favorite[] {
  const q = query.trim();
  if (!q) return list;
  return list.filter((f) => favoriteMatchesQuery(f, q));
}

export const EMPTY_STATE_MSG =
  "You haven't saved any favorites yet. Tap the heart icon on a character to add it here.";
export const NO_MATCHES_MSG = (q: string) =>
  `No favorites match “${q}”. Try a different keyword.`;
