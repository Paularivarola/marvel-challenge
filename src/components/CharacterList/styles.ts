import styled from "styled-components";

export const CardsGrid = styled.div`
  display: grid;
  gap: 16px;
  grid-template-columns: repeat(2, minmax(0, 1fr));

  @media (min-width: 640px) { grid-template-columns: repeat(4, 1fr); }
  @media (min-width: 960px) { grid-template-columns: repeat(4, 1fr); }
  @media (min-width: 1280px) { grid-template-columns: repeat(7, 1fr); }
`;