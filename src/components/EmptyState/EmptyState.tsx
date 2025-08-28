import { Button, HintList, Wrapper } from "./styles";

const EmptyState = ({
  title,
  description,
  hints = [],
  onClear,
}: {
  title: string;
  description?: string;
  hints?: string[];
  onClear?: () => void;
}) => {
  return (
    <Wrapper aria-live="polite" role="status">
      <h2>{title}</h2>
      {description && <p>{description}</p>}
      {!!hints.length && (
        <HintList>
          {hints.map((h) => (
            <li key={h}>
              <kbd>{h}</kbd>
            </li>
          ))}
        </HintList>
      )}
      {onClear && (
        <Button type="button" onClick={onClear}>
          Limpiar búsqueda
        </Button>
      )}
    </Wrapper>
  );
};

export default EmptyState;
