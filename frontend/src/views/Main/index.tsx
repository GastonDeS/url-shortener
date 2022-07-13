import { PageContainer, Page, Button, Pill } from "../../GlobalStyles"
import Navbar from "../../components/Navbar"
import Link from "../../components/Link"
import { truncate } from "fs/promises"
import { MainLinksContainer, MainContainer, FilterContainer, DataContainer, ExpandedLink, LinkDiv, LinkText, LinkButtons, LinkListHeader } from "./styles"

const Main = () => {
    return (
        <Page>
            <Navbar isLogged={true} />
            <PageContainer>
                <div style={{ display: 'flex', boxSizing: 'border-box', width: '100%', padding: '0 20px', alignItems: 'center', justifyContent: "space-between" }}>
                    <span style={{fontSize: '35px'}}><b>Links</b></span>
                    <div style={{ display: 'flex', width: 'auto', height: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button primary>Upgrade to premium mode</Button>
                    </div>
                </div>
                <MainContainer>
                    <FilterContainer>
                        <Button primary>Filters</Button>
                        <select style={{ width: '150px' }} title="Tag">
                            <option>Tag1</option>
                            <option>Tag3</option>
                        </select>
                    </FilterContainer>
                    <DataContainer>
                        <MainLinksContainer>
                            <LinkListHeader>
                                <span>3 results</span>
                                <span>Clicks qty</span>
                            </LinkListHeader>
                            <Link isClicked={false}></Link>
                            <Link isClicked={false}></Link>
                            <Link isClicked={true}></Link>
                        </MainLinksContainer>
                        <ExpandedLink>
                            <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                                <span style={{alignSelf: 'flex-start', margin: '10px', fontSize: '34px', fontWeight: '500'}}>Main Text</span>
                                <Button>Edit</Button>
                            </div>
                            <span style={{alignSelf: 'flex-start', margin: '10px'}}>3 ago 01:32 by GastonDeSchant</span>
                            <LinkDiv>
                                <LinkText>
                                    <img src={require('../../linkLogo.png')} width='25px' style={{ verticalAlign: 'middle', margin: '0 7px 4px 0' }} />
                                    byPs/shortenedUrl
                                </LinkText>
                                <LinkButtons>
                                    <Button primary>Copy</Button>
                                    <Button>QR Code</Button>
                                </LinkButtons>
                            </LinkDiv>
                            <span style={{alignSelf: 'flex-start', margin: '0 10px',padding: '22px 0', borderBottom: '1px solid pink', width: '95%'}}><b>Destination:</b> https://gedes.com</span>
                            <span style={{alignSelf: 'flex-start', margin: '0 10px',padding: '22px 0', borderBottom: '1px solid pink', width: '95%'}}>Tags: <Pill>Tag 1</Pill> </span>
                            <span style={{margin: '6px 10px'}}><b>v Show Stats v</b></span>
                        </ExpandedLink>
                    </DataContainer>
                </MainContainer>
            </PageContainer>
        </Page>
    )
}

export default Main