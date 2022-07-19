import styled from "styled-components";

export const LinkContainer = styled.div  <{clicked?: boolean}>  `
    display: flex;
    flex-direction: row;
    padding: 0 40px 0 20px;
    justify-content: space-between;
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