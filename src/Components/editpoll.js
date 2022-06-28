import React, { useEffect, useState } from "react";
import { Button, Card, Badge, Navbar, Nav, Container, Jumbotron, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Header from "./header";
import { PollListRequest } from "../Redux/action/actions";
import UpdateTitle from "./updatepolltitle";
import { UpdatePollTitleRequest } from "../Redux/action/actions";
import AddNewOption from "../Components/addnewoption";
import { AddNewOptionRequest } from "../Redux/action/actions";
import DeleteOption from "./deleteoption";
import { DeleteOptionRequest } from "../Redux/action/actions";

function EditPoll(props) {

    const [poll, setpoll] = useState([]);
    const [Title, setTitle] = useState("");
    const [id, setid] = useState("");
    const [showTitleUpdate, setshowTitleUpdate] = useState(false);
    const [showAddNewOption, setshowAddNewOption] = useState(false);
    const [showDeleteOption, setshowDeleteOption] = useState(false);


    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogout = () => {
        localStorage.clear();
        history.push("/");
    };

    useEffect(() => {
        dispatch(PollListRequest());
    }, []);

    const pollList = useSelector((state) => state.PollListStatus.poll);

console.log(pollList);

    useEffect(() => {
        setpoll(pollList)
    }, [pollList])

    const pollid = props.match.params.id;
    console.log(props)

    const polltoedit = pollList.filter(item => item._id == pollid)
    console.log(polltoedit);
    useEffect(() => {
        setpoll(polltoedit)
    }, [pollList])

    const _handleUpdateTitle = () => {
        let titleUpdate = {
            id: id,
            Title: Title,
        };
        if (titleUpdate.Title !== "") {
            dispatch(UpdatePollTitleRequest(titleUpdate));
            setshowTitleUpdate(false);
            setTitle("");
            setid("");
        }
        else {
            setshowTitleUpdate(false);
            setTitle("");
            setid("");
        }
    };

    const state_updateTitle = useSelector((state) => state.UpdateTitlestatus)

    const _handleshowTitle = (title, id) => {
        setshowTitleUpdate(true);
        setTitle(title);
        setid(id);
    };


    const _handleAddNewOption = (id) => {
        setTitle("");
        setid(id);
        setshowAddNewOption(true);
    }

    const _handleUpdateOption = () => {
        let Optiondata = {
            id: id,
            option: Title,
        };
        if (Optiondata.option !== "") {
            dispatch(AddNewOptionRequest(Optiondata));
            setid("");
            setTitle("");
            setshowAddNewOption(false);
        }
        else {
            setid("");
            setTitle("");
            setshowAddNewOption(false);
        }
    }

    const _handleOptionDelete = (option, id) => {
        setTitle(option.trim());
        setid(id);
        setshowDeleteOption(true);
    };

    const _handleDeletePollOption = () => {
        let optionid = {
            id: id,
            text: Title,
        };
        dispatch(DeleteOptionRequest(optionid));
        setshowDeleteOption(false);
        setid("");
        setTitle("");
    };


    return (
        <div>
            <Header
                buttonText={"Logout"}
                handleLogout={handleLogout}
            />
            <Jumbotron>
                <Container>
                    <Link to="/admindashboard">
                        <Button variant="success" style={{ marginBottom: "10px" }} >
                            Dashboard
                    </Button>
                    </Link>
                    {
                        poll.map((item) =>
                            <Card key={item._id} className="Card">
                                <Card.Body>
                                    <Card.Title>
                                        Title :{item.title}
                                    </Card.Title>
                                    {item.options.map((option, i) => (
                                        <div key={i}>
                                            <input type="radio" name={item._id} />
                                            <label>{option.option}</label>
                                            <div className="d-flex justify-content-end">
                                                <label>
                                                    <Badge variant="light">{item.__v}</Badge>
                                                </label>
                                                <Button
                                                    size={"sm"}
                                                    onClick={() =>
                                                        _handleOptionDelete(option.option, item._id)
                                                    }
                                                    className="ml-5"
                                                    variant="danger"
                                                >
                                                    Delete
                                            </Button>
                                            </div>

                                        </div>
                                    ))}
                                    <div>

                                        <Button
                                            variant="warning"
                                            onClick={() => {
                                                _handleshowTitle(item.title, item._id);
                                            }}
                                        >
                                            Update Title
                                        </Button>

                                        <Button
                                            onClick={() => {
                                                _handleAddNewOption(item._id);
                                            }}
                                            className="ml-2"
                                            variant="primary"
                                        >
                                            Add Option
                                        </Button>

                                    </div>
                                </Card.Body>
                            </Card>
                        )
                    }
                    <UpdateTitle
                        show={showTitleUpdate}
                        onCloseModel={() => setshowTitleUpdate(false)}
                        title={Title}
                        onTitleChange={(e) => setTitle(e.target.value)}
                        onUpdateTitle={() => {
                            _handleUpdateTitle();
                        }}
                    />
                    <AddNewOption
                        show={showAddNewOption}
                        onCloseNewOption={() => setshowAddNewOption(false)}
                        onOptionChange={(e) => setTitle(e.target.value)}
                        onUpdateOption={() => {
                            _handleUpdateOption();
                        }}
                    />
                    <DeleteOption
                        show={showDeleteOption}
                        option={Title}
                        onCloseOption={() => setshowDeleteOption(false)}
                        onDeletePollOption={() => {
                            _handleDeletePollOption();
                        }}
                    />
                </Container>
            </Jumbotron>
        </div>
    )
}

export default EditPoll;
