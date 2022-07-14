import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import { Input, Label, Wrapper } from "./styles";
import { Page, PageContainer, Request, Title } from "../../GlobalStyles";
import { useNavigate } from "react-router-dom";

function Register() {
  let navigate = useNavigate()

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Wrapper>
          <Title>Register</Title>
          <Label>Name</Label>
          <Input/>
          <Label>Email</Label>
          <Input/>
          <Label>Password</Label>
          <Input type="password"/>
          <Label>Confirm Password</Label>
          <Input type="password"/>
          <Request>
            <p>Already have an account? </p>
            <button onClick={() => navigate('/')}>Log In</button>
          </Request>
        </Wrapper>
      </PageContainer>
    </Page>
  );
}

export default Register;