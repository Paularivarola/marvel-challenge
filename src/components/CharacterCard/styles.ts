import styled from "styled-components";

export const Card = styled.article`
  color: #fff;
  overflow: hidden;
  display: grid;
  max-width: 200px;
  grid-template-rows: auto 8px auto;
  align-content: start;

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 14px),
    calc(100% - 14px) 100%,
    0 100%
  );

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.35);
  }
`;

export const ImageBox = styled.div`
  aspect-ratio: 4 / 4;
  overflow: hidden;
`;

export const Img = styled.div<{ src: string }>`
  width: 100%;
  height: 100%;
  background-image: url(${(p) => p.src});
  background-size: cover;
  background-position: top center;
  background-repeat: no-repeat;
  transform: translateZ(0);
  cursor: pointer;

  ${Card}:hover & {
    transform: scale(1.02);
  }
`;

export const RedBar = styled.div`
  height: 8px;
  background: #e50914;
`;

export const Footer = styled.footer`
  background: #0d0d0d;
  padding: 8px 12px 12px;
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  gap: 8px;
  clip-path: polygon(
    0 0,
    100% 0,
    100% calc(100% - 14px),
    calc(100% - 14px) 100%,
    0 100%
  );
`;

export const Name = styled.h3`
  font-size: 12px;
  font-weight: 300;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
