import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import { Input, Label, Wrapper } from "./styles";
import { Page, PageContainer, Request, Title } from "../../GlobalStyles"

function Login() {
  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Wrapper>
          <Title>Login</Title>
          <Label>Email</Label>
          <Input/>
          <Label>Password</Label>
          <Input/>
          <Request>
            <p>Don't have an account? </p>
            <button>Sign Up</button>
          </Request>
        </Wrapper>
      </PageContainer>
    </Page>
  );
}

export default Login;