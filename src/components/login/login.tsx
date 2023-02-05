import { Button } from "baseui/button";
import { Input } from "baseui/input";
import styled from "styled-components";
import {
  HeadingXXLarge,
  HeadingXLarge,
  HeadingLarge,
  HeadingMedium,
  HeadingSmall,
  HeadingXSmall,
} from "baseui/typography";
import {
  Container,
  ErrorText,
  InnerContainer,
  InputWrapper,
  StyledInput,
} from "../commons";
import { useSignIn } from "react-auth-kit";
import { useFormik } from "formik";
import axios, { AxiosError } from "axios";
import { useState, useEffect  } from "react";
import { useNavigate } from "react-router-dom";
import { useIsAuthenticated } from 'react-auth-kit';

function Login(props: any) {
  const [error, setError] = useState("");
  const signIn = useSignIn();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated()
  //check is user is authenticated
  useEffect(() => {
    if(isAuthenticated()){
      navigate("/dashboard");
    }
  });

  const onSubmit = async (values: any) => {
    // console.log("Values: ", values);
    setError("");

    try {
      const response = await axios.post(
        "http://simplelumenauthapi-env.eba-ax2ynbta.us-east-1.elasticbeanstalk.com/api/v1/login",
        values, {
            headers: {
              'Content-Type': 'application/json',
              'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
            }
          }
      );
      signIn({
        token: response.data.data.access_token,
        expiresIn: 3600,
        tokenType: "Bearer",
        authState: {
          first_name: response.data.data.first_name,
          last_name: response.data.data.last_name,
          email: response.data.data.email,
          country_prefix: response.data.data.country_prefix,
          phone_number: response.data.data.phone_number,
          active: response.data.data.active,
          gender: response.data.data.gender,
          access_token: response.data.data.access_token,
        },
      });
      navigate("/dashboard");
    } catch (err) {
      if (err && err instanceof AxiosError)
        setError(err.response?.data.message);
      else if (err && err instanceof Error) setError(err.message);
      // console.log("Error: ", err);
    }
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit,
  });

  return (
    <Container>
      <InnerContainer>
        <form onSubmit={formik.handleSubmit}>
          <HeadingXXLarge>Welcome! Please Login</HeadingXXLarge>
          <ErrorText>{error}</ErrorText>
          <InputWrapper>
            <StyledInput
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              placeholder="Email"
              clearOnEscape
              size="large"
              type="email"
            />
          </InputWrapper>
          <InputWrapper>
            <StyledInput
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              placeholder="Password"
              clearOnEscape
              size="large"
              type="password"
            />
          </InputWrapper>
          <InputWrapper>
            <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
              Login
            </Button>
            <a href="register" style={{marginLeft:'20px'}}>
              Or Register
            </a>
          </InputWrapper>
          <InputWrapper>
            <a href="forgot-password" style={{marginLeft:'20px'}}>
             Forgot Password?
            </a>
          </InputWrapper>
          <InputWrapper>
            <a href="onetime-login" style={{marginLeft:'20px'}}>
             One Time Login
            </a>
          </InputWrapper>
        </form>
      </InnerContainer>
    </Container>
  );
}

export { Login };
