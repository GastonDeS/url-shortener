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
  background: ${(props) => props.theme.colors.second};
  color: black;
  border-radius:10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #D67097;
  font-weight: 600;
  font-size: 18px;
  padding: 7px 15px;
  height: fit-content;
  align-self: center;
  margin-top: 0.5em;

  &:hover {
    color: ${(props) => props.theme.colors.first};
  }
`;