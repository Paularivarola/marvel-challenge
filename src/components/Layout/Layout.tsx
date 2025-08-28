import type { ReactNode } from "react";
import { Header } from "../Header/Header";
import {
  AppShell,
  LayoutSkipLink,
  HeaderSlot,
  Main,
  Container,
} from "./styles";

interface LayoutProps {
  children: ReactNode;
  stickyHeader?: boolean;
  withFooter?: boolean;
}

const Layout = ({ children, stickyHeader = true }: LayoutProps) => {
  return (
    <AppShell>
      <LayoutSkipLink href="#main-content">Skip to content</LayoutSkipLink>
      <HeaderSlot $sticky={stickyHeader}>
        <Header />
      </HeaderSlot>
      <Main id="main-content" tabIndex={-1}>
        <Container>{children}</Container>
      </Main>
    </AppShell>
  );
};

export default Layout;
