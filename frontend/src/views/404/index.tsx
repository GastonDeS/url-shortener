import Navbar from "../../components/Navbar";
import { Button, Page, PageContainer } from "../../GlobalStyles";
import logo404 from "../../assets/images/404.png"
import { Image, Text, Title } from "./styles";
import { useNavigate } from "react-router-dom";

function Error404() {
  let navigate = useNavigate();

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Image src={logo404} alt="404 logo"/>
        <Title>Oops!</Title>
        <Text>We're sorry</Text>
        <Text style={{ marginBottom: '15px' }}>The page you are looking for does not exist.</Text>
        <Button onClick={() => navigate('/')}>Back to home</Button>
      </PageContainer>
    </Page>
  )
}

export default Error404;