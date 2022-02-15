import React, { Component } from "react";
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

//Modal for Add and Edit Item
class ItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // activeItem: this.props.activeItem,
    };
  }

  //toggle for if the modal is on or off
  render() {
    // toggle and save the changes which or from this.prop
    const { toggle, onSave, isEditing, activeItem } = this.props;
    return (
      <Modal isOpen={true}>
        {isEditing ? (
          <ModalHeader toggle={toggle}>Edit Item</ModalHeader>
        ) : (
          <ModalHeader toggle={toggle}>Add Item</ModalHeader>
        )}
        <ModalBody>
          <Form>
            {/* wishlist label? */}
            {/* Item name */}
            <FormGroup>
              <Label for="item-name">Item Name</Label>
              <Input
                // type="text"
                name="item_name"
                id="item-name"
                onChange={this.props.handleFieldChange}
                value={activeItem.item_name}
                placeholder="Enter Item Name"
              />
            </FormGroup>
            {/* Description label */}
            <FormGroup>
              <Label for="description">Description</Label>
              <Input
                type="textarea"
                name="item_description"
                id="description"
                value={activeItem.item_description}
                onChange={this.props.handleFieldChange}
                placeholder="Describe the item"
              />
            </FormGroup>

            {/* item link label */}
            <FormGroup>
              <Label for="item-link">Link</Label>
              <Input
                id="item-link"
                type="url"
                name="item_link"
                value={activeItem.item_link}
                onChange={this.props.handleFieldChange}
                placeholder="Enter a link to the item"
              />
            </FormGroup>
            {/* item image label */}
            <FormGroup>
              <Label for="item-image">Image</Label>
              <Input
                id="item-image"
                type="url"
                name="item_image"
                value={activeItem.item_image}
                onChange={this.props.handleFieldChange}
                placeholder="Enter an image URL"
                // type="file"
                // accept=".png,.jpg,.jpeg"
                // name="item_image"
                // // value={activeItem.item_image}
                // onChange={this.props.handleFieldChange}
              />
            </FormGroup>
            {/* claimed label */}
            <FormGroup check>
              <Label check for="claimed">
                <Input
                  type="checkbox"
                  name="claimed"
                  defaultChecked={activeItem.claimed}
                  onClick={this.props.handleFieldChange}
                />
                Claimed
              </Label>
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
  }
}

export default ItemModal;
