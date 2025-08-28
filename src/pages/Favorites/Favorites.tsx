import { useCallback, useMemo, useState } from "react";
import { useFavorites } from "../../context/favorites/FavoritesProvider";
import CharacterList from "../../components/CharacterList/CharacterList";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { EMPTY_STATE_MSG, filterFavorites, NO_MATCHES_MSG } from "./utils";
import type { Favorite } from "../../context/types";
import { ContainerFavorites } from "./styles";
import NotFound404 from "../NotFound404/NotFound404";
import marvelBackground from "../../assets/img/imgCharacterKatePryde.png";

const Favorites = () => {
  const { favorites } = useFavorites();
  const [query, setQuery] = useState<string>("");

  const handleSearch = useCallback((text: string): void => {
    setQuery(text);
  }, []);

  const filtered: Favorite[] = useMemo(
    () => filterFavorites(favorites, query),
    [favorites, query]
  );

  const nothingSaved = favorites.length === 0;
  const noMatches = !nothingSaved && filtered.length === 0;
  const isFiltering = query.trim().length > 0;
  const resultsCount = isFiltering ? filtered.length : favorites.length;

  return (
    <ContainerFavorites>
      <SearchInput
        title="FAVORITES"
        value={query}
        onDebouncedChange={handleSearch}
        placeholder="SEARCH IN YOUR FAVORITES..."
        debounceMs={500}
        resultsCount={resultsCount}
      />
      {nothingSaved && (
        <NotFound404
          imageUrl={marvelBackground}
          title={EMPTY_STATE_MSG}
          description="Tap the heart icon on a character to add it here."
        />
      )}
      {noMatches && (
        <NotFound404
          imageUrl={marvelBackground}
          title={NO_MATCHES_MSG(query)}
          description=""
        />
      )}
      <CharacterList data={filtered} isLoading={false} error={null} />
    </ContainerFavorites>
  );
};

export default Favorites;
