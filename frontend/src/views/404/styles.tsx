import styled from "styled-components";

export const Image = styled.img`
  width: 25%;
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.first};
  font-weight: bolder;
  margin-top: 30px;
`;

export const Text = styled.p`
  color: ${(props) => props.theme.colors.first};
  margin: 0;
`;