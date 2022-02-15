import React, { Component } from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  Card,
  CardTitle,
  CardSubtitle,
  CardLink,
  CardBody,
  CardImg,
  CardText,
} from "reactstrap";

//Modal for viewing and displaying Item (GET)
class ViewItemModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeItem: this.props.activeItem,
    };
  }

  render() {
    const { toggle, activeItem } = this.props;
    return (
      <Modal isOpen={true}>
        <ModalHeader toggle={toggle}>View Item</ModalHeader>
        <ModalBody>
          <Card>
            <CardBody>
              <CardTitle className="text-decoration-underline" tag="h5">
                Item Name
              </CardTitle>
              <CardSubtitle>{activeItem.item_name}</CardSubtitle>

              <CardTitle className="text-decoration-underline" tag="h5">
                Description
              </CardTitle>
              <CardSubtitle>{activeItem.item_description}</CardSubtitle>

              <CardTitle className="text-decoration-underline" tag="h5">
                Image
              </CardTitle>
              <CardImg
                className="mb-1"
                alt={`Image of ${activeItem.item_name}`}
                src={activeItem.item_image}
              />

              <CardTitle className="text-decoration-underline" tag="h5">
                Status
              </CardTitle>
              <CardText>
                {activeItem.claimed ? "Item Claimed" : "Item Not Claimed"}
              </CardText>
              <CardTitle tag="h6">
                <CardLink
                  alt={activeItem.item_name}
                  href={activeItem.item_link}
                >
                  Item Link
                </CardLink>
              </CardTitle>
            </CardBody>
          </Card>
        </ModalBody>
      </Modal>
    );
  }
}

export default ViewItemModal;
