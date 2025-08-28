export interface ComicResponse {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: ComicResult[];
}

export interface ComicResult {
  aliases: string;
  api_detail_url: string;
  birth: null;
  count_of_issue_appearances: number;
  date_added: Date;
  date_last_updated: Date;
  deck: string;
  description: string;
  first_appeared_in_issue: ComicIssue;
  gender: number;
  id: number;
  image: Image;
  name: string;
  origin: ComicIssue;
  publisher: ComicIssue;
  real_name: string;
  site_detail_url: string;
}

export interface ComicIssue {
  api_detail_url: string;
  id: number;
  name: string;
  issue_number?: string;
}

export interface Image {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
  image_tags: string;
}

export interface IssueResponse {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: IssueResult;
  version: string;
}

export interface IssueResult {
  issue_credits: IssueCredit[];
}

export interface IssueCredit {
  api_detail_url: string;
  id: number;
  name: null | string;
  site_detail_url: string;
}

export type SortOrder = "asc" | "desc";

export interface RelatedComicCharacterResponse {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: RelatedComicCharacterResult[];
  version: string;
}

export interface RelatedComicCharacterResult {
  cover_date: Date;
  id: number;
  image: Image;
  issue_number: string;
  name: string;
  site_detail_url: string;
  store_date: Date;
  volume: Volume;
}

export interface Image {
  icon_url: string;
  medium_url: string;
  screen_url: string;
  screen_large_url: string;
  small_url: string;
  super_url: string;
  thumb_url: string;
  tiny_url: string;
  original_url: string;
  image_tags: string;
}

export interface Volume {
  api_detail_url: string;
  id: number;
  name: string;
  site_detail_url: string;
}
