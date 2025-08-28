import { Link } from "react-router-dom";
import logoMarvel from "../../assets/icons/icLogo.svg";
import { Logo, HeaderContainer, ContainerLink } from "./styles";
import { PUBLIC_ROUTES } from "../../routes/routes";
import FavoriteButton from "../FavoriteButton/FavoriteButton";
import { useFavorites } from "../../context/favorites/FavoritesProvider";

export const Header = () => {
  const { favorites } = useFavorites();
  const hasFavorites = favorites.length > 0;
  return (
    <HeaderContainer>
      <Link to={PUBLIC_ROUTES.HOME} aria-label="Go to Home">
        <Logo>
          <img src={logoMarvel} alt="Marvel Logo" />
        </Logo>
      </Link>
      <Link to={PUBLIC_ROUTES.FAVORITES} aria-label="Ir a favoritos">
        <ContainerLink>
          <FavoriteButton active={hasFavorites} onToggle={() => null} />
          {favorites.length}
        </ContainerLink>
      </Link>
    </HeaderContainer>
  );
};
