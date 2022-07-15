import styled from "styled-components";

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
  margin-top: 0.5em;

  p {
    font-size: ${(props) => props.theme.fontSizes.small};
    margin: 0;
    color: black;
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

export const Button = styled.button <{primary?: boolean}> `
  background: ${props => props.primary ? "#D67097" : "white"};
  color: ${props => props.primary ? "black" : "#D67097"};
  border-radius:10px;
  text-align: center;
  cursor: pointer;
  border: 1px solid #D67097;
  font-weight: 600;
  font-size: 18px;
  padding: 4px 15px;
  height: fit-content;
  align-self: center;

  &:hover {
    background-color: #d67097c9;
    color: ${props => props.primary ? "black" : "white"};
  }
`;

export const Pill = styled.span `
  background-color: #8a9;
  text-align: center;
  border: none;
  color: black;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  padding: 5px 8px 7px 8px;
  line-height: 22px;
  cursor: pointer;
  border-radius: 16px;
`;
