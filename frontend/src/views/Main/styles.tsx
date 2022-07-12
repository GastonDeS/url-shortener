import styled from "styled-components";

export const MainLinksContainer = styled.div `
    display:flex;
    width: 480px;
    background: #fff;
    height: 100%;
    align-self: flex-start;
    flex-direction: column;
    align-items: flex-start;
    min-height: 300px
`

export const MainContainer = styled.div `
    display:flex;
    width: 100%;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
`

export const FilterContainer = styled.div `
    display:flex;
    width: 480px;
    height: auto;
    align-self: flex-start;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 10px;
    box-sizing:border-box;
`
export const DataContainer = styled.div `
    display:flex;
    background: #fff;
    width: 100%;
    height: 100%;
    flex-direction: row;
    justify-content: flex-start;
    box-sizing:border-box;
`

export const ExpandedLink = styled.div `
    display:flex;
    background: #ffe;
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
    box-sizing:border-box;
`