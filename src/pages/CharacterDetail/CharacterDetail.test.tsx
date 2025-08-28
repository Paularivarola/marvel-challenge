import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

jest.mock("react-router-dom", () => ({
  __esModule: true,
  useParams: jest.fn(),
}));

jest.mock("../../services/queries", () => ({
  __esModule: true,
  useCharacterById: jest.fn(),
  useIssuesByCharacter: jest.fn(),
}));

jest.mock("./components/CharacterView/utils", () => ({
  __esModule: true,
  extractTypeIdFromApiUrl: jest.fn(),
}));

jest.mock("./components/CharacterView/CharacterView", () => ({
  __esModule: true,
  default: () => <div data-testid="character-view">CharacterView Stub</div>,
}));

jest.mock("../NotFound404/NotFound404", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid={props.testId ?? "notfound"}>{props.title}</div>
  ),
}));

jest.mock("../../components/Loader/Loader", () => ({
  __esModule: true,
  default: (props: any) => (
    <div data-testid={props.testId ?? "loader"}>Loading…</div>
  ),
}));

import { useParams } from "react-router-dom";
import { useCharacterById, useIssuesByCharacter } from "../../services/queries";
import { extractTypeIdFromApiUrl } from "./components/CharacterView/utils";
import CharacterDetail from "./CharacterDetail";

interface Character {
  id: number;
  name: string;
  api_detail_url?: string;
}

const mockUseParams = useParams as unknown as jest.Mock;
const mockUseCharacterById = useCharacterById as unknown as jest.Mock;
const mockUseIssuesByCharacter = useIssuesByCharacter as unknown as jest.Mock;
const mockExtractTypeId = extractTypeIdFromApiUrl as unknown as jest.Mock;

interface ArrangeOpts {
  id?: string | undefined;
  character?: Character | null;
  loadingChar?: boolean;
  errorChar?: unknown;
  issueId?: number | undefined;
  loadingIssues?: boolean;
  errorIssues?: unknown;
  comics?: any[];
}

const arrange = (opts: ArrangeOpts = {}) => {
  const {
    character = {
      id: 123,
      name: "Bruce",
      api_detail_url: "https://x/api/issue/4000-42/",
    },
    loadingChar = false,
    errorChar = null,
    loadingIssues = false,
    errorIssues = null,
    comics = [{ id: 1 }, { id: 2 }],
  } = opts;

  const idArg = Object.prototype.hasOwnProperty.call(opts, "id")
    ? opts.id
    : "123";

  const issueIdArg = Object.prototype.hasOwnProperty.call(opts, "issueId")
    ? opts.issueId
    : 42;

  mockUseParams.mockReturnValue({ id: idArg });
  mockUseCharacterById.mockReturnValue({
    data: character,
    isLoading: loadingChar,
    error: errorChar,
  });
  mockExtractTypeId.mockReturnValue(issueIdArg);
  mockUseIssuesByCharacter.mockReturnValue({
    data: comics,
    isLoading: loadingIssues,
    error: errorIssues,
  });
};

describe("CharacterDetail", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("Displays ‘Invalid character ID’ if the ID is invalid (NaN/undefined)", () => {
    arrange({ id: undefined as any });
    render(<CharacterDetail />);
    expect(screen.getByTestId("notfound-invalid-id")).toBeInTheDocument();
    expect(mockUseCharacterById).not.toHaveBeenCalled();
    expect(mockUseIssuesByCharacter).not.toHaveBeenCalled();
  });

  test("Loader displays when loading the character", () => {
    arrange({ loadingChar: true });
    render(<CharacterDetail />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("Loader display when issues are loaded", () => {
    arrange({ loadingIssues: true });
    render(<CharacterDetail />);
    expect(screen.getByTestId("loader")).toBeInTheDocument();
  });

  test("Displays the NotFound error when a query fails", () => {
    arrange({ errorChar: new Error("boom") });
    render(<CharacterDetail />);
    expect(
      screen.getByText(/oops! we couldn[’']t load this character\./i)
    ).toBeInTheDocument();
  });

  test("Displays NotFound when there is no character after loading.", () => {
    arrange({ character: null, loadingChar: false, errorChar: null });
    render(<CharacterDetail />);
    expect(
      screen.getByText(/no encontramos el personaje/i)
    ).toBeInTheDocument();
    expect(screen.queryByTestId("character-view")).toBeNull();
  });

  test("Displays ‘Invalid character ID’ when there is no derived issueId", () => {
    arrange({
      character: {
        id: 123,
        name: "Bruce",
        api_detail_url: "https://x/api/issue/4000-??/",
      },
      issueId: undefined,
    });
    render(<CharacterDetail />);
    expect(screen.getByText(/invalid character id/i)).toBeInTheDocument();
  });

  test("Render CharacterView in the happy path", () => {
    arrange({
      id: "321",
      character: {
        id: 321,
        name: "Diana",
        api_detail_url: "https://x/api/issue/4000-99/",
      },
      issueId: 99,
      comics: [{ id: 10 }],
    });
    render(<CharacterDetail />);
    expect(screen.getByTestId("character-view")).toBeInTheDocument();
    expect(mockUseCharacterById).toHaveBeenCalledWith(321);
    expect(mockUseIssuesByCharacter).toHaveBeenCalledWith(99);
    expect(mockExtractTypeId).toHaveBeenCalledWith(
      "https://x/api/issue/4000-99/"
    );
  });
});
