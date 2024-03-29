import '@coreui/coreui/dist/css/coreui.min.css'
import { PageContainer, Page, Button, Pill, PillButton } from "../../GlobalStyles"
import Navbar from "../../components/Navbar"
import Link from "../../components/Link"
import {
    MainLinksContainer, MainContainer, FilterContainer,
    DataContainer, ExpandedLink, LinkDiv, LinkText, LinkButtons, LinkListHeader, SelectsContainer, CustomSelectContainer, EditLinkContainer,
    ModalTitle, ModalTitleContainer, CustomInput, TagsContainer, InputTitle, CustomA,
    PremiumOptions, UpdateError
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
    ChartData,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import Select from 'react-select';
import { DateSelectStyle, TagSelectStyle } from './SelectData/selectStyles'
import { modalStyle, rightModalStyle } from './ModalData/ModalStyle'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../UserContext'
import { useEffect, useRef, useState } from 'react'
import { QRCodeCanvas } from 'qrcode.react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { axiosService, linkService } from '../../services'
import { methods } from '../../assets/constants'
import axios, { AxiosResponse } from 'axios'
import { userService } from '../../services'
import { handleFailure } from '../../handlers/errorHandler'
import { array, element, string } from 'prop-types'
import { useForm } from 'react-hook-form'
import { createOptions, Options } from './SelectData/data'



interface HistogramData {
    date: string,
    clicks: number
}

interface ApiChartData {
    histogram: HistogramData[],
    totalCount: number;

}

export interface EditLinkData {
    shortUrl: string,
    name: string,
    labels: string[]
}

export interface NewLinkData extends EditLinkData {
    userId: string,
    url: string,
};

export interface LinkData extends NewLinkData {
    _id: string,
    creationTime: string,
    updatedAt: string,
    totalCount: number,
    clicks: number;
};


const Main = () => {

    const { login, user, updatePlan } = useAuth();
    const currUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    let navigate = useNavigate();
    const [show, setShow] = useState<boolean>(false);
    const [showFilters, setShowFilters] = useState<boolean>(false);
    const [showQR, setShowQR] = useState<boolean>(false);
    const [showEditLink, setShowEditLink] = useState<boolean>(false);
    const [showNewLink, setShowNewLink] = useState<boolean>(false);
    const [tags, setTags] = useState<string[]>([]);
    const [links, setLinks] = useState<LinkData[]>([]);
    const [clickedLink, setClickedLink] = useState<LinkData>();
    const tagInputRef = useRef<HTMLInputElement>(null);
    const chartDivRef = useRef<HTMLDivElement>(null);
    const [chartData, setChartData] = useState<number[]>([]);
    const [labels, setLabels] = useState<string[]>([]);
    const [upgradePremium, setUpgradePremium] = useState<boolean>(false);
    const [updateError, setUpdateError] = useState<boolean>(false);
    const { register, setValue, handleSubmit, reset } = useForm<NewLinkData>();
    const [newLinkCreated, setNewLinkCreated] = useState(false);
    const [newLinkTags, setNewLinkTags] = useState<string[]>([]);
    const [allTags, setAllTags] = useState<string[]>([]);
    const [filters, setFilters] = useState<string[]>([]);
    const [fetchLinks, setFetchLinks] = useState<boolean>(false);
    const [histogramInterval, setHistogramInterval] = useState<string | undefined>('D');
    const [filterDate, setFilterDate] = useState<string>("");
    const dateRef = useRef<HTMLInputElement>(null);

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

    const expandLink = (link: LinkData) => {
        setClickedLink(link);
        if (link.labels)
            setTags(link.labels);
    }

    const addNewTag = (value: string, newLink: boolean) => {
        if (!tags.includes(value)) {
            if (newLink) {
                setNewLinkTags(newLinkTags => [...newLinkTags, value]);
                setValue("labels", [...newLinkTags, value])
            }
            else {
                setTags(tags => [...tags, value]);
                setValue("labels", [...tags, value])
            }
        }
        if (tagInputRef.current?.value)
            tagInputRef.current.value = "";

    }

    const removeTag = (value: string, newLink: boolean) => {
        if (newLink) {
            setNewLinkTags(newLinkTags.filter(t => t !== value));
            setValue("labels", newLinkTags.filter(t => t !== value));
        }
        else {
            setTags(tags.filter(t => t !== value));
            setValue("labels", tags.filter(t => t !== value));
        }
    }

    useEffect(() => {
        if (user) {
            axiosService.authAxiosWrapper<LinkData[]>(methods.GET, `/v1/users/${user.userId}/links`, {}, {})
                .then((ans: AxiosResponse<any, LinkData[]>) => {
                    setNewLinkCreated(false);
                    reset();
                    setValue("labels", []);
                    ans.data.forEach((el: LinkData) => el.creationTime = new Date(el.creationTime).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                    }));
                    setLinks(ans.data)
                    setClickedLink(ans.data[0]);
                    setFetchLinks(false);
                    setTags(ans.data[0].labels)
                    let auxTags: string[] = [];
                    ans.data.forEach((el: LinkData) => {
                        el.labels.forEach(label => {
                            if (!auxTags.includes(label))
                                auxTags.push(label)
                        })
                    });
                    setAllTags(auxTags);
                });

        }
    }, [user, newLinkCreated, fetchLinks]);

    useEffect(() => {
        setShow(false);
    }, [clickedLink])

    const createNewLink = (newLinkData: NewLinkData) => {
        if (newLinkData.shortUrl === "" || newLinkData.url === "") {
            emitErrorToast("Short or Long link missing!")
            return;
        }
        axiosService.authAxiosWrapper(methods.POST, `/v1/urls`, {}, newLinkData)
            .then(res => {
                setNewLinkCreated(true);
                setShowNewLink(false);
                reset();
            })
            .catch(res => {
                console.log(res);
                emitErrorToast('Short Link is already taken!');
            })
    };

    const editLink = (newLinkData: NewLinkData) => {
        const formData = {
            shortUrl: newLinkData.shortUrl,
            name: newLinkData.name,
            labels: newLinkData.labels
        }
        reset();
        if (clickedLink) {
            linkService.editLink(formData, clickedLink._id)
                .then(res => {
                    if (res.hasFailed()) {
                        handleFailure(res.getStatus(), navigate);
                    } else {
                        setShowEditLink(false);
                        setFetchLinks(true);
                    }
                });
        }
    }

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
                text: `Clicks per ${histogramInterval === 'D' ? 'day' : 'month'}`,
                font: {
                    size: 30,
                }
            },
        },
    };
    let cdata = {
        labels,
        datasets: [
            {
                label: 'Clicks',
                data: chartData,
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
        ],
    };


    const getChartData = () => {
        axiosService.authAxiosWrapper(methods.GET, `/v1/users/link/${clickedLink?.shortUrl}`,
            {
                params: {
                    interval: histogramInterval
                }
            }, {})
            .then((res: AxiosResponse<any, ApiChartData[]>) => {
                // const filteredData: HistogramData[] = res.data.histogram.reduce((group: HistogramData[], elem: HistogramData) => {
                //     const date: string = elem.date
                //     // let idx: number = -1;
                //     // for (let i = 0; i < group.length; i++) {
                //     //     if (group[i].date === date)
                //     //         idx = i;
                //     // };
                //     // if (idx !== - 1)
                //     //     group[idx].clicks += elem.cli;
                //     // else {
                //     //     elem._id = date;
                //     //     group.push(elem);
                //     // }
                //     return group;
                setChartData(res.data.histogram.map((v: HistogramData) => v.clicks));
                setLabels(res.data.histogram.map((e: HistogramData) => e.date));
            });
    }

    useEffect(getChartData, [histogramInterval]);

    const emitCopyToast = () => {
        toast('\u2705 Copied to clipboard!', {
            autoClose: 1000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            position: 'bottom-center'
        });
    }
    const emitErrorToast = (message: string) => {
        toast.error(message, {
            toastId: 2,
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: false,
            progress: undefined,
            position: 'top-right'
        });
    }


    const handleUpgradePremium = () => {
        userService.updatePlan(user!.userId)
            .then(res => {
                if (res.hasFailed()) {
                    handleFailure(res.getStatus(), navigate);
                    setUpdateError(true);
                } else {
                    updatePlan();
                    setUpgradePremium(false);
                }
            })
    }

    const modifyFilters = (filters: string[]) => {
        setFilters(filters);
    }

    const applyFilters = () => {
        const params: any = {}
        if (filters.length > 0 || dateRef.current?.value.length !== 0) {
            if (filters.length > 0)
                params['labels'] = filters.join(',');
            if (dateRef.current && dateRef.current.value !== "")
                params['after'] = dateRef.current.value;
            axiosService.authAxiosWrapper(methods.GET, `/v1/users/${user?.userId}/links`, { params: params }, {})
                .then((res: AxiosResponse<any, LinkData[]>) => {
                   res.data.forEach((el: LinkData) => el.creationTime = new Date(el.creationTime).toLocaleDateString("en-US", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "numeric",
                        minute: "numeric"
                    }));
                    setLinks(res.data)
                });
        }
        else
            setFetchLinks(true);
    }

    return (
        <Page>
            <Navbar isAuth={true} />
            <PageContainer>
                <div style={{ display: 'flex', boxSizing: 'border-box', width: '100%', padding: '0 20px', alignItems: 'center', justifyContent: "space-between" }}>
                    <span style={{ fontSize: '35px' }}><b>Links</b></span>
                    {user?.type === 0 && <div style={{ display: 'flex', width: 'auto', height: '40px', alignItems: 'center', justifyContent: 'space-between' }}>
                        <Button primary onClick={() => setUpgradePremium(true)}>Upgrade to premium</Button>
                    </div>}
                </div>
                <MainContainer>
                    <FilterContainer>
                        <Button primary onClick={() => setShowFilters(!showFilters)}>Filters</Button>
                        <Button onClick={() => setShowNewLink(true)}>New link</Button>
                    </FilterContainer>
                    <ReactModal isOpen={showNewLink} style={rightModalStyle} ariaHideApp={false}>
                        <ModalTitleContainer style={{ backgroundColor: "#D67097", margin: '0', padding: '7px 4px', height: '70px' }}>
                            <ModalTitle>New Link</ModalTitle>
                            <Button primary onClick={() => setShowNewLink(false)}>&#10005;</Button>
                        </ModalTitleContainer>
                        <form style={{ display: 'flex', flexDirection: 'column', margin: '15px' }} onSubmit={handleSubmit(createNewLink)}>
                            <EditLinkContainer>
                                <InputTitle>Link Title</InputTitle>
                                <CustomInput {...register("name")} type={"text"} placeholder="Choose your link title"></CustomInput>
                            </EditLinkContainer>
                            <EditLinkContainer>
                                <InputTitle>Long Link</InputTitle>
                                <CustomInput {...register("url")} type={"text"} placeholder="Paste the destination URL" ></CustomInput>
                            </EditLinkContainer>
                            <EditLinkContainer>
                                <InputTitle>Short Link</InputTitle>
                                <CustomInput {...register("shortUrl")} type={"text"} placeholder="Choose your shortened link"></CustomInput>
                            </EditLinkContainer>
                            <EditLinkContainer>
                                <InputTitle>Tags</InputTitle>
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <CustomInput ref={tagInputRef} style={{ borderRadius: '22px', marginRight: '10px', width: '75%' }} placeholder="Create new tags" type={"text"} />
                                    <Button type='button' onClick={() => tagInputRef.current?.value && addNewTag(tagInputRef.current?.value, true)}>&#43;</Button>
                                </div>
                                <TagsContainer>
                                    {newLinkTags.map((tag, idx) => {
                                        return (
                                            <Pill key={idx}>{tag}<PillButton type='button' onClick={() => { removeTag(tag, true); }}>&#10005;</PillButton></Pill>
                                        );
                                    })}
                                </TagsContainer>
                            </EditLinkContainer>
                            <hr style={{ margin: '3px 0 20px 0' }} />
                            <Button style={{ width: '100%', margin: '0' }} type="submit"> Create link </Button>
                        </form>
                    </ReactModal>
                    <ReactModal isOpen={showFilters} shouldCloseOnOverlayClick={true} shouldCloseOnEsc={true} style={modalStyle} ariaHideApp={false}>
                        <ModalTitleContainer>
                            <ModalTitle>Filters</ModalTitle>
                            <Button onClick={() => setShowFilters(false)}>&#10005;</Button>
                        </ModalTitleContainer>
                        <SelectsContainer>
                            <CustomSelectContainer>
                                <span>Tags</span>
                                <Select
                                    onChange={(options) => modifyFilters(options.map(o => o.value))}
                                    closeMenuOnSelect={false}
                                    isMulti
                                    options={allTags ? createOptions(allTags) : []}
                                    value={createOptions(filters)}
                                    styles={TagSelectStyle}
                                />
                            </CustomSelectContainer>
                            <CustomSelectContainer>
                                <span>Since</span>
                                {dateRef.current && dateRef.current.value !== "" &&
                                    <a href="#" style={{ width: 'fit-content', color: 'grey', padding: '0' }}
                                        onClick={() => {
                                            if (dateRef.current) {
                                                dateRef.current.value = "";
                                                setFilterDate("");
                                            }
                                        }}>Clean</a>}
                                <CustomInput ref={dateRef} type="text" placeholder='YYYY-MM-DD' style={{ maxHeight: '38px' }} defaultValue={filterDate}
                                    onChange={(e) => setFilterDate(e.target.value)}></CustomInput>
                            </CustomSelectContainer>

                            <Button primary onClick={() => { setShowFilters(false); applyFilters() }}>Apply</Button>
                        </SelectsContainer>
                    </ReactModal>
                    <ReactModal isOpen={showQR} style={modalStyle} ariaHideApp={false}>
                        <div style={{ display: 'flex', flexDirection: 'column' }}>
                            <ModalTitleContainer>
                                <ModalTitle>QR Code</ModalTitle>
                                <Button onClick={() => setShowQR(false)}>&#10005;</Button>
                            </ModalTitleContainer>
                            <div style={{ alignSelf: 'center', justifyContent: 'center', display: 'flex', height: 'fit-content', width: 'fit-content', margin: '15px 0 30px 0' }}>
                                <QRCodeCanvas size={324} value={clickedLink?.url ? clickedLink.url : ""} fgColor='#D67097' />
                            </div>
                            <Button primary onClick={() => setShowQR(false)} style={{ alignSelf: "center" }}>Done!</Button>
                        </div>
                    </ReactModal>
                    <ReactModal id={"right-modal"} isOpen={showEditLink} style={rightModalStyle} closeTimeoutMS={500} ariaHideApp={false}>
                        <ModalTitleContainer style={{ backgroundColor: "#D67097", margin: '0', padding: '7px 4px', height: '70px' }}>
                            <ModalTitle>Edit Link</ModalTitle>
                            <Button primary onClick={() => setShowEditLink(false)}>&#10005;</Button>
                        </ModalTitleContainer>
                        <form style={{ display: 'flex', flexDirection: 'column', margin: '15px' }} onSubmit={handleSubmit(editLink)}>
                            <EditLinkContainer>
                                <InputTitle>Edit Link Title</InputTitle>
                                <CustomInput {...register("name")} type={"text"} defaultValue={clickedLink?.name}></CustomInput>
                            </EditLinkContainer>
                            <EditLinkContainer>
                                <InputTitle>Edit Link</InputTitle>
                                <CustomInput {...register("shortUrl")} type={"text"} defaultValue={clickedLink?.shortUrl}></CustomInput>
                            </EditLinkContainer>
                            <EditLinkContainer>
                                <InputTitle>Tags</InputTitle>
                                <div style={{ display: 'flex', width: '100%' }}>
                                    <CustomInput ref={tagInputRef} style={{ borderRadius: '22px', marginRight: '10px', width: '75%' }} placeholder="Create new tags" type={"text"} />
                                    <Button type="button" onClick={() => tagInputRef.current?.value && addNewTag(tagInputRef.current?.value, false)}>&#43;</Button>
                                </div>
                                <TagsContainer>
                                    {tags.map((tag, idx) => {
                                        return (<Pill key={idx}>{tag}<PillButton type='button' onClick={() => removeTag(tag, false)}>&#10005;</PillButton></Pill>);
                                    })}
                                </TagsContainer>
                            </EditLinkContainer>
                            <hr style={{ margin: '3px 0 20px 0' }} />
                            <Button style={{ width: '100%', margin: '0' }} type="submit"> Save </Button>
                        </form>
                    </ReactModal>
                    <ReactModal isOpen={upgradePremium} style={modalStyle} ariaHideApp={false}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                <Button onClick={() => setUpgradePremium(false)}>&#10005;</Button>
                            </div>
                            <ModalTitleContainer>
                                <ModalTitle>Premium plan</ModalTitle>
                            </ModalTitleContainer>
                            <div style={{ alignItems: 'center', flexDirection: 'column', justifyContent: 'center', display: 'flex', height: 'fit-content', width: '80%', marginBottom: '20px' }}>
                                <h1 style={{ margin: '0 0 10px 0' }}>$24,99</h1>
                                <p>/month</p>
                                <PremiumOptions style={{ marginBottom: '0.5em' }}>Illimited URLs</PremiumOptions>
                                <PremiumOptions>No expiration time</PremiumOptions>
                            </div>
                            <Button primary onClick={handleUpgradePremium} style={{ alignSelf: "center" }}>Upgrade now</Button>
                            {updateError && <UpdateError>Unable to update plan, please try again</UpdateError>}
                        </div>
                    </ReactModal>
                    <DataContainer>
                        <MainLinksContainer>
                            <LinkListHeader>
                                <span>{links.length} results</span>
                                <span>Clicks</span>
                            </LinkListHeader>
                            {links.length !== 0 && links.map((item, index) => {
                                return (
                                    <Link key={index} onClick={expandLink} linkData={item} clicked={item.shortUrl === clickedLink?.shortUrl} />);
                            })}
                        </MainLinksContainer>
                        <ExpandedLink ref={chartDivRef}>
                            {links.length === 0 ?
                                <>
                                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', width: '100%' }}>
                                        <span style={{ alignSelf: 'center', margin: '20px', fontSize: '34px', fontWeight: '500' }}>
                                            {filters.length > 0 ? 'We couldn\'t find links matching' : 'You don\'t have any links yet!'}</span>
                                        <Button onClick={() => { filters.length > 0 ? setShowFilters(true) : setShowNewLink(true) }} style={{ marginTop: '20px' }}>
                                            {filters.length > 0 ? 'Filters' : 'New Link'}</Button>
                                    </div>
                                </> :
                                <>
                                    <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
                                        <span style={{ alignSelf: 'flex-start', margin: '10px', fontSize: '34px', fontWeight: '500' }}>{clickedLink?.name}</span>
                                        <Button onClick={() => setShowEditLink(true)}>Edit</Button>
                                    </div>
                                    <span style={{ alignSelf: 'flex-start', margin: '10px' }}>{
                                        clickedLink &&
                                        `${clickedLink.creationTime.split(',')[0]} at ${clickedLink.creationTime.split(',')[1]}`
                                    } by {JSON.parse(currUser ? currUser : "").username}</span>
                                    <LinkDiv>
                                        <LinkText>
                                            <img src={require('../../linkLogo.png')} width='25px' style={{ verticalAlign: 'middle', margin: '0 7px 4px 0' }} />
                                            byPs/{clickedLink?.shortUrl}
                                        </LinkText>
                                        <LinkButtons>
                                            <Button primary onClick={(e) => { navigator.clipboard.writeText(clickedLink?.shortUrl ? `https://byps-gbn.herokuapp.com/v1/urls/${clickedLink.shortUrl}` : ''); emitCopyToast() }}>Copy</Button>
                                            <Button onClick={() => setShowQR(true)}>QR Code</Button>
                                        </LinkButtons>
                                    </LinkDiv>
                                    <span style={{ alignSelf: 'flex-start', margin: '0 10px', padding: '22px 0', borderBottom: '1px solid pink', width: '95%' }}>
                                        <b>Destination: </b><CustomA href={clickedLink?.url} target='_blank'>{clickedLink?.url}</CustomA></span>
                                    <span style={{ alignSelf: 'flex-start', margin: '0 10px', padding: '22px 0', borderBottom: '1px solid pink', width: '95%' }}>
                                        Tags: {tags.map((elem, index) => {
                                            return (<Pill key={index} style={{ margin: '0 10px' }}>{elem}</Pill>);
                                        })}
                                        < Button onClick={() => setShowEditLink(true)}>&#43;</Button> </span>
                                    <div style={{ padding: '30px 0 10px 0' }}>
                                        <Button onClick={async () => {
                                            setShow(!show);
                                            await new Promise(r => setTimeout(r, 400));
                                            getChartData();
                                            if (chartDivRef.current) {
                                                chartDivRef.current.scroll({ top: chartDivRef.current.scrollHeight - 1, behavior: 'smooth' })
                                            }
                                        }}>
                                            {show ? "\u2191" : "\u2193"} {show ? 'Hide' : 'Show'} Stats {show ? '\u2191' : '\u2193'}
                                        </Button>
                                    </div>
                                    <CCollapse style={{ width: '55rem' }} visible={show} >
                                        <CCard style={{ background: 'transparent', margin: '10px' }}>
                                            <CCardBody>
                                                <div style={{ width: '200px' }}>
                                                    <Select options={[{ value: 'D', label: "Day" }, { value: 'M', label: "Month" }]} styles={DateSelectStyle}
                                                        onChange={(options) => setHistogramInterval(options?.value)} />
                                                </div>
                                                <Bar options={options} data={cdata} />
                                            </CCardBody>
                                        </CCard>
                                    </CCollapse>
                                </>}
                        </ExpandedLink>
                    </DataContainer>
                    <ToastContainer
                        autoClose={1000}
                        hideProgressBar={false}
                        newestOnTop={false}
                        closeOnClick
                        rtl={false}
                        pauseOnFocusLoss
                        draggable
                        pauseOnHover
                    />
                </MainContainer>
            </PageContainer>
        </Page >
    )
}

export default Main