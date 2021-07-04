import React from 'react';
import { Button, Icon, Modal, Form } from 'rsuite';
import { useModalState } from '../misc/custom-hooks';

function CreateRoomBtnModal() {
  const { isOpen, open, close } = useModalState();
  return (
    <div className="mt-2">
      <Button block element color="green" onClick={open}>
        <Icon icon="creative" /> Create New Room.
      </Button>

      <Modal>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <FormGroup></FormGroup>
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
