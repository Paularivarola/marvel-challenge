import styled from "styled-components";

export const SrOnly = styled.span`
  position: absolute !important;
  height: 1px;
  width: 1px;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  white-space: nowrap;
  border: 0;
  padding: 0;
  margin: -1px;
`;

export const ContainerLoader = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #111;
  background: #fff;
`;

export const LogoImg = styled.img`
  height: 5rem;
  display: block;
`;

export const StatusRegion = styled.div`
  margin-top: 1rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
`;

export const SpinnerBar = styled.div`
  /* Uses currentColor to naturally inherit a high-contrast color */
  --loader-color: currentColor;
  --c: var(--loader-color) 0 15px, #0000 0 20px;

  width: calc(80px / cos(66deg));
  height: 14px;
  background:
    repeating-linear-gradient(135deg, var(--c)) left top,
    repeating-linear-gradient(45deg, var(--c)) left bottom;
  background-size: 200% 50%;
  background-repeat: no-repeat;
  animation: loaderSlide 2s linear infinite;

  @keyframes loaderSlide {
    to {
      background-position:
        top right,
        bottom right;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;
