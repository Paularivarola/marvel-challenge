import type {
  ComicResult,
  RelatedComicCharacterResult,
} from "../../services/types";

export type CharacterDetailProps = {
  character: ComicResult;
  comics: RelatedComicCharacterResult[];
  onComicClick?: (id: number) => void;
};
