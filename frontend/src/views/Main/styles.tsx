import styled from "styled-components";

export const MainLinksContainer = styled.div`
    display:flex;
    width: 480px;
    background: #f5edeb;
    height: 100%;
    align-self: flex-start;
    flex-direction: column;
    align-items: flex-start;
    min-height: 300px;
`

export const MainContainer = styled.div`
    display:flex;
    width: 100%;
    height: auto;
    overflow: auto;
    flex-direction: column;
    align-items: flex-start;
    flex: 1;
`

export const FilterContainer = styled.div`
    display:flex;
    width: 480px;
    height: auto;
    align-self: flex-start;
    flex-direction: row;
    justify-content: flex-start;
    margin: 20px 0 10px 20px;
    box-sizing:border-box;
`
export const DataContainer = styled.div`
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

export const ExpandedLink = styled.div`
    display:flex;
    background: #ffe;
    width: 100%;
    height: calc(100vh - 222px);
    flex-direction: column;
    align-items: center;
    box-sizing:border-box;
    padding: 0 30px;
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
    overflow-y: scroll;
    

    ::-webkit-scrollbar {
        display: none;
    }
`

export const LinkDiv = styled.div`
    border: solid 3px pink;
    border-radius: 5px;
    height: 65px;
    width: 80%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 30px 0 10px 0;
`

export const LinkText = styled.span`
    color: grey;
    font-size: 26px;
    padding: 0 10px;
    text-align: center;
`

export const LinkButtons = styled.div`
    display: flex;
    justify-content: space-evenly;
    height: 34px;
    width: 200px;
    margin: 10px 5px;
`

export const LinkListHeader = styled.div`
    display: flex;
    box-sizing: border-box;
    flex-direction: row;
    width: 100%;
    justify-content: space-between;
    padding: 10px 20px 10px 10px;
    border-bottom: 1px solid #cfa9b8;
`

export const SelectsContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
`

export const CustomSelectContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 10vh;
    justify-content: space-between;
    margin-bottom: 3vh;
`

export const EditLinkContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: fit-content;
    margin: 15px 5px 0;
`

export const ModalTitle = styled.span`
    font-size: 2em;
    font-weight: 600;
`
export const ModalTitleContainer = styled.div`
    display: flex;
    text-align: center;
    height: 8vh;
    margin: 7px 4px;
    align-items: center;
    justify-content: space-between;
`

export const CustomInput = styled.input`
    outline:none;
    height:34px;
    bottom:14px;
    right:9px;
    border-radius: 5px;
    box-sizing:border-box;
    padding:0 12px;
    margin: 5px 0;
    height: 5.5vh;
    border: 2px solid #D67097;
    :focus {
        box-shadow: 0 0 0 1px #D67097;
    }
`
export const TagsContainer = styled.div`
    display: grid;
    grid-template-columns: auto auto auto;
    padding: 10px;
    width: 80%;
`

export const InputTitle = styled.span`
    font-size: 18px;
    font-weight: 500;
`

export const CustomA = styled.a`
	text-decoration: none;
	color: black;
	padding: 4px;
    font-size: 16px;
    font-weight: 400;
`
