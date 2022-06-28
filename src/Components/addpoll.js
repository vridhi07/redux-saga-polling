import React, { useState, useEffect } from 'react';
import {
    Form,
    Button,
    Container,
    Jumbotron
} from "react-bootstrap";
import { Create_NewPollRequest } from "../Redux/action/actions"
import { useDispatch, useSelector } from "react-redux";
import { Link, Redirect, useHistory } from "react-router-dom";
import Header from "./header";

const AddPoll = () => {

    const [title, settitle] = useState("");
    const [options, setoptions] = useState([]);

    const dispatch = useDispatch();
    const history = useHistory();

    console.log(options);
    const removeOption = (i) => {
        const data = [...options];
        data.splice(i, 1);
        setoptions(data);
    }

    const handleOption = (event, i) => {
        event.preventDefault();
        const data = [...options];
        data[i] = event.target.value;
        setoptions(data);
    }

    const addOption = () => {
        setoptions((prevState) => [...prevState, ""]);
    }

    const submitPoll = () => {
        let poll = {
            title: title,
            options: options,
        }
        dispatch(Create_NewPollRequest(poll));
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
    };

    const state = useSelector((state) => state.CreateNewPollstatus)
    console.log(state,  "abcd")

    if (state.isLoading === true) {
        return <Redirect to="/admindashboard" />;
      }


    return (
        <div>
            <Header
                buttonText={"Logout"}
                handleLogout={handleLogout}
            />
            <Jumbotron>
                <Container>
                    <div>
                        <Form.Label>
                            <h2>
                                Add Poll
                            </h2>
                        </Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your question here"
                            value={title}
                            onChange={(event) => settitle(event.target.value)}
                        />
                        <br />
                    </div>
                    
                    {options.map((option, i) => (
                        <div key={i}>
                            <Form.Label>Option :{i + 1}</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your option here"
                                value={options[i]}                                
                                onChange={(event) => handleOption(event, i)}
                            />
                            <Button
                                onClick={() => {
                                    removeOption(i);
                                }}
                                variant="danger"
                            >
                                Delete
                            </Button>
                        </div>
                    ))}

                    {title ? (
                        options[options.length-1]===""?null:
                        <Button onClick={addOption} variant="primary">
                            Add Options
                        </Button>
                    ) : null}

                    {options.length ? (
                        <Button onClick={submitPoll} variant="success">
                            Submit Poll
                        </Button>
                    ) : null}
                </Container>
            </Jumbotron>
        </div>
    )
}

export default AddPoll;
