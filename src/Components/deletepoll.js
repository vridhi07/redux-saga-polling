import React from "react";
import { Modal, Button, Jumbotron, Container } from "react-bootstrap";

const DeletePoll = (props) => {
  return (
    <Jumbotron>
      <Container>
        <Modal show={props.show} onHide={props.onCloseOption}>
          <Modal.Header closeButton>
            <Modal.Title>Are you sure you want to delete?</Modal.Title>
          </Modal.Header>
          <Modal.Body>{props.pollTitle} </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={props.onCloseOption}
            >
              No
            </Button>
            <Button variant="primary" onClick={props.onDeletePoll}// 
            >
              Yes
            </Button>
          </Modal.Footer>
        </Modal>
      </Container>
    </Jumbotron>

  );
};

export default DeletePoll;