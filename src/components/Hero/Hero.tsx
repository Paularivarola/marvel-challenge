import FavoriteButton from "../FavoriteButton/FavoriteButton";
import {
  Container,
  ContainerHeader,
  ContainerText,
  Description,
  Image,
  Title,
} from "./styles";

interface HeroProps {
  name: string;
  description: string;
  imageUrl: string;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

const Hero = ({
  name,
  description,
  imageUrl,
  isFavorite = false,
  onToggleFavorite,
}: HeroProps) => {
  return (
    <Container>
      <Image $imageUrl={imageUrl} role="img" aria-label={name} />
      <ContainerText>
        <ContainerHeader>
          <Title>{name}</Title>
          <FavoriteButton
            active={isFavorite}
            onToggle={() => onToggleFavorite?.()}
            labelOn="Quitar de favoritos"
            labelOff="Añadir a favoritos"
            size={40}
          />
        </ContainerHeader>
        <Description>{description}</Description>
      </ContainerText>
    </Container>
  );
};

export default Hero;
