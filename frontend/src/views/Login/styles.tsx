import styled from "styled-components";

export const Wrapper = styled.form`
  background: ${(props) => props.theme.colors.first};
  width: 20vw;
  padding: 20px 40px;
  border-radius: 12px;
  margin-bottom: 100px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Label = styled.label`
  color: black;
  font-size: 1.25em;
  margin: 0 0 8px 0;
`;

export const Input = styled.input`
  border-radius: 6px;
  border: 1px solid ${(props) => props.theme.colors.first};
  padding: 6px;
  color: ${(props) => props.theme.colors.first};
  margin-bottom: 8px;
  font-size: 18px;
  background-color: ${(props) => props.theme.colors.second};
  width: 90%;
`;

export const Button = styled.button`
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

export const Error = styled.p`
  font-size: ${(props) => props.theme.fontSizes.small};
  text-transform: none;
  color: ${(props) => props.theme.colors.second};
  letter-spacing: 0;
  margin: 0.35rem 0 0.35rem 0;
  align-self: center;
`;
