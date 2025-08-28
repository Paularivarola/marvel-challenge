import styled from "styled-components";

export const Container = styled.section`
  --container: min(1200px, 92vw);
  --radius: 16px;
  --shadow: 0 6px 30px rgba(0, 0, 0, 0.25);
  background: #fff;
  color: #111;
`;

export const HeroInner = styled.div`
  width: var(--container);
  margin-inline: auto;
  padding: clamp(16px, 2.5vw, 40px);
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(16px, 3vw, 48px);
  align-items: center;

  @media (min-width: 960px) {
    grid-template-columns: 1.1fr 1fr;
  }
`;

export const Poster = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: block;
`;

export const Info = styled.div`
  display: grid;
  gap: clamp(8px, 1.5vw, 16px);
`;

export const ContainerTitle = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: start;
  gap: 12px;
`;

export const Name = styled.h1`
  font-size: clamp(28px, 4vw, 56px);
  line-height: 1.1;
  letter-spacing: 0.02em;
  font-weight: 800;
  text-transform: uppercase;
  margin: 0;
`;

export const Description = styled.p`
  font-size: clamp(14px, 1.2vw, 18px);
  line-height: 1.6;
  opacity: 0.9;
  max-width: 60ch;
  margin: 0;
`;

export const FavButton = styled.button<{ $active: boolean }>`
  appearance: none;
  border: 0;
  background: transparent;
  cursor: pointer;
  padding: 8px;
  border-radius: 999px;
  outline-offset: 3px;

  svg {
    width: 28px;
    height: 28px;
    stroke: #fff;
    fill: ${({ $active }) => ($active ? "#fff" : "transparent")};
    transition:
      transform 0.16s ease,
      fill 0.2s ease,
      opacity 0.2s ease;
    opacity: 0.95;
  }

  &:hover svg {
    transform: scale(1.06);
    opacity: 1;
  }
`;

export const Section = styled.section`
  width: var(--container);
  margin-inline: auto;
  padding: clamp(20px, 4vw, 56px) clamp(16px, 2.5vw, 40px);
`;

export const SectionTitle = styled.h2`
  font-size: clamp(22px, 3vw, 36px);
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  margin: 0 0 clamp(16px, 2vw, 24px);
`;

export const ComicsGrid = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: clamp(12px, 2vw, 24px);
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));

  @media (min-width: 480px) {
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  }
`;

export const ComicItem = styled.li`
  display: grid;
  gap: 10px;
`;

export const ComicCover = styled.img`
  width: 100%;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  display: block;
`;

export const ComicTitle = styled.h3`
  font-size: clamp(12px, 1.4vw, 16px);
  font-weight: 700;
  margin: 0;
  line-height: 1.3;
`;

export const DockRightDesktop = styled.div`
  @media (min-width: 960px) {
    width: 100vw;
    margin-left: calc(50% - 50vw);
    display: flex;
    justify-content: flex-end;
    & > * {
      width: 70vw;
      max-width: none;
      margin: 0;
    }
  }
`;
