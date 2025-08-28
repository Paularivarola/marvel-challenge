import logoMarvel from "../../assets/icons/icLogo.svg";
import {
  ContainerLoader,
  LogoImg,
  StatusRegion,
  SpinnerBar,
  SrOnly,
} from "./styles";

interface LoaderProps {
  testId?: string;
}

const Loader = ({ testId }: LoaderProps) => {
  return (
    <ContainerLoader data-testid={testId} aria-busy="true">
      <LogoImg src={logoMarvel} alt="logo" aria-hidden="true" />
      <StatusRegion role="status" aria-live="polite" aria-atomic="true">
        <SpinnerBar aria-hidden="true" />
        <SrOnly>Loading, please wait…</SrOnly>
      </StatusRegion>
    </ContainerLoader>
  );
};

export default Loader;
