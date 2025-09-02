import styled from "styled-components";

export const Wrapper = styled.section`
  --padX: clamp(16px, 4vw, 32px);
  --padTop: clamp(16px, 4vw, 24px);
  display: grid;
  grid-template-rows: minmax(0, 1fr) auto;
  height: 80vh;
  padding: var(--padTop) var(--padX) 0;
  gap: clamp(12px, 3vw, 24px);
  box-sizing: border-box;
  overflow: hidden;

  > div:last-child {
    display: none;
    align-self: end;
    position: static;
    height: auto;
  }

  @media (min-width: 960px) {
    grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
    grid-template-rows: 1fr;
    align-items: stretch;
    padding: var(--padTop) var(--padX);
    gap: clamp(24px, 6vw, 64px);

    > div:last-child {
      grid-column: 2;
      grid-row: 1;
      height: 100%;
      display: grid;
      align-items: end;
    }
  }
`;

export const Content = styled.div`
  max-width: 720px;
  width: min(720px, 100%);
  margin-inline: auto;
  align-self: start;
  min-height: 0;
  overflow: hidden;

  @media (min-width: 960px) {
    align-self: center;
    margin-inline: 0;
  }
`;

export const Title = styled.h1`
  font:
    800 clamp(24px, 5vw, 48px) / 1.05 "Roboto",
    "Helvetica Neue",
    Arial,
    sans-serif;
  letter-spacing: 0.01em;
  margin: 0 0 12px;
  color: #111;
`;

export const Description = styled.p`
  font:
    400 clamp(14px, 1.6vw, 18px) / 1.6 "Roboto",
    "Trebuchet MS",
    Helvetica,
    Arial,
    sans-serif;
  color: #333;
  margin: 0 0 20px;

  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;

  @media (min-width: 960px) {
    -webkit-line-clamp: unset;
    overflow: visible;
  }
`;

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

type IllustrationProps = { $src: string };

export const Illustration = styled.div<IllustrationProps>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: clamp(220px, 48svh, 560px);
  background-image: ${({ $src }) => `url(${$src})`};
  background-repeat: no-repeat;
  background-position: center bottom;
  background-size: contain;
  pointer-events: none;
  margin: 0;
  z-index: 0;

  @media (min-width: 960px) {
    left: auto;
    right: 0;
    width: clamp(520px, 40vw, 900px);
    height: clamp(360px, 72svh, 900px);
    background-position: right bottom;
  }
`;
