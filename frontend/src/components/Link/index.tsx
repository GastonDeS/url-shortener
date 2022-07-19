import { LinkContainer, LinkDataContainer } from "./styles";
import { useState } from "react";
import { LinkData } from "../../views/Main";

interface LinkProps {
    linkData: LinkData;
    onClick?: any;
    clicked: boolean;
}

const Link = ({onClick,linkData, clicked}:LinkProps) => {

    return (
        <LinkContainer clicked={clicked} onClick = {() => onClick(linkData)} >
            <input type= "checkbox" ></input>
            <LinkDataContainer>
                <span><small>Created {linkData.creationTime.split('T')[0]}</small></span>
                <span><b>{linkData.name}</b></span>
                <span>byPs/{linkData.shortUrl}</span>
            </LinkDataContainer>
            <div style={{display: 'flex', alignItems: 'center', fontSize: '20px'}}>
               🖱️
            {linkData.totalCount}</div>
        </LinkContainer>
    )
}

export default Link;