import styled, { createGlobalStyle } from "styled-components";

export const Page = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  width: 100%;
`;

export const PageContainer = styled.div`
  background: ${(props) => props.theme.colors.second};
  width: 100%;
  flex: 1;
  padding-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h3`
  color: black;
  font-size: ${(props) => props.theme.fontSizes.medium};
  margin: 0 0 15px 0;
`;

export const Request = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  gap: 0.1rem;

  p {
    font-size: ${(props) => props.theme.fontSizes.small};
  }

  button {
    background: transparent;
    border: none;
    text-decoration: underline;
    font-size: ${(props) => props.theme.fontSizes.small};

    &:hover {
      color: black;
    }
  }
`;