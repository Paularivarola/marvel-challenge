import styled, { css } from "styled-components";

type ButtonVariant = "primary" | "secondary";

export const StyledButton = styled.button<{ variant: ButtonVariant }>`
  padding: 1rem 3rem;
  display: grid;
  border: none;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
  border-radius: 0;
  -webkit-appearance: none;
  appearance: none;
  --cut: 14px;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - var(--cut)),
    calc(100% - var(--cut)) 100%,
    0 100%
  );
  ${(props) =>
    props.variant === "primary" &&
    css`
      background-color: #e50914;
      color: white;
    `}

  ${(props) =>
    props.variant === "secondary" &&
    css`
      background-color: black;
      border: 1px solid white;
    `}

  &:hover {
    background-color: #9d141bff;
  }
`;
