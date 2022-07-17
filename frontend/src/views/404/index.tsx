import Navbar from "../../components/Navbar";
import { Button, Page, PageContainer } from "../../GlobalStyles";
import logo404 from "../../assets/images/404.png";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Image = styled.img`
  width: 25%;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.colors.first};
  font-weight: bolder;
  margin-top: 30px;
`;

const Text = styled.p`
  color: ${(props) => props.theme.colors.first};
  margin: 0;
`;

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