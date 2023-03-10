import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import {useIsAuthenticated} from "react-auth-kit";
import {
    HeadingXXLarge,
} from "baseui/typography";
import {
    ErrorText,
    InputWrapper,
    StyledInput,
} from "../commons";
import {Button} from "baseui/button";
import axios, {AxiosError} from "axios";
import {useFormik} from "formik";

function ResetPassword() {
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
                "https://test.laslas.org/api/v1/reset-password",
                values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
                    }
                }
            );
            if (response.data.status === 200){
                alert(response.data.message)
                navigate("/login");
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
            new_password: "",
            new_password_confirmation: "",
        },
        onSubmit,
    });

    return (
        <form onSubmit={formik.handleSubmit}>
            <HeadingXXLarge>Reset Password</HeadingXXLarge>
            <ErrorText>{error}</ErrorText>
            <InputWrapper>
                <StyledInput
                    name="new_password"
                    value={formik.values.new_password}
                    onChange={formik.handleChange}
                    placeholder="Password"
                    clearOnEscape
                    size="large"
                    type="password"
                />
            </InputWrapper>
            <InputWrapper>
                <StyledInput
                    name="new_password_confirmation"
                    value={formik.values.new_password_confirmation}
                    onChange={formik.handleChange}
                    placeholder="Confirm Password"
                    clearOnEscape
                    size="large"
                    type="password"
                />
            </InputWrapper>
            <InputWrapper>
                <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
                    Reset Password
                </Button>
            </InputWrapper>
        </form>
    );
}

export { ResetPassword };
