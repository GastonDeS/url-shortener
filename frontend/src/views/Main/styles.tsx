import styled from "styled-components";

export const MainLinksContainer = styled.div `
    display:flex;
    width: 480px;
    background: #f5edeb;
    height: 100%;
    align-self: flex-start;
    flex-direction: column;
    align-items: flex-start;
    min-height: 300px;
`

export const MainContainer = styled.div `
    display:flex;
    width: 100%;
    height: auto;
    overflow: auto;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
`

export const FilterContainer = styled.div `
    display:flex;
    width: 480px;
    height: auto;
    align-self: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    margin: 20px 0 10px 20px;
    box-sizing:border-box;
`
export const DataContainer = styled.div `
    display:flex;
    width: 100%;
    height: auto;
    background: #f5edeb;
    flex-direction: row;
    justify-content: flex-start;
    box-sizing:border-box;
    border-top: 0.12em solid #cfa9b8;
    flex: 1;
`

export const ExpandedLink = styled.div `
    display:flex;
    background: #ffe;
    width: 100%;
    height: auto;
    flex-direction: column;
    align-items: center;
    box-sizing:border-box;
    padding: 0 30px;
`

export const LinkDiv = styled.div `
    border: solid 3px pink;
    border-radius: 5px;
    height: 65px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0 10px 0;
`

export const LinkText = styled.span `
    color: grey;
    font-size: 26px;
    padding: 0 10px;
    text-align: center;
`

export const LinkButtons = styled.div `
    display: flex;
    justify-content: space-evenly;
    height: 34px;
    width: 200px;
    margin: 10px 5px;
`

export const LinkListHeader = styled.div `
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding: 10px 20px 10px 10px;
    border-bottom: 1px solid #cfa9b8;
`