import { useContext, useEffect, useMemo, useReducer } from "react";
import {
  FavoritesAction,
  type Action,
  type Favorite,
  type FavoritesContextValue,
  type State,
} from "../types";
import { FavoritesContext } from "../context";
import { dedupeById } from "./utils";

const STORAGE_KEY = "marvel:favorites:v1";

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case FavoritesAction.INIT:
      return { items: dedupeById(action.payload) };
    case FavoritesAction.TOGGLE: {
      const exists = state.items.some((x) => x.id === action.payload.id);
      const items = exists
        ? state.items.filter((x) => x.id !== action.payload.id)
        : [action.payload, ...state.items];
      return { items };
    }

    case FavoritesAction.REMOVE:
      return { items: state.items.filter((x) => x.id !== action.payload) };

    case FavoritesAction.CLEAR:
      return { items: [] };

    default:
      return state;
  }
}

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(
    reducer,
    undefined as unknown as State,
    () => {
      if (typeof window === "undefined") return { items: [] };
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return { items: [] };
        const parsed = JSON.parse(raw) as Favorite[];
        return { items: dedupeById(parsed) };
      } catch {
        return { items: [] };
      }
    }
  );

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
  }, [state.items]);

  const value = useMemo<FavoritesContextValue>(() => {
    const idSet = new Set(state.items.map((x) => x.id));

    return {
      favorites: state.items,
      toggleFavorite: (item) =>
        dispatch({ type: FavoritesAction.TOGGLE, payload: item }),
      removeFavorite: (id) =>
        dispatch({ type: FavoritesAction.REMOVE, payload: id }),
      clearFavorites: () => dispatch({ type: FavoritesAction.CLEAR }),
      isFavorite: (id: number) => idSet.has(id),
    };
  }, [state.items]);

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error("useFavorites debe usarse dentro de <FavoritesProvider>");
  return ctx;
}