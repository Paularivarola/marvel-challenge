import type { IssueResponse } from "./types";

const toFiniteNumbers = (xs: Array<unknown>): number[] =>
  xs.filter((n): n is number => Number.isFinite(n));

export const stableUnique = (xs: number[]): number[] => {
  const seen = new Set<number>();
  const out: number[] = [];
  for (const n of xs) {
    if (!seen.has(n)) {
      seen.add(n);
      out.push(n);
    }
  }
  return out;
};

export const limitIds = <T>(xs: readonly T[], max: number): T[] =>
  xs.slice(0, Math.max(0, max));

export const pickIssueCreditIds = (resp: IssueResponse): number[] => {
  const credits = resp?.results?.issue_credits ?? [];
  return toFiniteNumbers(credits.map((c) => c?.id));
};
