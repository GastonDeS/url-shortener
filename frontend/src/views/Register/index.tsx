import React, { useState } from "react";
import Navbar from "../../components/Navbar/index";
import { Input, Label, Wrapper, Button, Error } from "./styles";
import { Page, PageContainer, Request, Title } from "../../GlobalStyles";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../UserContext";
import { useForm } from "react-hook-form";
import { userService, authService } from "../../services";

type FormData = {
  username: string;
  email: string;
  password: string;
  confirmPass: string;
};

const EMAIL_PATTERN = /^$|^[a-zA-Z0-9_!#$%&’*+/=?`{|}~^.-]+@[a-zA-Z0-9.-]+$/;

function Register() {
  let navigate = useNavigate();
  const [error, setError] = useState(false);
  let auth = useAuth();
  const { register, formState: {errors}, handleSubmit, reset, getValues} = useForm<FormData>();

  const onSubmit = handleSubmit(({username, email, password}: FormData) => {
    setError(false);
    userService
      .register({
        username: username,
        email: email,
        password: password
      })
      .then((result) => {
        if (result.hasFailed()) {
          setError(true)
        } else {
          authService
            .login(email, password)
            .then((result) => {
              if (result.hasFailed()) {
                navigate('/')
              } else {
                auth.login(result.getData())
                navigate('/main')
              }
            })
        }
      })
  })

  return (
    <Page>
      <Navbar/>
      <PageContainer>
        <Wrapper onSubmit={onSubmit}>
          <Title>Register</Title>
          {error && <Error>This email has already been registered</Error>}
          <Label>Name</Label>
          <Input type="text" {...register(
                          "username",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            }
                          })
                      }/>
          {errors.username && <Error>{errors.username.message}</Error>}
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
                            },
                            minLength: {
                              value: 8,
                              message: "Password must be at least 8 characters"
                            }
                          })
                      }/>
          {errors.password && <Error>{errors.password.message}</Error>}
          <Label>Confirm Password</Label>
          <Input type="password" {...register(
                          "confirmPass",
                          {
                            required: {
                              value: true,
                              message: "This field is required"
                            },
                            validate: value => value === getValues("password") || "Passwords do not match"
                          })
                      }/>
          {errors.confirmPass && <Error>{errors.confirmPass.message}</Error>}
          <Button>Register</Button>
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