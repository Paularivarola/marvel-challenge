import styled from "styled-components";

export const Logo = styled.div`
  img {
    height: 50px;
    cursor: pointer;
  }
`;

export const Favorites = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  .icon {
    font-size: 20px;
    margin-right: 5px;
  }

  .count {
    font-size: 14px;
    font-weight: bold;
  }
`;

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.5rem 1.5rem;
  border-bottom: 1px solid #333333;
`;
export const ContainerLink = styled.div`
  display: flex;
  height: 100%;
  align-items: center;
  text-decoration: none;
  color: white;
`
