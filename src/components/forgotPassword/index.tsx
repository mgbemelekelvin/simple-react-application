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

function ForgotPassword(props: any) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()

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
            let div1 = document.getElementById("sent");
            let div2 = document.getElementById("send");
            if (div2) div2.style.display = 'none';
            if (div1) div1.style.display = 'block';
        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);
            // console.log("Error: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            verificationType: "Password Reset",
            email: "",
        },
        onSubmit,
    });

    return (
        <Container>
            <InnerContainer id={"send"} style={{display:"block"}}>
                <form onSubmit={formik.handleSubmit}>
                    <HeadingXXLarge>Forgot Password</HeadingXXLarge>
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
                            Send Email
                        </Button>
                    </InputWrapper>
                    <InputWrapper>
                        <a href="login" style={{marginLeft:'20px'}}>
                            Or Login
                        </a>
                    </InputWrapper>
                </form>
            </InnerContainer>
            <InnerContainer id={"sent"} style={{display:"none"}}>
                <HeadingXXLarge>Forgot Password Email verification Sent!!!</HeadingXXLarge>
                <HeadingLarge>Check Your Email for instructions on how to reset your password.</HeadingLarge>
                <InputWrapper>
                    <a href="login" style={{marginLeft:'20px'}}>
                        Return to Login
                    </a>
                </InputWrapper>
            </InnerContainer>
        </Container>
    );
}

export { ForgotPassword };
