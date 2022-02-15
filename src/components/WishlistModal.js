import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Input,
  Label,
} from "reactstrap";

const WishlistModal = ({
  toggle,
  addInputHandler,
  activeWishlist,
  onSave,
  open,
  isEditing,
}) => {
  return (
    <Modal isOpen={open}>
      {isEditing ? (
        <ModalHeader toggle={toggle}>Edit Wishlist</ModalHeader>
      ) : (
        <ModalHeader toggle={toggle}>Add Wishlist</ModalHeader>
      )}
      <ModalBody>
        <Form>
          <FormGroup>
            <Label for="title">Wishlist Title</Label>
            <Input
              // type="text"
              name="title"
              id="title"
              onChange={addInputHandler}
              value={activeWishlist.title}
              placeholder="Enter a title"
            />
          </FormGroup>
          {/* Description label */}
          <FormGroup>
            <Label for="description">Description</Label>
            <Input
              type="textarea"
              name="description"
              id="description"
              value={activeWishlist.description}
              onChange={addInputHandler}
              placeholder="Describe this wishlist"
            />
          </FormGroup>
        </Form>
      </ModalBody>
      <ModalFooter>
        <Button color="success" onClick={onSave}>
          Save
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default WishlistModal;
