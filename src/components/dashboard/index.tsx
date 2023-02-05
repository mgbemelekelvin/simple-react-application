import axios, {AxiosError} from "axios";
import { Button } from "baseui/button";
import { HeadingXXLarge } from "baseui/typography";
import { useSignOut, useAuthUser } from "react-auth-kit";
import { useNavigate } from "react-router-dom";
import { Container } from "../commons";
import {useState, useEffect} from "react";

interface User {
    id: number;
    first_name: string;
    last_name: string;
    gender: string;
    email: string;
}

function Dashboard() {
    const singOut = useSignOut();
    const navigate = useNavigate();
    const auth = useAuthUser();
    const [users, setUsers] = useState<User[]>([]);

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
                "https://test.laslas.org/api/v1/logout",
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

    //fetching users
    useEffect(() => {
        async function fetchData() {
            const result = await axios.get('https://test.laslas.org/api/v1/users',
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Client-id':'eRvMzEIMiFof5LlenTGIA9MrVj12Sf4h6A7QzhpEmP7KoQJ8thZLls55Jjb0WVmxa',
                        'Authorization':'Bearer '+access_token
                    }
                });
            setUsers(result.data.data);
        }
        fetchData();
    }, []);

    return (
        <Container>
            <HeadingXXLarge color="secondary500">Welcome Home {userName}!</HeadingXXLarge>
            <Button kind="secondary" onClick={logout}>
                Logout
            </Button>
            <HeadingXXLarge color="secondary500">List of Users</HeadingXXLarge>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#ddd" }}>ID</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#ddd" }}>First Name</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#ddd" }}>Last Name</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#ddd" }}>Gender</th>
                    <th style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left", backgroundColor: "#ddd" }}>Email</th>
                </tr>
                </thead>
                <tbody>
                {users.map(user => {
                    return user ? (
                        <tr key={user.id}>
                            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{user.id}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{user.first_name}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{user.last_name}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{user.gender}</td>
                            <td style={{ border: "1px solid #ddd", padding: "8px", textAlign: "left" }}>{user.email}</td>
                        </tr>
                    ) : null;
                })}
                </tbody>
            </table>
        </Container>
    );
}

export { Dashboard };
