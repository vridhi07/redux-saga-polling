import React from 'react';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";


const Header = (props) => {

    return (
        <div>
            <Navbar bg="light" variant="light">
                <Navbar.Brand href="#home">Poll Management System</Navbar.Brand>
                <Nav className="mr-auto">
                </Nav>
                <Link to={props.link}>
                    <Button className="float-right" variant="success" onClick={props.handleLogout}>
                        {props.buttonText}
                    </Button>
                </Link>
            </Navbar>
        </div>
    )
}

export default Header;
