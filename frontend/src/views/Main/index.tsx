import '@coreui/coreui/dist/css/coreui.min.css'
import { PageContainer, Page, Button, Pill } from "../../GlobalStyles"
import Navbar from "../../components/Navbar"
import Link from "../../components/Link"
import {
    MainLinksContainer, MainContainer, FilterContainer,
    DataContainer, ExpandedLink, LinkDiv, LinkText, LinkButtons, LinkListHeader, SelectsContainer, CustomSelectContainer, EditLinkContainer,
    ModalTitle, ModalTitleContainer, TagInput
} from "./styles"
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
import Select from 'react-select';
import { DateSelectStyle, TagSelectStyle } from './SelectData/selectStyles'
import { colourOptions } from './SelectData/data'
import { modalStyle, rightModalStyle } from './ModalData/ModalStyle'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../UserContext'
import { useEffect, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'


const Main = () => {

    const { login, user } = useAuth();
    const currUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let navigate = useNavigate();
    const [show, setShow] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [showQR, setShowQR] = useState<boolean>(false);
    const [showEditLink, setShowEditLink] = useState<boolean>(false);


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
            <Navbar isAuth={true} />
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
                    <ReactModal isOpen={showFilters} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} style={modalStyle}>
                        <ModalTitleContainer>
                            <ModalTitle>Filters</ModalTitle>
                            <Button onClick={() => setShowFilters(false)}>&#10005;</Button>
                        </ModalTitleContainer>
                        <SelectsContainer>
                            <CustomSelectContainer>
                                <span>Tags</span>
                                <Select
                                    closeMenuOnSelect={false}
                                    defaultValue={[colourOptions[0], colourOptions[1]]}
                                    isMulti
                                    options={colourOptions}
                                    styles={TagSelectStyle}
                                />
                            </CustomSelectContainer>
                            <CustomSelectContainer>
                                <span>Since</span>
                                <Select options={[{ value: 'date', label: "12/12/12" }, { value: 'date2', label: "13/12/12" }]} styles={DateSelectStyle} />
                            </CustomSelectContainer>
                            <Button primary onClick={() => setShowFilters(false)}>Apply</Button>
                        </SelectsContainer>
                    </ReactModal>
                    <ReactModal isOpen={showQR} style={modalStyle}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <ModalTitleContainer>
                                <ModalTitle>QR Code</ModalTitle>
                                <Button onClick={() => setShowQR(false)}>&#10005;</Button>
                            </ModalTitleContainer>
                            <div style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex', height: 'fit-content', width: 'fit-content', margin: '15px 0' }}>
                                <QRCodeCanvas size={324} value="https://app.bitly.com/" fgColor='#D67097' />
                            </div>
                            <Button primary onClick={() => setShowQR(false)} style={{ alignSelf: "center" }}>Save</Button>
                        </div>
                    </ReactModal>
                    <ReactModal isOpen={showEditLink} style={rightModalStyle}>
                        <ModalTitleContainer style={{ backgroundColor: "#D67097", margin: '0', padding: '7px 4px', height: '70px' }}>
                            <ModalTitle>Edit Link</ModalTitle>
                            <Button primary onClick={() => setShowEditLink(false)}>&#10005;</Button>
                        </ModalTitleContainer>
                        <div style={{display: 'flex', flexDirection: 'column', margin: '15px'}}>
                            <EditLinkContainer>
                                <span>Edit Link Title</span>
                                <input type={"text"}></input>
                            </EditLinkContainer>
                            <EditLinkContainer>
                                <span>Edit Link</span>
                                <input type={"text"}></input>
                            </EditLinkContainer>
                            <EditLinkContainer>
                                <span>Tags</span>
                                <TagInput type={"text"}></TagInput>
                            </EditLinkContainer>
                            <Button style={{ width: '100%', margin: '0' }} onClick={() => setShowEditLink(false)}> Save </Button>
                        </div>
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
                                <Button onClick={() => setShowEditLink(true)}>Edit</Button>
                            </div>
                            <span style={{ alignSelf: 'flex-start', margin: '10px' }}>3 ago 01:32 by GastonDeSchant</span>
                            <LinkDiv>
                                <LinkText>
                                    <img src={require('../../linkLogo.png')} width='25px' style={{ verticalAlign: 'middle', margin: '0 7px 4px 0' }} />
                                    byPs/shortenedUrl
                                </LinkText>
                                <LinkButtons>
                                    <Button primary>Copy</Button>
                                    <Button onClick={() => setShowQR(true)}>QR Code</Button>
                                </LinkButtons>
                            </LinkDiv>
                            <span style={{ alignSelf: 'flex-start', margin: '0 10px', padding: '22px 0', borderBottom: '1px solid pink', width: '95%' }}>
                                <b>Destination: </b><a href="https://www.google.com">https://gedes.com</a></span>
                            <span style={{ alignSelf: 'flex-start', margin: '0 10px', padding: '22px 0', borderBottom: '1px solid pink', width: '95%' }}>
                                Tags: <Pill>Tag 1</Pill> <Pill>Tag 2</Pill> <Button>&#43;</Button> </span>
                            <div style={{ padding: '30px 0 10px 0' }}>
                                <Button onClick={async () => {
                                    setShow(!show);
                                    await new Promise(r => setTimeout(r, 400));; window.scrollTo(0, document.body.scrollHeight);
                                }}>
                                    {show ? "\u2191" : "\u2193"} {show ? 'Hide' : 'Show'} Stats {show ? '\u2191' : '\u2193'}
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
        </Page >
    )
}

export default Main