import axios, {AxiosError} from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import {useAuthUser, useSignOut} from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";

function Home() {
    const singOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    let access_token: string = '';
    let userName: string = '';
    if (auth()){
        // @ts-ignore
        access_token = auth().access_token;
        // @ts-ignore
        userName = auth().first_name+' '+auth().last_name;
    }
    const logout = async() => {
        try {
            const response = await axios.post(
                "http://simplelumenauthapi-env.eba-ax2ynbta.us-east-1.elasticbeanstalk.com/api/v1/logout",
                {},
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
                        'Authorization':'Bearer '+access_token
                    }
                }
            );
            singOut();
            navigate("/login");
        } catch (err) {
            if (err && err instanceof AxiosError)
                if (err.response?.data.message === undefined){
                    alert('Something went wrong. Try again');
                } else {
                    alert(err.response?.data.message);
                }
            else if (err && err instanceof Error) alert(err.message);
        }
    };

    const goToDashboard = async () => {
        navigate("/dashboard");
    };

    return (
        <Container>
            <HeadingXXLarge color="secondary500">Welcome Home {userName}!</HeadingXXLarge>
            <Button kind="secondary" onClick={goToDashboard}>
                Go to Dashboard
            </Button>
            <Button kind="secondary" onClick={logout}>
                Logout
            </Button>
        </Container>
    );
}

export { Home };
