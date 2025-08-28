import { AxiosInstance } from "./axios-config";
import { ApiError } from "./apiError";
import type {
  ComicResponse,
  ComicResult,
  IssueResponse,
  RelatedComicCharacterResponse,
  RelatedComicCharacterResult,
  SortOrder,
} from "./types";
import { limitIds, pickIssueCreditIds, stableUnique } from "./utils";
import {
  FIELD_LIST_CHARACTER,
  FIELD_LIST_ISSUE,
  MAX_ISSUE_IDS,
  MAX_LIMIT,
  MAX_LIMIT_ISSUES,
  OFFSET,
  SORT_ORDER,
} from "./constants";

export const fetchGetCharacters = async (
  limit = MAX_LIMIT,
  offset = OFFSET
): Promise<ComicResult[]> => {
  try {
    const { data } = await AxiosInstance.get<ComicResponse>("/characters", {
      params: { limit, offset },
    });
    return data.results;
  } catch (err) {
    throw new ApiError(err);
  }
};

export const fetchGetCharactersByNameSorted = async (
  name: string,
  order: SortOrder = SORT_ORDER.ASC,
  limit = MAX_LIMIT,
  offset = OFFSET,
  apiKey = ""
): Promise<ComicResult[]> => {
  try {
    const filterValue = `name:${encodeURIComponent(name)}`;
    const parts = [
      apiKey ? `api_key=${apiKey}` : null,
      `format=json`,
      `filter=${filterValue}`,
      `sort=name:${order}`,
      `limit=${limit}`,
      `offset=${offset}`,
    ].filter(Boolean);

    const url = `/characters/?${parts.join("&")}`;

    const { data } = await AxiosInstance.get<ComicResponse>(url);
    return data.results;
  } catch (err) {
    throw new ApiError(err);
  }
};

export const fetchGetCharacterById = async (
  id: number,
  apiKey = ""
): Promise<ComicResult | null> => {
  try {
    const parts = [
      apiKey ? `api_key=${apiKey}` : null,
      `format=json`,
      `filter=id:${id}`,
      `field_list=${FIELD_LIST_CHARACTER}`,
      `limit=1`,
      `offset=0`,
    ].filter(Boolean);

    const url = `/characters/?${parts.join("&")}`;
    const { data } = await AxiosInstance.get<ComicResponse>(url);
    return data.results?.[0] ?? null;
  } catch (err) {
    throw new ApiError(err);
  }
};

const fetchIssueIdsByCharacter = async (characterId: string) => {
  try {
    const { data } = await AxiosInstance.get<IssueResponse>(
      `/character/${characterId}`,
      { params: { field_list: "issue_credits" } }
    );

    const ids = pickIssueCreditIds(data);
    const sanitized = stableUnique(ids);
    return limitIds(sanitized, MAX_ISSUE_IDS);
  } catch (err) {
    throw new ApiError(err);
  }
};

const fetchIssuesByIds = async (
  ids: number[],
  order: SortOrder = SORT_ORDER.DESC,
  limit = MAX_LIMIT_ISSUES,
  offset = OFFSET
): Promise<RelatedComicCharacterResult[]> => {
  if (!ids.length) return [];
  try {
    const filter = `id:${ids.join("|")}`;
    const { data } = await AxiosInstance.get<RelatedComicCharacterResponse>(
      "/issues",
      {
        params: {
          filter,
          sort: `store_date:${order}`,
          limit,
          offset,
          field_list: FIELD_LIST_ISSUE,
        },
      }
    );
    return data.results ?? [];
  } catch (err) {
    throw new ApiError(err);
  }
};

export const fetchGetIssuesByCharacter = async (
  characterId: string,
  order: SortOrder = SORT_ORDER.DESC,
  limit = MAX_LIMIT_ISSUES,
  offset = OFFSET
): Promise<RelatedComicCharacterResult[]> => {
  const ids = await fetchIssueIdsByCharacter(characterId);
  return fetchIssuesByIds(ids, order, limit, offset);
};
