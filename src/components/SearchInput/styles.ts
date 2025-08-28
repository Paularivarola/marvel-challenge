import styled, { css } from "styled-components";

type Size = "sm" | "md" | "lg";

export const Wrapper = styled.div<{ $fullWidth: boolean }>`
  width: ${({ $fullWidth }) => ($fullWidth ? "100%" : "auto")};
`;

export const Title = styled.h2`
  color: black;
  font-size: 2rem;
  font-weight: 700;
`;

export const Field = styled.label<{ $size: Size; $disabled: boolean }>`
  --line: #111;
  --line-focus: #000;
  --placeholder: #bdbdbd;
  --text: #111;

  position: relative;
  display: flex;
  align-items: center;
  gap: 10px;
  width: 100%;
  border-bottom: 1px solid var(--line);
  cursor: text;

  ${({ $size }) =>
    $size === "sm" &&
    css`
      padding: 6px 0;
      svg {
        width: 18px;
        height: 18px;
      }
      input {
        font-size: 1rem;
      }
    `}
  ${({ $size }) =>
    $size === "md" &&
    css`
      padding: 8px 0;
      svg {
        width: 20px;
        height: 20px;
      }
      input {
        font-size: 1rem;
      }
    `}
  ${({ $size }) =>
    $size === "lg" &&
    css`
      padding: 10px 0;
      svg {
        width: 22px;
        height: 22px;
      }
      input {
        font-size: 0.8rem;
      }
    `}

  &:focus-within {
    border-bottom-color: var(--line-focus);
  }

  ${({ $disabled }) =>
    $disabled &&
    css`
      opacity: 0.6;
      cursor: not-allowed;
    `}
`;

export const IconWrap = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex: 0 0 auto;
`;

export const InputEl = styled.input`
  appearance: none;
  border: 0;
  outline: none;
  background: transparent;
  color: var(--text);
  width: 100%;
  padding: 0;

  &::placeholder {
    color: var(--placeholder);
    opacity: 1;
  }

  &::-ms-clear {
    display: none;
  }
  &::-webkit-search-cancel-button {
    -webkit-appearance: none;
  }
`;

export const TextResult = styled.p`
  font-size: 14px;
  font-weight: 300;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: black;
`;

export const ResultsText = styled.p`
  margin-top: 12px;
  font-size: 0.8rem;
  font-weight: 300;
  text-transform: uppercase;
  color: #111;
`;
