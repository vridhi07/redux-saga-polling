import React, { useEffect, useState } from 'react';
import Header from './header';
import {
    Card,
    Spinner,
    Button,
    Jumbotron,
    Container
} from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PollListRequest } from "../Redux/action/actions";
import { DeletePollRequest } from "../Redux/action/actions"
import DeletePoll from "./deletepoll";


const AdminDashboard = () => {

    const dispatch = useDispatch();
    const history = useHistory();

    const [showDeletePoll, setshowDeletePoll] = useState(false);
    const [deletePollid, setdeletePollid] = useState();
    const [deletePolltitle, setdeletePolltitle] = useState();

    useEffect(() => {
        dispatch(PollListRequest());
    }, [])

    useEffect(() => {
        if (localStorage.getItem("token")) {
            if(localStorage.getItem("userType")==="Guest")
                history.push('/guestdashboard');
         } else {
                localStorage.clear();
                history.push('/');
            }
        
    },[(localStorage.getItem("userType"))])

    const pollList = useSelector((state) =>
        state.PollListStatus.poll
    )

    console.log(pollList)
    const pollStatus = useSelector((state) =>
        state.PollListStatus.isPollfetched
    )
    console.log(pollStatus)
    const deletePollhandler = (title, id) =>{
        console.log('deletepollhandler');
        setdeletePolltitle(title);
        setdeletePollid(id);
        setshowDeletePoll(true);
    };

    const deletePoll = () => {
        let poll_ID = {
            id: deletePollid
        }
        dispatch(DeletePollRequest(poll_ID))
    }

    const editPoll=(id)=>{
        history.push(`/editpoll/${id}`);
    }

    const handleLogout = () => {
        localStorage.clear();
        history.push("/login");
    };


    return (
        <div>
            <Header
                buttonText={"Logout"}
                // link={"/admindashboard"}
                handleLogout={handleLogout}
            />
            <Jumbotron>
                <Container>
                    <Link to="/addpoll">
                        <Button className="add_poll" variant="success" style={{ marginBottom: "10px" }} >
                            Add Poll
                    </Button>
                    </Link>
                    {pollStatus === false ? (
                        <center>
                            <Spinner className="spinner" animation="border" variant="dark" />
                        </center>
                    ) : null}
                    {pollList.map((item) => (
                        <Card key={item._id}>
                            <Card.Body>
                                <div>
                                    <Card.Title>Title : {item.title}</Card.Title>
                                    {item.options.map((option, index) => (
                                        <div key={index}>
                                            <input type="radio" name={item._id} />
                                            <label> {option.option}</label>
                                            <label className="float-right">Votes: {option.vote}</label>
                                        </div>
                                    ))}
                                </div>
                                <hr />
                                <Button variant="warning"
                                    onClick={() => editPoll(item._id)}>
                                    Edit Poll</Button>{' '}
                                <Button variant="danger"
                                    onClick={() => deletePollhandler(item.title,item._id)}>
                                    Delete Poll</Button>
                            </Card.Body>
                        </Card>
                    ))}
                    <DeletePoll
                        show={showDeletePoll}
                        pollTitle={deletePolltitle}
                        onCloseOption={() => setshowDeletePoll(false)}
                        onDeletePoll={() => {
                            deletePoll();
                            setshowDeletePoll(false);
                        }}
                    />
                </Container>
            </Jumbotron>
        </div>
    )
}

export default AdminDashboard;
