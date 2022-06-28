import React from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Container, Navbar, Nav, Spinner } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { SignUpRequest } from "../Redux/action/actions";
import Header from "./header";

function Signup() {

    const [userName, setuserName] = useState("");
    const [password, setpassword] = useState("");
    const [option, setoption] = useState("Admin");

    const dispatch = useDispatch();

    const signupState = useSelector((state) => state.SignUpStatus)
    // console.log(signupState, "GGGGGGGGG");

    const handleSubmit = () => {
        let userSignUpData = {
            username: userName.trim(),
            password: password.trim(),
            option: option,
        };
        dispatch(SignUpRequest(userSignUpData));
        setuserName("");
        setpassword("");
    };

    return (
        <>
            <div>
                <Header
                    buttonText={"Login"}
                    link={"/"}
                />
                <Container>
                    <Form>
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Username</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Username"
                                value={userName}
                                onChange={event => setuserName(event.target.value)} />
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
                                onChange={event => setpassword(event.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGridState">
                            <Form.Label >User type</Form.Label>
                            <Form.Control
                                as="select"
                                name={option}
                                onChange={event => setoption(event.target.value)}>
                                <option>--Select--</option>
                                <option value="Guest">Guest</option>
                                <option value="Admin">Admin</option>
                            </Form.Control>
                        </Form.Group>

                        <Button variant="primary" type="submit"
                            disabled={userName && password ? false : true}
                            onClick={() => handleSubmit()}>
                            {signupState.isLoading === true ?
                                (<Spinner
                                    animation="border"
                                    size="sm"
                                    role="status"
                                    aria-hidden="true"
                                />) : null}
                            {signupState.isLoading === true ? null : <span>Sign Up</span>}
                        </Button>
                        <Container>
                            {signupState.isSignedUp ? (
                                <h6 style={{ color: "black" }}>
                                    Registration Successful. Please login to continue...
                                </h6>
                            ) : (
                                    <h6 style={{ color: "Red" }}>{signupState.error}</h6>
                                )}
                        </Container>
                    </Form>
                </Container>
            </div>
        </>
    )
}

export default Signup;
