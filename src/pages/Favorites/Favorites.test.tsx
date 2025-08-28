import { render, screen, fireEvent } from "@testing-library/react";
import Favorites from "./Favorites";

jest.mock("./styles", () => ({
  __esModule: true,
  ContainerFavorites: ({ children }: any) => (
    <section data-testid="container-favorites">{children}</section>
  ),
}));

jest.mock("../NotFound404/NotFound404", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="notfound" data-title={props.title}>
      {props.title}
    </div>
  ),
}));

jest.mock("../../components/CharacterList/CharacterList", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="character-list">items:{props.data?.length ?? 0}</div>
  ),
}));

jest.mock("../../components/SearchInput/SearchInput", () => ({
  __esModule: true,
  SearchInput: (props: any) => (
    <div data-testid="search-input">
      <div>title:{props.title}</div>
      <div>value:{props.value}</div>
      <div>results:{props.resultsCount}</div>
      <button
        data-testid="search-change"
        onClick={() => props.onDebouncedChange("Rogue")}
      >
        change
      </button>
    </div>
  ),
}));

let favoritesMock: any[] = [];
jest.mock("../../../context/favorites/FavoritesProvider", () => ({
  __esModule: true,
  useFavorites: () => ({ favorites: favoritesMock }),
}));

import type { Favorite } from "../../context/types";
jest.mock("./utils", () => ({
  __esModule: true,
  EMPTY_STATE_MSG: "You have no favorites yet",
  NO_MATCHES_MSG: (q: string) => `No matches for "${q}"`,
  filterFavorites: jest.fn(),
}));
import { filterFavorites, EMPTY_STATE_MSG, NO_MATCHES_MSG } from "./utils";

function arrange({
  favorites = [],
  filterImpl,
}: {
  favorites: Favorite[];
  filterImpl?: (favs: Favorite[], q: string) => Favorite[];
}) {
  favoritesMock = favorites;
  (filterFavorites as jest.Mock).mockReset();
  (filterFavorites as jest.Mock).mockImplementation(
    filterImpl ??
      ((favs: Favorite[], q: string) => {
        return q ? (favs[0] ? [favs[0]] : []) : favs;
      })
  );
}

describe("<Favorites />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    favoritesMock = [];
  });

  test("shows empty status when there are no favorites", () => {
    arrange({
      favorites: [],
      filterImpl: () => [],
    });

    render(<Favorites />);

    expect(screen.getByTestId("search-input")).toHaveTextContent("results:0");
    const nf = screen.getByTestId("notfound");
    expect(nf).toBeInTheDocument();
    expect(nf).toHaveTextContent(EMPTY_STATE_MSG);
    expect(screen.getByTestId("character-list")).toHaveTextContent("items:0");
    expect(filterFavorites).toHaveBeenCalledWith([], "");
  });

  test("unfiltered: displays all favorites and does not display NotFound404", () => {
    const favs = [{ id: 1 }, { id: 2 }, { id: 3 }] as any[];
    arrange({
      favorites: favs,
      filterImpl: (f, q) => (q ? [f[0]] : f),
    });

    render(<Favorites />);

    expect(screen.queryByTestId("notfound")).toBeNull();
    expect(screen.getByTestId("character-list")).toHaveTextContent("items:3");
    expect(screen.getByTestId("search-input")).toHaveTextContent("results:3");
    expect(filterFavorites).toHaveBeenCalledWith(favs, "");
  });

  test("with filter and results: shows only filtered results, without NotFound404", () => {
    const favs = [{ id: 1 }, { id: 2 }, { id: 3 }] as any[];
    arrange({
      favorites: favs,
      filterImpl: (f, q) => (q ? [f[1]] : f),
    });

    render(<Favorites />);

    fireEvent.click(screen.getByTestId("search-change"));
    expect(screen.getByTestId("character-list")).toHaveTextContent("items:1");
    expect(screen.queryByTestId("notfound")).toBeNull();
    const lastCall = (filterFavorites as jest.Mock).mock.calls.pop();
    expect(lastCall).toEqual([favs, "Rogue"]);
  });

  test("with filter and no results: displays NotFound404 with NO_MATCHES_MSG", () => {
    const favs = [{ id: 1 }, { id: 2 }] as any[];
    arrange({
      favorites: favs,
      filterImpl: (f, q) => (q ? [] : f),
    });

    render(<Favorites />);

    fireEvent.click(screen.getByTestId("search-change"));
    const nf = screen.getByTestId("notfound");
    expect(nf).toBeInTheDocument();
    expect(nf).toHaveTextContent(NO_MATCHES_MSG("Rogue"));
    expect(screen.getByTestId("character-list")).toHaveTextContent("items:0");
    const lastCall = (filterFavorites as jest.Mock).mock.calls.pop();
    expect(lastCall).toEqual([favs, "Rogue"]);
  });
});
