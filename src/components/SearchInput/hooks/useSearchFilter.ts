import { useMemo, useState, useCallback } from "react";

export type Predicate<T> = (item: T, query: string) => boolean;

export function useSearchFilter<T>(list: T[], predicate: Predicate<T>) {
  const [query, setQuery] = useState("");
  const onSearch = useCallback((q: string) => setQuery(q), []);
  const filtered = useMemo(
    () => (query.trim() ? list.filter((i) => predicate(i, query)) : list),
    [list, query, predicate]
  );
  const total = list.length;
  const count = filtered.length;
  return {
    query,
    onSearch,
    filtered,
    total,
    count,
    hasNone: total === 0,
    hasNoMatches: total > 0 && count === 0,
  };
}
