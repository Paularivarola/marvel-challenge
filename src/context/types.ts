import type { ComicResult } from "../services/types";

export type Favorite = ComicResult;

export interface State {
  items: Favorite[];
}

export const FavoritesAction = {
  INIT:   "INIT",
  TOGGLE: "TOGGLE",
  REMOVE: "REMOVE",
  CLEAR:  "CLEAR",
} as const;

export type Action =
  | { type: typeof FavoritesAction.INIT; payload: Favorite[] }
  | { type: typeof FavoritesAction.TOGGLE; payload: Favorite }
  | { type: typeof FavoritesAction.REMOVE; payload: number }
  | { type: typeof FavoritesAction.CLEAR };

export interface FavoritesContextValue {
  favorites: Favorite[];
  toggleFavorite: (item: Favorite) => void;
  removeFavorite: (id: number) => void;
  clearFavorites: () => void;
  isFavorite: (id: number) => boolean;
};

