import {useEffect, useState} from "react";
import {useParams, useNavigate} from "react-router-dom";
import {useIsAuthenticated, useSignIn} from "react-auth-kit";
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

function VerifyOTP(props: any) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated();
    const signIn = useSignIn();
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
                "http://simplelumenauthapi-env.eba-ax2ynbta.us-east-1.elasticbeanstalk.com/api/v1/verify-onetime-login",
                values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
                    }
                }
            );
            if (response.data.status === 200){
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
            }
        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            email: sessionStorage.getItem('emailResetPassword'),
            code: "",
        },
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <HeadingXXLarge>Verify OTP</HeadingXXLarge>
            <ErrorText>{error}</ErrorText>
            <InputWrapper>
                <StyledInput
                    name="code"
                    value={formik.values.code}
                    onChange={formik.handleChange}
                    placeholder="code"
                    clearOnEscape
                    size="large"
                    type="text"
                />
            </InputWrapper>
            <InputWrapper>
                <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
                    Login
                </Button>
            </InputWrapper>
            <InputWrapper>
                <a href="login" style={{marginLeft:'20px'}}>
                    Or Login
                </a>
            </InputWrapper>
        </form>
    );
}

export { VerifyOTP };
