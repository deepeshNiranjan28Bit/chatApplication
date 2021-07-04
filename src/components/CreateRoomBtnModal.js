import React from 'react';
import {
  Button,
  Icon,
  Modal,
  Form,
  FormGroup,
  ControlLabel,
  FormControl,
} from 'rsuite';
import { useModalState } from '../misc/custom-hooks';

function CreateRoomBtnModal() {
  const { isOpen, open, close } = useModalState();
  return (
    <div className="mt-2">
      <Button block element color="green" onClick={open}>
        <Icon icon="creative" /> Create New Room.
      </Button>

      <Modal show={isOpen} onHide={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form fluid>
            <FormGroup>
              <ControlLabel>Room Name</ControlLabel>
              <FormControl
                name="name"
                placeholder="Enter Room Name..."
              ></FormControl>
            </FormGroup>
            <FormGroup>
              <ControlLabel>Description</ControlLabel>
              <FormControl
                componentClass="textarea"
                rows={5}
                name="description"
                placeholder="Enter the description..."
              ></FormControl>
            </FormGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button block appearance="primary">
            Create New Chat Room
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateRoomBtnModal;
