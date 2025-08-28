import type { CharacterDetailProps } from "./types";
import Hero from "../../../../components/Hero/Hero";
import CoverScroller from "../../../../components/CoverScroller/CoverScroller";
import { useFavorites } from "../../../../context/favorites/FavoritesProvider";
import { DockRightDesktop } from "./styles";

const CharacterView = ({
  character,
  comics,
  testId = "character-view",
}: CharacterDetailProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();
  return (
    <section data-testid={testId}>
      <Hero
        name={character.name}
        description={character.description}
        imageUrl={
          character.image.super_url || "https://i.postimg.cc/SsjX51GF/image.jpg"
        }
        isFavorite={isFavorite(character.id)}
        onToggleFavorite={() => toggleFavorite(character)}
      />
      <DockRightDesktop>
        <CoverScroller title="Comics" items={comics} />
      </DockRightDesktop>
    </section>
  );
};
export default CharacterView;
