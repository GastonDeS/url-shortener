import { Tracing } from "trace_events"
import { LinkContainer, LinkDataContainer } from "./styles";
import click from "../../click.png"
import { useState } from "react";

interface LinkProps {
    name?: string;
    date?: string;
    shortenedUrl?: string;
    clickCount?: number;
    isClicked: boolean;
}

const Link = ({isClicked, ...rest}:LinkProps) => {
    const [clicked, setClicked] = useState(false);
    const [clicks, setClicks] = useState(10);
    

    return (
        <LinkContainer clicked={clicked} onClick = {() => setClicked(!clicked)} >
            <input type= "checkbox" ></input>
            <LinkDataContainer>
                <span><small>3 ago</small></span>
                <span><b>Main Text</b></span>
                <span>byPs/shortenedUrl</span>
            </LinkDataContainer>
            <div style={{display: 'flex', alignItems: 'center', fontSize: '20px'}} onClick = {() => setClicks(clicks+1)}>
               🖱️
            {clicks}</div>
        </LinkContainer>
    )
}

export default Link;