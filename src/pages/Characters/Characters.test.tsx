import { render, screen, fireEvent } from "@testing-library/react";
import Characters from "./Characters";

jest.mock("./styles", () => ({
  __esModule: true,
  Container: ({ children }: any) => (
    <section data-testid="container">{children}</section>
  ),
}));

jest.mock("../NotFound404/NotFound404", () => ({
  __esModule: true,
  default: (props: any) => <div data-testid="error">{props.title}</div>,
}));

jest.mock("../../components/Loader/Loader", () => ({
  __esModule: true,
  default: () => <div data-testid="loader">Loading...</div>,
}));

jest.mock("../../components/EmptyState/EmptyState", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid="empty-state">
      <div>{props.title}</div>
      <button data-testid="clear-btn" onClick={props.onClear}>
        Clear
      </button>
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
      <div>value:{props.value}</div>
      <div>results:{props.resultsCount}</div>
      <button
        data-testid="search-change"
        onClick={() => props.onDebouncedChange("Saturn")}
      >
        change
      </button>
    </div>
  ),
}));

let nameValue = "";
const setSearchNameMock = jest.fn();

jest.mock("../../components/SearchInput/hooks/useParamsFilters", () => ({
  __esModule: true,
  default: () => ({
    comicVineParams: { name: nameValue },
    setSearchName: setSearchNameMock,
  }),
}));

const useCharactersMock = jest.fn();
const useCharactersByNameMock = jest.fn();

jest.mock("../../services/queries", () => ({
  __esModule: true,
  useCharacters: () => useCharactersMock(),
  useCharactersByName: () => useCharactersByNameMock(),
}));

function arrange({
  name = "",
  all = [],
  filtered = [],
  loadingAll = false,
  loadingFiltered = false,
  errorAll = undefined,
  errorFiltered = undefined,
}: {
  name?: string;
  all?: any[];
  filtered?: any[];
  loadingAll?: boolean;
  loadingFiltered?: boolean;
  errorAll?: any;
  errorFiltered?: any;
}) {
  nameValue = name;
  setSearchNameMock.mockClear();

  useCharactersMock.mockReturnValue({
    data: all,
    isLoading: loadingAll,
    error: errorAll,
  });

  useCharactersByNameMock.mockReturnValue({
    data: filtered,
    isLoading: loadingFiltered,
    error: errorFiltered,
  });
}

describe("<Characters />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    nameValue = "";
  });

  test("muestra Loader si está cargando alguna de las queries", () => {
    arrange({ loadingAll: true });
    render(<Characters />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("muestra NotFound404 ante error en cualquiera de las queries", () => {
    arrange({ errorAll: new Error("boom") });
    render(<Characters />);
    expect(screen.getByTestId("error")).toHaveTextContent(
      "Oops... an error occurred. Please try again later"
    );
  });

  test("sin filtro: usa allCharacters y muestra su cantidad en SearchInput y CharacterList", () => {
    arrange({ name: "", all: [{ id: 1 }, { id: 2 }] });
    render(<Characters />);

    expect(screen.getByTestId("character-list")).toHaveTextContent("items:2");
    expect(screen.getByTestId("search-input")).toHaveTextContent("results:2");
    expect(screen.queryByTestId("empty-state")).toBeNull();
  });

  test("con filtro y resultados: usa filteredCharacters", () => {
    arrange({ name: "Rogue", filtered: [{ id: 10 }, { id: 20 }] });
    render(<Characters />);
    expect(screen.getByTestId("character-list")).toHaveTextContent("items:2");
    expect(screen.getByTestId("search-input")).toHaveTextContent("results:2");
    expect(screen.queryByTestId("empty-state")).toBeNull();
  });

  test("con filtro y sin resultados: muestra EmptyState y onClear limpia el filtro", () => {
    arrange({ name: "Rogue", filtered: [] });
    render(<Characters />);

    expect(screen.getByTestId("empty-state")).toBeInTheDocument();
    fireEvent.click(screen.getByTestId("clear-btn"));
    expect(setSearchNameMock).toHaveBeenCalledWith("");
  });

  test("SearchInput dispara onDebouncedChange → setSearchName", () => {
    arrange({ name: "", all: [{ id: 1 }] });
    render(<Characters />);
    fireEvent.click(screen.getByTestId("search-change"));
    expect(setSearchNameMock).toHaveBeenCalledWith("Saturn");
  });
});
