import Loader from "../../components/Loader/Loader";
import useParamsFilters from "../../components/SearchInput/hooks/useParamsFilters";
import { SearchInput } from "../../components/SearchInput/SearchInput";
import { useCharacters, useCharactersByName } from "../../services/queries";
import CharacterList from "../../components/CharacterList/CharacterList";
import { Container } from "./styles";
import NotFound404 from "../NotFound404/NotFound404";
import marvelBackground from "../../assets/img/imgCharacterRogue.png";
import EmptyState from "../../components/EmptyState/EmptyState";

const Characters = () => {
  const {
    comicVineParams: { name = "" },
    setSearchName,
  } = useParamsFilters();
  const { data: allCharacters = [], isLoading, error } = useCharacters();

  const {
    data: filteredCharacters = [],
    isLoading: isLoadingCharactersByName,
    error: errorCharactersByName,
  } = useCharactersByName(name, "asc", 50);

  if (isLoading || isLoadingCharactersByName) return <Loader />;
  if (error || errorCharactersByName)
    return (
      <NotFound404
        imageUrl={marvelBackground}
        title="Oops... an error occurred. Please try again later"
        testId="wrapper"
      />
    );

  const isFiltering = !!name.trim();
  const dataToShow = isFiltering ? filteredCharacters : allCharacters;
  const noResults = isFiltering && dataToShow.length === 0;

  return (
    <Container>
      <SearchInput
        value={name}
        onDebouncedChange={setSearchName}
        debounceMs={1000}
        resultsCount={!!name ? filteredCharacters.length : allCharacters.length}
      />
      {noResults && (
        <EmptyState
          title="No results found"
          description="Try adjusting your search terms and filters."
          hints={[
            "Check spelling",
            "Use fewer keywords",
            "Try a different name",
          ]}
          onClear={() => setSearchName("")}
        />
      )}
      <CharacterList
        data={!!name ? filteredCharacters : allCharacters}
        isLoading={isLoading}
        error={error}
      />
    </Container>
  );
};

export default Characters;
