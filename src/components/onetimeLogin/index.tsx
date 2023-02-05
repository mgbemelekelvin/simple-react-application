import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
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
    StyledInput, StyledSelect,
} from "../commons";
import {Button} from "baseui/button";
import axios, {AxiosError} from "axios";
import {useFormik} from "formik";
import { VerifyOTP } from "../verifyOTP";

function OnetimeLogin(props: any) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()
    const [isLoading, setIsLoading] = useState(false);

    //check is user is authenticated
    useEffect(() => {
        if(isAuthenticated()){
            navigate("/dashboard");
        }
    });

    const onSubmit = async (values: any) => {
        setError("");
        try {
            const response = await axios.post(
                "http://localhost:8000/api/v1/forgot-password-onetime-login",
                values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
                    }
                }
            );
            sessionStorage.setItem('emailOTP', response.data.data.email)
            setIsLoading(true);
        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);
            // console.log("Error: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            verificationType: "One Time Login",
            email: "",
        },
        onSubmit,
    });

    if (isLoading){
        return (
            <Container>
                <InnerContainer>
                    <VerifyOTP/>
                </InnerContainer>
            </Container>
        );
    }

    return (
        <Container>
            <InnerContainer id={"send"} style={{display:"block"}}>
                <form onSubmit={formik.handleSubmit}>
                    <HeadingXXLarge>Onetime Login</HeadingXXLarge>
                    <HeadingSmall>Enter your email to get an OTP</HeadingSmall>
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
                        <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
                            Send OTP
                        </Button>
                    </InputWrapper>
                    <InputWrapper>
                        <a href="login" style={{marginLeft:'20px'}}>
                            Or Login
                        </a>
                    </InputWrapper>
                </form>
            </InnerContainer>
        </Container>
    );
}

export { OnetimeLogin };