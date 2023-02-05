import {useEffect, useState} from "react";
import {useParams, useNavigate } from "react-router-dom";
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
import { ResetPassword } from "../resetPassword";

function ConfirmResetPassword(props: any) {
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const isAuthenticated = useIsAuthenticated()
    const { code } = useParams();
    const [isLoading, setIsLoading] = useState(false);

    //check is user is authenticated
    useEffect(() => {
        if(isAuthenticated()){
            navigate("/dashboard");
        }
    });

    //verifying code
    useEffect(() => {
        axios
            .post("http://localhost:8000/api/v1/verify-forgot-password",{
                'code':code,
            },{
                headers: {
                    'Content-Type': 'application/json',
                    'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
                }
            })
            .then(response => {
                sessionStorage.setItem('emailResetPassword', response.data.data.email)
                setIsLoading(true);
            })
            .catch(err => {
                if (err && err instanceof AxiosError)
                    alert(err.response?.data.message);
                else if (err && err instanceof Error) alert(err.message);
                navigate("/login");
            });
    }, []);

    if (isLoading){
        return (
            <Container>
                <InnerContainer>
                    <ResetPassword/>
                </InnerContainer>
            </Container>
        );
    }

    return  (
        <Container>
            <InnerContainer>
                <HeadingLarge>Please Wait...</HeadingLarge>
            </InnerContainer>
        </Container>
    );
}

export { ConfirmResetPassword };
