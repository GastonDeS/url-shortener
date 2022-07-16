import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import { Input, Label, Wrapper, Button, Error } from "./styles";
import { Page, PageContainer, Request, Title } from "../../GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../UserContext";
import { useForm } from "react-hook-form";
import { authService } from "../../services";

type FormData = {
  email: string;
  password: string;
};

const EMAIL_PATTERN = /^$|^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;

function Login() {
  const [error, setError] = useState(false);
  let navigate = useNavigate();
  let auth = useAuth();
  const { register, formState: {errors}, handleSubmit} = useForm<FormData>();

  const onSubmit = handleSubmit(({email, password}: FormData) => {
    setError(false);
    authService
      .login(email, password)
      .then((result) => {
        if (result.hasFailed()) {
          setError(true)
        } else {
          auth.login(result.getData())
          navigate('/')
        }
      })
  })

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Wrapper onSubmit={onSubmit}>
          <Title>Login</Title>
          {error && <Error>Please enter valid credentials</Error>}
          <Label>Email</Label>
          <Input type="text" {...register(
                          "email",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            },
                            pattern: {
                              value: EMAIL_PATTERN,
                              message: "Please enter a valid email address"
                            }
                          })
                      }/>
          {errors.email && <Error>{errors.email.message}</Error>}
          <Label>Password</Label>
          <Input type="password" {...register(
                          "password",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            }
                          })
                      }/>
          {errors.password && <Error>{errors.password.message}</Error>}
          <Button>Login</Button>
          <Request>
            <p>Don't have an account? </p>
            <button onClick={() => navigate('/register')}>Sign Up</button>
          </Request>
        </Wrapper>
      </PageContainer>
    </Page>
  );
}

export default Login;