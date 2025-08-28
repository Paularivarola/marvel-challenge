import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CharacterView from "./CharacterView";

const mockIsFavorite = jest.fn();
const mockToggleFavorite = jest.fn();
jest.mock("../../../../../context/favorites/FavoritesProvider", () => ({
  useFavorites: () => ({
    isFavorite: mockIsFavorite,
    toggleFavorite: mockToggleFavorite,
  }),
}));

const heroSpy = jest.fn();
jest.mock("../../../../components/Hero/Hero", () => ({
  default: (props: any) => {
    heroSpy(props);
    return (
      <div data-testid="hero-mock">
        <button onClick={props.onToggleFavorite}>
          {props.isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
        </button>
        <h1>{props.name}</h1>
        <p>{props.description}</p>
        <img alt={props.name} src={props.imageUrl} />
      </div>
    );
  },
}));

const coverSpy = jest.fn();
jest.mock("../../../../components/CoverScroller/CoverScroller", () => ({
  default: (props: any) => {
    coverSpy(props);
    return <div data-testid="cover-mock">{props.title}</div>;
  },
}));

const character = {
  id: 1699,
  name: "Batman",
  description: "The Dark Knight",
  image: { super_url: "https://example.com/batman.jpg" },
};

const comics = [
  {
    id: 1,
    name: "Detective Comics #1",
    volume: { name: "Detective Comics" },
    image: { super_url: "https://example.com/c1.jpg" },
    site_detail_url: "https://comicvine.gamespot.com/issue1",
  },
  {
    id: 2,
    name: "Batman #2",
    volume: { name: "Batman" },
    image: { super_url: "https://example.com/c2.jpg" },
  },
];

describe("<CharacterView />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("passes correct props to Hero and CoverScroller and renders the container", () => {
    mockIsFavorite.mockReturnValue(false);

    render(
      <CharacterView character={character as any} comics={comics as any} />
    );

    expect(screen.getByTestId("character-view")).toBeInTheDocument();

    expect(heroSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        name: "Batman",
        description: "The Dark Knight",
        imageUrl: "https://example.com/batman.jpg",
        isFavorite: false,
      })
    );

    expect(coverSpy).toHaveBeenCalledWith(
      expect.objectContaining({
        title: "Comics",
        items: comics,
      })
    );
  });

  it("if it is not a favorite, display ‘Add to favorites’ and when clicked, call toggleFavorite(character)", async () => {
    mockIsFavorite.mockReturnValue(false);
    render(
      <CharacterView character={character as any} comics={comics as any} />
    );

    await userEvent.click(
      screen.getByRole("button", { name: /añadir a favoritos/i })
    );

    expect(mockToggleFavorite).toHaveBeenCalledTimes(1);
    expect(mockToggleFavorite).toHaveBeenCalledWith(character);
  });

  it("if it is a favorite, display 'Remove from favorites'", () => {
    mockIsFavorite.mockReturnValue(true);
    render(
      <CharacterView character={character as any} comics={comics as any} />
    );

    expect(
      screen.getByRole("button", { name: /quitar de favoritos/i })
    ).toBeInTheDocument();
  });
});
