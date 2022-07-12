import { Tracing } from "trace_events"
import { LinkContainer, LinkDataContainer } from "./styles";
import click from "../../click.png"

interface LinkProps {
    name: string;
    date: string;
    shortenedUrl: string;
    clickCount: number;
}

const Link = () => {
    return (
        <LinkContainer>
            <input type= "checkbox"></input>
            <LinkDataContainer>
                <span> <small>3 ago</small></span>
                <span><b>Main Text</b></span>
                <span>byPs/shortenedUrl</span>
            </LinkDataContainer>
            <div style={{display: 'flex', alignItems: 'center'}}>
                <img width={'22px'} src={require("../../click.png")}></img>
            10</div>
        </LinkContainer>
    )
}

export default Link;