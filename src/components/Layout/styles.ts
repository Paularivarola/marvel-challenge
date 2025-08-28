import styled, { css } from "styled-components";

export const AppShell = styled.div`
  margin: 0;
  --header-height: 64px;
  color: #fff;
`;

export const LayoutSkipLink = styled.a`
  position: absolute;
  left: -9999px;
  top: -9999px;
  z-index: 9999;
  background: #e50914;
  color: #fff;
  padding: 8px 12px;
  border-radius: 4px;
  text-decoration: none;
  &:focus {
    left: var(--gutter);
    top: 8px;
    outline: none;
  }
`;

export const HeaderSlot = styled.div<{ $sticky?: boolean }>`
  ${({ $sticky }) =>
    $sticky &&
    css`
      position: sticky;
      top: 0;
      z-index: 1000;
      background: #000;
    `}
`;

export const Main = styled.main`
  outline: none;
`;

export const Container = styled.div`
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding-left: var(--gutter);
  padding-right: var(--gutter);
`;

export const ResponsiveGrid = styled.div`
  display: grid;
  gap: clamp(12px, 2.2vw, 20px);
  grid-template-columns: repeat(1, minmax(0, 1fr));
  @media (min-width: 520px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media (min-width: 820px) {
    grid-template-columns: repeat(3, 1fr);
  }
  @media (min-width: 1120px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;
