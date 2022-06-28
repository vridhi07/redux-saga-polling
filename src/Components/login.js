import React from 'react';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Navbar, Nav, Spinner } from 'react-bootstrap';
import { Link, useHistory } from "react-router-dom";
import { LoginRequest } from "../Redux/action/actions";
import Header from "./header";

function Login() {

    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");

    console.log(userName);
    console.log(password)
    const dispatch = useDispatch();
    const history = useHistory();

    const loginState = useSelector((state) => state.LoginStatus)
    // console.log(loginState, "GGGGGGGGG");

    const handleSubmit = () => {
        let userCredentials = {
            username: userName.trim(),
            password: password.trim(),
        };
        dispatch(LoginRequest(userCredentials));
        setuserName("");
        setpassword("");
    }

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if (loginState?.response?.toLowerCase() === "admin") {
                history.push('/admindashboard');
                localStorage.setItem("userType", loginState.response);
            } else if (loginState?.response?.toLowerCase() === "guest") {
                history.push('/guestdashboard');
                localStorage.setItem("userType", loginState.response);
            } else {
                localStorage.clear();
                history.push('/');
            }
        }
    })

    return (
        <>
            <div>
                <Header
                    buttonText= {"Sign Up"}
                    link={"/signup"}
                />
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                value={userName}
                                onChange={event => setuserName(event.target.value)}
                                placeholder="Enter Username" />
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                        </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={event => setpassword(event.target.value)}
                            />
                        </Form.Group>

                        {/* <Link to="/admindashboard"> */}
                        <Button variant="primary" type="submit"
                            disabled={userName && password ? false : true}
                            onClick={() => handleSubmit()}>
                            {loginState.isLoading === true ?
                                (<Spinner
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />) : (<span>Login</span>)}
                        </Button>
                        {/* </Link> */}
                        <Container>
                            {loginState.isLoggedIn ? (
                                null
                            ) : (<h6 style={{ color: "Red" }}>{loginState.error}</h6>)
                            }
                        </Container>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default Login;
