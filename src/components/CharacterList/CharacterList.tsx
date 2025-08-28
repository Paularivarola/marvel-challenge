import { useNavigate } from "react-router-dom";
import CharacterCard from "../CharacterCard/CharacterCard";
import { CardsGrid } from "./styles";
import Loader from "../Loader/Loader";
import type { ApiError } from "../../services/apiError";
import type { ComicResult } from "../../services/types";
import { useFavorites } from "../../context/favorites/FavoritesProvider";
import NotFound404 from "../../pages/NotFound404/NotFound404";

interface CharacterListProps {
  data: ComicResult[];
  isLoading: boolean;
  error: ApiError | null;
}

const CharacterList = ({ data, isLoading, error }: CharacterListProps) => {
  const navigate = useNavigate();
  const { isFavorite, toggleFavorite } = useFavorites();
  if (isLoading) return <Loader />;
  if (error) return <NotFound404 title="Oops... there was an error!" description="Please try again later." />

  const handleOpen = (id: number) => {
    navigate(`/characters/${id}`);
  };

  return (
    <section>
      <CardsGrid>
        {data?.map((character: ComicResult) => (
          <li key={character.id}>
            <CharacterCard
              id={character.id}
              name={character.name}
              image={
                character.image?.super_url ??
                "https://i.postimg.cc/SsjX51GF/image.jpg"
              }
              isFavorite={isFavorite(character.id)}
              onOpen={handleOpen}
              onToggleFavorite={() => toggleFavorite(character)}
            />
          </li>
        ))}
      </CardsGrid>
    </section>
  );
};

export default CharacterList;
