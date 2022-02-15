import React, { Component } from "react";
import "./App.css";
import ItemModal from "./components/ItemModal";
import ViewItemModal from "./components/ViewItemModal";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      activeItem: {},
      wishList: [],
      filteredWishList: [],
      // // editing lets us know if we're editing or submitting an item
      editing: false,
      viewing: false,
    };
  }
  //componentDidMount - invoked after component is mounted(inserted into tree) to initiate network request if need to load data from a remote endpoint
  componentDidMount() {
    this.resetActiveItem();
    this.getItemsList();
  }

  resetActiveItem = () => {
    const emptyItem = {
      // setting defaults to fields
      id: null,
      item_name: "",
      item_description: "",
      claimed: false,
      item_link: null,
      item_image: null,
    };
    this.setState({ activeItem: emptyItem });
  };

  // //checks if checkbox is checked or not
  handleModalFieldChange = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);
    if (e.target.type === "checkbox") {
      // changes default in the state for edits
      const checked = !this.state.activeItem.claimed;
      e.target.checked = checked;
      const activeItem = { ...this.state.activeItem, claimed: checked };
      this.setState({ activeItem });
      return;
    } else if (e.target.type === "file") {
      this.onImageChange(e);
      return;
    } else {
      const updatedItem = { ...this.state.activeItem, [name]: value };
      this.setState({ activeItem: updatedItem });
    }
  };

  // create toggle property
  toggle = () => {
    // If the modal is open and we're toggling it off, we should reset the active item
    if (this.state.modal) {
      this.resetActiveItem();
    }
    this.setState({ modal: !this.state.modal });
  };

  handleModalSubmit = () => {
    // Backend does not like _ in Urls or ones that are over 200 characters
    // This should catch most* Urls
    if (
      this.state.activeItem.item_link &&
      this.state.activeItem.item_link.length > 200
    ) {
      let shortLink = this.state.activeItem.item_link
        .split("?")[0] // most things after ? is optional
        .slice(0, 200) // ensure max length
        .replace(/_/g, ""); // remove all underscores
      console.log(`Link too long, new link is: ${shortLink}`, shortLink.length);
      this.setState({
        activeItem: {
          item_link: shortLink,
        },
      });
    }

    this.state.editing ? this.updateItem() : this.addItem();
  };

  getItemsList = () => {
    axios
      .get("http://localhost:8000/api/items/")
      .then((response) => this.setState({ wishList: response.data }))
      .catch((error) => console.log(error));
  };

  detailViewItem = (item) => {
    const foundItem = this.state.wishList.find(
      (wishListItem) => item.id === wishListItem.id
    );
    if (foundItem) {
      this.setState({ activeItem: foundItem, viewing: true });
      this.toggle();
    }
  };

  setAddItemState = () => {
    this.setState({
      editing: false,
      viewing: false,
    });
    // this.resetActiveItem();
    this.toggle();
  };

  addItem = () => {
    const item = this.state.activeItem;

    axios
      .post("http://localhost:8000/api/item-create/", item)
      .then((response) => {
        //concat adds item to end of list
        this.setState({ wishList: this.state.wishList.concat(item) });
        this.renderItems();
        this.toggle();
        // this.resetActiveItem();
      })
      .catch((error) => console.log(error));
  };

  setEditItemState = (item) => {
    this.setState({
      editing: true,
      viewing: false,
      activeItem: item,
    });
    this.toggle();
  };

  updateItem = () => {
    const item = this.state.activeItem;
    const foundIndex = this.state.wishList.findIndex(
      (wishListItem) => wishListItem.id === item.id
    );
    if (foundIndex !== -1) {
      axios
        .put(`http://localhost:8000/api/item-update/${item.id}/`, item)
        .then((response) => {
          const wishListCopy = [...this.state.wishList];
          wishListCopy[foundIndex] = item;
          // this.resetActiveItem();
          this.setState({ editing: false, wishList: wishListCopy });
          this.toggle();
          this.renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  deleteItem = (item) => {
    const foundItem = this.state.wishList.find(
      (wishListItem) => item.id === wishListItem.id
    );
    if (foundItem) {
      axios
        .delete(`http://localhost:8000/api/item-delete/${item.id}/`)
        .then((response) => {
          const filteredWishList = this.state.wishList.filter(
            (wishListItem) => wishListItem.id !== foundItem.id
          );
          this.setState({ wishList: filteredWishList });
          this.renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  searchWishList = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
      const filtered = this.state.wishList.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        this.setState({ filteredWishList: filtered });
        this.renderItems();
      }
    } else {
      this.setState({ filteredWishList: [] });
      this.renderItems();
    }
  };

  // rendering items in the wishlist
  renderItems = () => {
    let newItems = [];
    if (this.state.filteredWishList.length > 0) {
      newItems = this.state.filteredWishList;
    } else {
      newItems = this.state.wishList;
    }
    return newItems.map((item) => (
      <li
        key={item.id}
        className="list-group-item d-flex justify-content-between align-items-center"
      >
        {/* add onClick for getlist */}
        {item.claimed === false ? (
          <span onClick={(e) => this.detailViewItem(item)}>
            {item.item_name}
          </span>
        ) : (
          <strike onClick={(e) => this.detailViewItem(item)}>
            {item.item_name}
          </strike>
        )}
        <span>
          <button
            className="btn btn-info mr-2 btn-sm"
            onClick={(e) => this.setEditItemState(item)}
          >
            Edit
          </button>
          <button
            className="btn btn-danger mr-2 btn-sm"
            onClick={(e) => this.deleteItem(item)}
          >
            Delete
          </button>
        </span>
      </li>
    ));
  };

  render() {
    // ensures copyright year is always up to date. date = new date object
    const date = new Date();
    return (
      <main className="container">
        <header>
          <h1>Thanks in Advance</h1>
        </header>
        <div className="item-container">
          <form id="form">
            <input
              className="form-control"
              id="search-item"
              // value={this.state.activeItem.item_name}
              type="text"
              name="search"
              placeholder="Search item..."
              onChange={this.searchWishList}
            />
          </form>
          <button className="btn btn-warning" onClick={this.setAddItemState}>
            Add Item
          </button>
        </div>
        <div id="list-wrapper">
          <ul className="list-group list-group-flush">{this.renderItems()}</ul>
        </div>
        <footer className="my-5 mb-2 text-center">
          Copyright {date.getFullYear()} &copy; All Rights Reserved{" "}
        </footer>
        {/* {/* activeItem represents item that is to be edited. Toggle determines state (open or closed) of Modal. onSave saves item */}
        {this.state.modal ? (
          this.state.viewing ? (
            <ViewItemModal
              activeItem={this.state.activeItem}
              toggle={this.toggle}
            />
          ) : (
            <ItemModal
              activeItem={this.state.activeItem}
              handleFieldChange={this.handleModalFieldChange}
              toggle={this.toggle}
              onSave={this.handleModalSubmit}
              isEditing={this.state.editing}
            />
          )
        ) : null}
      </main>
    );
  }
}

export default App;
