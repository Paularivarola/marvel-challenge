import styled from "styled-components";

export const Container = styled.section`
  --gap: clamp(12px, 3vw, 32px);
  background: #000;
  color: #fff;
  width: 100%;
  block-size: 50vh;
  overflow: hidden;
  padding: var(--pad);

  @supports (height: 1dvh) {
    block-size: 50dvh;
  }

  display: grid;
  grid-template-columns: minmax(180px, 20vw) minmax(260px, 720px);
  align-items: center;
  justify-content: center;
  gap: var(--gap);

  /* TABLET */
  @media (max-width: 960px) {
    grid-template-columns: minmax(160px, 42vw) minmax(240px, 52vw);
    gap: clamp(12px, 2.5vw, 24px);
  }

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    justify-items: center;
    place-content: center;
    gap: var(--gap);
    height: 60vh;
  }
`;

export const Image = styled.div<{ $imageUrl: string }>`
  width: 100%;
  height: 100%;
  background-image: url("${({ $imageUrl }) => $imageUrl}");
  background-size: cover;
  background-position: center top;
  background-repeat: no-repeat;

  @media (max-width: 960px) {
    background-position: center top;
  }

  @media (max-width: 600px) {
    height: clamp(160px, 40vh, 320px);
    width: min(92vw, 520px);
  }
`;

export const ContainerText = styled.div`
  max-inline-size: 70ch;
  min-width: 0;

  @media (max-width: 600px) {
    max-inline-size: min(92vw, 520px);
  }
`;

export const ContainerHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: clamp(8px, 2vw, 16px);

  @media (max-width: 600px) {
    justify-content: center;
    gap: 12px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 0.5rem 0;
  font-family:
    RobotoCondensed,
    Trebuchet MS,
    Helvetica,
    Arial,
    sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  line-height: 1.1;
  font-size: clamp(1.4rem, 1rem + 3.2vw, 3.2rem);

  @media (max-width: 600px) {
    font-size: clamp(1.25rem, 4.8vw, 2rem);
  }
`;

export const Description = styled.p`
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.02em;
  line-height: 1.35;
  opacity: 0.9;
  font-size: clamp(0.95rem, 0.9rem + 0.4vw, 1.2rem);

  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  overflow: hidden;

  @media (max-width: 600px) {
    -webkit-line-clamp: 3;
  }
`;
