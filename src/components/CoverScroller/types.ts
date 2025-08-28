import type { RelatedComicCharacterResult } from "../../services/types";

export interface CoverScrollerProps {
  title?: string;
  items: RelatedComicCharacterResult[];
  className?: string;
  onItemClick?: (id: string | number) => void;
  ariaLabel?: string;
  dockRightOnDesktop?: boolean;
}
