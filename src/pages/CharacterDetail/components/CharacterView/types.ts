import type {
  ComicResult,
  RelatedComicCharacterResult,
} from "../../../../services/types";

export interface Comic {
  id: number;
  title: string;
  coverUrl: string;
}

export interface CharacterDetailProps {
  character: ComicResult;
  comics: RelatedComicCharacterResult[];
  testId?: string;
}

export interface CharacterById {
  error: string;
  limit: number;
  offset: number;
  number_of_page_results: number;
  number_of_total_results: number;
  status_code: number;
  results: CharacterByIdResult[];
  version: string;
}

export interface CharacterByIdResult {
  api_detail_url: string;
  deck: string;
  description: string;
  id: number;
  image: Image;
  name: string;
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
