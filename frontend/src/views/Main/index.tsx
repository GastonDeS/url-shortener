import '@coreui/coreui/dist/css/coreui.min.css'
import { PageContainer, Page, Button, Pill } from "../../GlobalStyles"
import Navbar from "../../components/Navbar"
import Link from "../../components/Link"
import { MainLinksContainer, MainContainer, FilterContainer, DataContainer, ExpandedLink, LinkDiv, LinkText, LinkButtons, LinkListHeader } from "./styles"
import { useAuth } from "../../UserContext"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { CCollapse, CCard, CCardBody } from '@coreui/react'
import ReactModal from 'react-modal'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

const Main = () => {

    const { login, user } = useAuth();
    const currUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let navigate = useNavigate();

    useEffect(() => {
        if (currUser && currUser !== "") {
            let newUser = {
                accessToken: token!,
                user: JSON.parse(currUser)
            }
            login(newUser)
        } else {
            navigate('/login')
        }
    }, [])

    const [show, setShow] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);

    ChartJS.register(
        CategoryScale,
        LinearScale,
        BarElement,
        Title,
        Tooltip,
        Legend
    );

    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top' as const,
            },
            title: {
                display: true,
                text: 'Clicks per Date',
                font: {
                    size: 30,
                }
            },
        },
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
    const data = {
        labels,
        datasets: [
            {
                label: 'Clicks',
                data: labels.map(() => Math.random() * 10),
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };

    return (
        <Page>
            <Navbar isAuth={true}/>
            <PageContainer>
                <div style={{ display: 'flex', boxSizing: 'border-box', width: '100%', padding: '0 20px', alignItems: 'center', justifyContent: "space-between" }}>
                    <span style={{ fontSize: '35px' }}><b>Links</b></span>
                    <div style={{ display: 'flex', width: 'auto', height: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button primary>Upgrade to premium</Button>
                    </div>
                </div>
                <MainContainer>
                    <FilterContainer>
                        <Button primary onClick={() => setShowFilters(!showFilters)}>Filters</Button>
                    </FilterContainer>
                    {showFilters && <div>AA</div>}
                    <ReactModal isOpen={showFilters}>
                        AAAAAAAAAAA
                    </ReactModal>

                    <DataContainer>
                        <MainLinksContainer>
                            <LinkListHeader>
                                <span>3 results</span>
                                <span>Total Clicks</span>
                            </LinkListHeader>
                            <Link isClicked={false}></Link>
                            <Link isClicked={false}></Link>
                            <Link isClicked={true}></Link>
                        </MainLinksContainer>
                        <ExpandedLink>
                            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                <span style={{ alignSelf: 'flex-start', margin: '10px', fontSize: '34px', fontWeight: '500' }}>Main Text</span>
                                <Button>Edit</Button>
                            </div>
                            <span style={{ alignSelf: 'flex-start', margin: '10px' }}>3 ago 01:32 by GastonDeSchant</span>
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
                            <span style={{ alignSelf: 'flex-start', margin: '0 10px', padding: '22px 0', borderBottom: '1px solid pink', width: '95%' }}><b>Destination:</b> https://gedes.com</span>
                            <span style={{ alignSelf: 'flex-start', margin: '0 10px', padding: '22px 0', borderBottom: '1px solid pink', width: '95%' }}>
                                Tags: <Pill>Tag 1</Pill> <Pill>Tag 2</Pill> <Button>+</Button> </span>
                            <div style={{ padding: '30px 0 10px 0' }}>
                                <Button onClick={async () => {
                                    setShow(!show);
                                    await new Promise(r => setTimeout(r, 400));; window.scrollTo(0, document.body.scrollHeight);
                                }}>
                                    {show ? '^' : 'v'} {show ? 'Hide' : 'Show'} Stats {show ? '^' : 'v'}
                                </Button>
                            </div>
                            <CCollapse style={{ width: '55rem' }} visible={show} >
                                <CCard style={{ background: 'transparent', margin: '10px' }}>
                                    <CCardBody><Bar options={options} data={data} /></CCardBody>
                                </CCard>
                            </CCollapse>
                        </ExpandedLink>
                    </DataContainer>
                </MainContainer>
            </PageContainer>
        </Page>
    )
}

export default Main