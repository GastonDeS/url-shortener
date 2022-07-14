import styled from "styled-components";

export const Wrapper = styled.form`
  background: ${(props) => props.theme.colors.first};
  width: 25vw;
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
