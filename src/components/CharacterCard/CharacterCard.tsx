import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { Card, Img, RedBar, Footer, Name, ImageBox } from "./styles";

interface CharacterCardProps {
  id: number;
  name: string;
  image: string;
  isFavorite: boolean;
  onOpen?: (id: number) => void;
  onToggleFavorite?: () => void;
}

const CharacterCard = ({
  id,
  name,
  image,
  isFavorite,
  onOpen,
  onToggleFavorite,
}: CharacterCardProps) => (
  <Card role="article" aria-label={name}>
    <ImageBox>
      <Img
        src={image}
        role="img"
        aria-label={name}
        onClick={() => onOpen?.(id)}
      />
    </ImageBox>
    <RedBar />
    <Footer>
      <Name title={name}>{name}</Name>
      <FavoriteButton
        active={isFavorite}
        onToggle={() => onToggleFavorite?.()}
        labelOn="Remove from favorites"
        labelOff="Add to favorites"
        iconSize={16}
      />
    </Footer>
  </Card>
);

export default CharacterCard;
