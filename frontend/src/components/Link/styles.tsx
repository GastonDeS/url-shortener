import styled from "styled-components";

export const LinkContainer = styled.div  <{clicked?: boolean}>  `
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    height: 80px;
    width: 480px;
    border-bottom: 1px solid #cfa9b8;
    background: ${props => props.clicked ? "#ffe": "transparent"};
`

export const LinkDataContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: auto;
    width: 280px;
    padding: 5px 0;
`