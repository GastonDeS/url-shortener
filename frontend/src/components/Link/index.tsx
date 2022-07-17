import { LinkContainer, LinkDataContainer } from "./styles";
import { useState } from "react";
import { LinkData } from "../../views/Main";

interface LinkProps {
    linkData: LinkData;
    onClick?: any;
    clicked: boolean;
}

const Link = ({onClick,linkData, clicked}:LinkProps) => {
    const [clicks, setClicks] = useState(10);

    return (
        <LinkContainer clicked={clicked} onClick = {() => onClick(linkData)} >
            <input type= "checkbox" ></input>
            <LinkDataContainer>
                <span><small>{linkData.id}</small></span>
                <span><b>{linkData.shortUrl}</b></span>
                <span>byPs/{linkData.shortUrl}</span>
            </LinkDataContainer>
            <div style={{display: 'flex', alignItems: 'center', fontSize: '20px'}} onClick = {() => setClicks(clicks+1)}>
               🖱️
            {clicks}</div>
        </LinkContainer>
    )
}

export default Link;