import { LinkContainer, LinkDataContainer } from "./styles";
import { useState } from "react";
import { LinkData } from "../../views/Main";
import { link } from "fs";

interface LinkProps {
    linkData: LinkData;
    onClick?: any;
    clicked: boolean;
}

const Link = ({onClick,linkData, clicked}:LinkProps) => {

    return (
        <LinkContainer clicked={clicked} onClick = {() => onClick(linkData)} >
            <LinkDataContainer>
                <span><small>Created {linkData.creationTime.split(',')[0]}</small></span>
                <span><b>{linkData.name}</b></span>
                <span>byPs/{linkData.shortUrl}</span>
            </LinkDataContainer>
            <div style={{display: 'flex', alignItems: 'center', fontSize: '20px'}}>
               🖱️
            {linkData.clicks}</div>
        </LinkContainer>
    )
}

export default Link;