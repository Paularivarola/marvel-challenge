export const ISSUE_FIELD_LIST = "issue_credits" as const;
export const MAX_ISSUE_IDS = 20;
export const MAX_LIMIT = 50;
export const MAX_LIMIT_ISSUES = 20;
export const MIN_LIMIT = 10;
export const OFFSET = 0;
export const FIELD_LIST_CHARACTER = "id,name,deck,image,api_detail_url";
export const FIELD_LIST_ISSUE =
  "id,name,issue_number,volume,store_date,cover_date,site_detail_url,image";
export const SORT_ORDER = {
  ASC: "asc",
  DESC: "desc",
} as const;

export type SortOrder = (typeof SORT_ORDER)[keyof typeof SORT_ORDER];
