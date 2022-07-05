import styled from "styled-components";

export const NavContainer = styled.nav`
  width: 100vw;
  max-width: 100vw;
  background: ${(props) => props.theme.colors.first};
  color: black;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
`;

export const NavTitle = styled.h1`
  font-family: ${(props) => props.theme.fonts};
  font-size: 38px;
  margin: 0 0 0 14px;
`;

export const ButtonWrapper = styled.div`
  margin-right: 40px;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  @media (max-width: 990px) {
    align-items: flex-end;
    flex-direction: column;
  }
`;

export const NavButton = styled.button`
  color: black;
  background: none;
  border: 2px solid black;
  cursor: pointer;
  border-radius: 12px;
  margin-left: 10px;
  font-family: ${(props) => props.theme.fonts};
  font-size: ${(props) => props.theme.fontSizes.small};
  padding: 0.25em;
  :hover {
    background: ${(props) => props.theme.colors.third};
    transition: ease-in-out 0.2s;
  }
  @media (max-width: 990px) {
    margin-left: 0;
  }
`;