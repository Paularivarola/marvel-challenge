import styled from "styled-components";

export const FavButton = styled.button`
  border: 0;
  background: transparent;
  cursor: pointer;
`;

export const Icon = styled.img`
  width: 1.5rem;
`;
export const IconBox = styled.span<{ $size?: number | string }>`
  --size: ${({ $size }) =>
    typeof $size === "number" ? `${$size}px` : $size || "1.5rem"};
  display: inline-flex;
  inline-size: var(--size);
  block-size: var(--size);
  align-items: center;
  justify-content: center;

  & > img,
  & > svg {
    inline-size: 100%;
    block-size: 100%;
  }
`;
