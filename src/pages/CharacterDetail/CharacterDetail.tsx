import { useParams } from "react-router-dom";
import { useCharacterById, useIssuesByCharacter } from "../../services/queries";
import CharacterView from "./components/CharacterView/CharacterView";
import NotFound404 from "../NotFound404/NotFound404";
import Loader from "../../components/Loader/Loader";
import { extractTypeIdFromApiUrl } from "./components/CharacterView/utils";
import { useMemo } from "react";

const CharacterDetail = () => {
  const { id } = useParams<{ id: string }>();
  const charId = useMemo(() => Number(id), [id]);

  if (!charId) {
    return (
      <NotFound404 title="Invalid character ID" testId="notfound-invalid-id" />
    );
  }

  const {
    data: character,
    isLoading: loadingChar,
    error: errorChar,
  } = useCharacterById(charId);

  const issueId = extractTypeIdFromApiUrl(character?.api_detail_url);

  const {
    data: comics = [],
    isLoading: loadingIssues,
    error: errorIssues,
  } = useIssuesByCharacter(issueId);

  if (loadingChar || loadingIssues) return <Loader testId="loader" />;

  if (errorChar || errorIssues)
    return <NotFound404 title="Oops! We couldn’t load this character." />;

  if (!character) {
    return <NotFound404 title="No encontramos el personaje" />;
  }

  if (!issueId) return <NotFound404 title="Invalid character ID" />;

  return <CharacterView character={character} comics={comics} />;
};

export default CharacterDetail;
