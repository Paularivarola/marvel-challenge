import { useQuery } from "@tanstack/react-query";
import { ApiError } from "./apiError";
import {
  fetchGetCharacterById,
  fetchGetCharacters,
  fetchGetCharactersByNameSorted,
  fetchGetIssuesByCharacter,
} from "./request";
import type {
  ComicResult,
  RelatedComicCharacterResult,
  SortOrder,
} from "./types";
import { MAX_ISSUE_IDS, MAX_LIMIT, OFFSET, SORT_ORDER } from "./constants";

export const QueryKeys = {
  characters: () => ["characters"],
  charactersByName: (
    name: string,
    order: SortOrder,
    limit = MAX_LIMIT,
    offset = OFFSET
  ) => ["characters-by-name", { name, order, limit, offset }],
  characterById: (id: number) => ["character-by-id", { id }],
  issuesByCharacter: (
    id: string,
    order: SortOrder = SORT_ORDER.DESC,
    limit = MAX_ISSUE_IDS,
    offset = OFFSET
  ) => ["issues-by-character", { id, order, limit, offset }],
};

export const useCharacters = () => {
  return useQuery<ComicResult[], ApiError>({
    queryKey: ["characters"],
    queryFn: () => fetchGetCharacters(),
    staleTime: 600_000,
  });
};

export const useCharactersByName = (
  name: string,
  order: SortOrder = SORT_ORDER.ASC,
  limit: number,
  offset = OFFSET
) =>
  useQuery<ComicResult[], ApiError>({
    queryKey: QueryKeys.charactersByName(name, order, limit, offset),
    queryFn: () => fetchGetCharactersByNameSorted(name, order, limit, offset),
    staleTime: 60_000,
    enabled: !!name?.trim(),
  });

export const useCharacterById = (id: number) =>
  useQuery<ComicResult | null, ApiError>({
    queryKey: QueryKeys.characterById(id),
    queryFn: () => fetchGetCharacterById(id),
    staleTime: 60_000,
    enabled: !!id,
  });

export const useIssuesByCharacter = (
  id: string,
  order: SortOrder = SORT_ORDER.DESC,
  limit = MAX_ISSUE_IDS,
  offset = OFFSET
) =>
  useQuery<RelatedComicCharacterResult[], ApiError>({
    queryKey: QueryKeys.issuesByCharacter(id, order, limit, offset),
    queryFn: () => fetchGetIssuesByCharacter(id, order, limit, offset),
    staleTime: 60_000,
    enabled: !!id
  });
