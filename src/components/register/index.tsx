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

function Register(props: any) {
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
        console.log("Values: ", values);
        setError("");

        try {
            const response = await axios.post(
                "https://test.laslas.org/api/v1/users",
                values, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
                    }
                }
            );
            navigate("/login");
        } catch (err) {
            if (err && err instanceof AxiosError)
                setError(err.response?.data.message);
            else if (err && err instanceof Error) setError(err.message);
            // console.log("Error: ", err);
        }
    };

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            gender: "",
            country_prefix: "",
            phone_number: "",
            email: "",
            user_agent: "app",
            password: "",
            password_confirmation: "",
        },
        onSubmit,
    });

    return (
        <Container>
            <InnerContainer>
                <form onSubmit={formik.handleSubmit}>
                    <HeadingXXLarge>Register!</HeadingXXLarge>
                    <ErrorText>{error}</ErrorText>
                    <InputWrapper>
                        <StyledInput
                            name="first_name"
                            value={formik.values.first_name}
                            onChange={formik.handleChange}
                            placeholder="First Name"
                            clearOnEscape
                            size="large"
                            type="text"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <StyledInput
                            name="last_name"
                            value={formik.values.last_name}
                            onChange={formik.handleChange}
                            placeholder="Last Name"
                            clearOnEscape
                            size="large"
                            type="text"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <select style={{width: '100%', background:'rgb(41, 41, 41)', color:'rgb(82 82 82)', padding:'15px', borderRadius:'5px', border:'none'}}
                                name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                        >
                            <option value="">Select Gender</option>
                            <option>Female</option>
                            <option>Male</option>
                        </select>
                    </InputWrapper>
                    <InputWrapper>
                        <select style={{width: '100%', background:'rgb(41, 41, 41)', color:'rgb(82 82 82)', padding:'15px', borderRadius:'5px', border:'none'}}
                                name="country_prefix"
                            value={formik.values.country_prefix}
                            onChange={formik.handleChange}
                        >
                            <option value="">Select Prefix</option>
                            <option>+234</option>
                            <option>+144</option>
                        </select>
                    </InputWrapper>
                    <InputWrapper>
                        <StyledInput
                            name="phone_number"
                            value={formik.values.phone_number}
                            onChange={formik.handleChange}
                            placeholder="Phone Number"
                            clearOnEscape
                            size="large"
                            type="number"
                        />
                    </InputWrapper>
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
                        <StyledInput
                            name="password_confirmation"
                            value={formik.values.password_confirmation}
                            onChange={formik.handleChange}
                            placeholder="Confirm Password"
                            clearOnEscape
                            size="large"
                            type="password"
                        />
                    </InputWrapper>
                    <InputWrapper>
                        <Button size="large" kind="primary" isLoading={formik.isSubmitting}>
                            Register
                        </Button>
                        <a href="login" style={{marginLeft:'20px'}}>
                            Or Login
                        </a>
                    </InputWrapper>
                </form>
            </InnerContainer>
        </Container>
    );
}

export { Register };
