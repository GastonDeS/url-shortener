import { PageContainer, Page, Button } from "../../GlobalStyles"
import Navbar from "../../components/Navbar"
import Link from "../../components/Link"
import { truncate } from "fs/promises"
import { MainLinksContainer, MainContainer, FilterContainer, DataContainer, ExpandedLink } from "./styles"

const Main = () => {
    return (
        <Page>
            <Navbar isLogged = {true}/>
            <PageContainer>
                <div style={{display: 'flex', boxSizing: 'border-box', width: '100%', padding: '0 20px', alignItems: 'center', justifyContent: "space-between"}}>
                    <h1>Links</h1>
                    <div style={{display: 'flex', width: 'auto', height: '40px', alignItems: 'center', justifyContent: 'space-between'}}>
                        <Button primary>Upgrade to premium mode</Button>
                    </div>
                </div>
                <hr style={{width: '99%'}}></hr>
                <MainContainer>
                    <FilterContainer>
                        <Button primary>Filters</Button>
                        <select style={{width: '150px'}}title="Tag">
                            <option>Tag1</option>
                            <option>Tag3</option>
                        </select>
                    </FilterContainer>
                    <DataContainer>
                        <MainLinksContainer>
                            <Link></Link>
                            <Link></Link>
                            <Link></Link>
                        </MainLinksContainer>
                        <ExpandedLink>
                           <h1>Main Text</h1>
                           <h3>Created by <b>User 1</b> on 3 ago</h3>
                        </ExpandedLink>
                    </DataContainer>
                </MainContainer>
            </PageContainer>
        </Page>
    )
}

export default Main