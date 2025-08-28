import styled from "styled-components";

export const Section = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: clamp(12px, 2vw, 24px);
`;

export const SectionTitle = styled.h2`
  margin: 0 0 clamp(12px, 1.5vw, 20px);
  font-weight: 600;
  line-height: 1.1;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: clamp(22px, 3.6vw, 44px);
  color: black;
  font-size: 2rem;
`;

export const ScrollerWrapper = styled.div`
  position: relative;
`;

export const ScrollerList = styled.ul`
  display: flex;
  gap: clamp(12px, 2vw, 24px);
  overflow-x: auto;
  overflow-y: hidden;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  padding: 2px 2px clamp(18px, 2.5vw, 28px);
   --card-w: 144px;

  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }

`;

export const Item = styled.li`
  flex: 0 0 var(--card-w);
  width: var(--card-w);
  scroll-snap-align: start;
  list-style: none;
`;


export const BaseInteractive = styled.div`
  display: grid;
  grid-template-rows: auto auto auto;
  row-gap: clamp(6px, 1.2vw, 10px);
  text-align: left;
  outline: none;
  border: 0;
  background: none;
  padding: 0;
  cursor: pointer;

  &:focus-visible {
    box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.5);
    border-radius: 8px;
  }
`;

export const ItemButton = styled(BaseInteractive).attrs({ as: "button" })``;
export const ItemLink = styled(BaseInteractive).attrs({ as: "a" })`
  text-decoration: none;
  color: inherit;
`;

export const CoverWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 2 / 3;
  border: 2px solid #000;
  overflow: hidden;
  background: #f4f4f4;

  transition: transform 0.15s ease, box-shadow 0.15s ease;
  ${Item}:hover & {
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.18);
  }
`;

export const CoverImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export const ItemTitle = styled.h3`
  margin: 8px 0 0;
  font-size: clamp(14px, 1.2vw, 18px);
  font-weight: 800;
  line-height: 1.25;
`;

export const ItemSubtitle = styled.p`
  margin: 4px 0 0;
  font-size: clamp(12px, 1vw, 14px);
  color: #666;
`;

export const ProgressTrack = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 6px;
  background: #e6e6e6;
  border-radius: 999px;
  overflow: hidden;
`;

export const ProgressBar = styled.div`
  height: 100%;
  width: 100%;
  transform: scaleX(0);
  transform-origin: left center;
  background: #e53935;
  transition: transform 80ms linear;
`;