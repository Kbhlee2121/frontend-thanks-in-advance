import React, { useEffect, useState } from "react";
import ViewItemModal from "./ViewItemModal";
import ItemModal from "./ItemModal";
import axios from "axios";
import { useLocation } from "react-router-dom";
import ItemsList from "./ItemList";
import { Link } from "react-router-dom";

//displays list of items of selected wishlist. Handles CRUD Modals of Items
// class WishlistViewer extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeWishlist: null,
//       itemsList: [],
//       filteredList: [],
//       activeItem: {},
//       modal: false,
//       // editing lets us know if we're editing or submitting an item
//       editing: false,
//       viewing: false,
//     };
//   }
function WishlistViewer() {
  const location = useLocation();
  const [activeWishlist, setActiveWishlist] = useState({});
  const [activeItem, setActiveItem] = useState({});
  const [filteredList, setFilteredList] = useState([]);
  const [itemsList, setItemsList] = useState([]);
  const [modal, setModal] = useState(false);
  const [isEditing, setEditing] = useState(false);
  const [isViewing, setViewing] = useState(false);
  const isFriendViewing = location.state.friendViewing;
  // const [isFriendViewing, setFriendViewing] = useState(false);

  //componentDidMount - invoked after component is mounted(inserted into tree) to initiate network request if need to load data from a remote endpoint
  // componentDidMount() {
  //   // location = {state: {wishlist: wishlist}
  //   // const location = useLocation();
  //   // this.setState({ activeWishlist: location.state.wishlist });
  //   this.getItemsList();
  // };

  // list of items of selected wishlist

  // useEffect(setActiveWishlist(location.state.wishlist), []);

  const getItemsList = () => {
    const currentWishlist = location.state.wishlist;
    console.log(isFriendViewing);
    setActiveWishlist(currentWishlist);
    axios
      .get(
        `https://backend-thanks-in-advance.herokuapp.com/api/items-wishlist/${currentWishlist.id}/`
      )
      .then((response) => {
        console.log("in getItemsList");
        const itemsList = response.data;
        console.log(itemsList);
        setItemsList(itemsList);
      })
      .catch((error) => console.log(error));
  };
  // const currentWishlist = () => {
  //   const currentWishlist = location.state.wishlist;
  //   setActiveWishlist(currentWishlist);
  //   console.log(currentWishlist, activeWishlist);
  //   getItemsList();
  // };

  useEffect(() => {
    console.log("updating!");
    getItemsList();
  }, []);

  const resetActiveItem = () => {
    const emptyItem = {
      // setting defaults to fields
      id: undefined,
      item_name: "",
      item_description: "",
      claimed: false,
      item_link: undefined,
      item_image: undefined,
      wishlist: undefined,
    };
    setActiveItem(emptyItem);
  };

  const handleModalFieldChange = (e) => {
    let { name, value } = e.target;
    // console.log(name, value);
    if (e.target.type === "checkbox") {
      // changes default in the state for edits
      const checked = !activeItem.claimed;
      e.target.checked = checked;
      const currentItem = { ...activeItem, claimed: checked };
      setActiveItem(currentItem);
      return;
    } else {
      const updatedItem = { ...activeItem, [name]: value };
      setActiveItem(updatedItem);
    }
  };

  const toggle = () => {
    // If the modal is open and we're toggling it off, we should reset the active item
    // renderItems();
    if (modal) {
      resetActiveItem();
    }
    setModal(!modal);
  };

  const handleModalSubmit = () => {
    // Backend does not like _ in Urls or ones that are over 200 characters
    // This should catch most* Urls
    if (activeItem.item_link && activeItem.item_link.length > 200) {
      let shortLink = activeItem.item_link
        .split("?")[0] // most things after ? is optional
        .slice(0, 200) // ensure max length
        .replace(/_/g, ""); // remove all underscores
      console.log(`Link too long, new link is: ${shortLink}`, shortLink.length);
      const updatedLinkItem = { ...activeItem, item_link: shortLink };
      setActiveItem(updatedLinkItem);
    }

    isEditing ? updateItem() : addItem();
  };

  const detailViewItem = (item) => {
    const foundItem = itemsList.find((listItem) => item.id === listItem.id);
    if (foundItem) {
      setActiveItem(foundItem);
      setViewing(true);
      // this.setState({ activeItem: foundItem, viewing: true });
      toggle();
    }
  };

  const setAddItemState = () => {
    setEditing(false);
    setViewing(false);
    // this.setState({
    //   editing: false,
    //   viewing: false,
    // });
    toggle();
  };

  const addItem = () => {
    let item = activeItem;
    // //?? wishlist or wishlist_id
    // setActiveWishlist(item.wishlist_id);
    item.wishlist = activeWishlist.id;
    axios
      .post(
        "https://backend-thanks-in-advance.herokuapp.com/api/item-create/",
        item
      )
      .then((response) => {
        //concat adds item to end of list
        // const newItemsList = itemsList.concat(item);

        const newItem = response.data;
        const newItemsList = itemsList.concat(newItem);
        console.log(newItemsList, setItemsList);
        setItemsList(newItemsList);

        // // this.setState({ itemsList: this.state.itemsList.concat(item) });
        // renderItems();
        toggle();
      })
      .catch((error) => console.log(error));
  };

  const setEditItemState = (item) => {
    setEditing(true);
    setViewing(false);
    setActiveItem(item);
    // this.setState({
    //   editing: true,
    //   viewing: false,
    //   activeItem: item,
    // });
    toggle();
  };

  const updateItem = () => {
    const item = activeItem;
    const foundIndex = itemsList.findIndex(
      (listItem) => listItem.id === item.id
    );
    if (foundIndex !== -1) {
      axios
        .put(
          `https://backend-thanks-in-advance.herokuapp.com/api/item-update/${item.id}/`,
          item
        )
        .then((response) => {
          const listCopy = [...itemsList];
          listCopy[foundIndex] = item;
          // this.resetActiveItem();
          setEditing(false);
          setItemsList(listCopy);
          // this.setState({ editing: false, itemsList: listCopy });
          toggle();
          // renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  const deleteItem = (item) => {
    const foundItem = itemsList.find((listItem) => item.id === listItem.id);
    if (foundItem) {
      axios
        .delete(
          `https://backend-thanks-in-advance.herokuapp.com/api/item-delete/${item.id}/`
        )
        .then((response) => {
          const filteredList = itemsList.filter(
            (listItem) => listItem.id !== foundItem.id
          );
          setItemsList(filteredList);
          // this.setState({ itemsList: filteredList });
          // renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  const searchWishList = (e) => {
    const searchTerm = e.target.value;
    if (searchTerm.length > 0) {
      const filtered = itemsList.filter((item) =>
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) {
        setFilteredList(filtered);
        // this.setState({ filteredList: filtered });
        // renderItems();
      }
    } else {
      setFilteredList([]);
      // this.setState({ filteredList: [] });
      // renderItems();
    }
  };

  // rendering items in the wishlist
  // const renderItems = () => {
  //   console.log("Calling renderItems");
  //   let newItems = [];
  //   if (filteredList.length > 0) {
  //     newItems = filteredList;
  //   } else {
  //     newItems = itemsList;
  //   }
  //   console.log(newItems);
  //   // return newItems.map((item) => (
  //   //   <Item
  //   //     key={item.id}
  //   //     item={item}
  //   //     detailViewItem={detailViewItem}
  //   //     setEditItemState={setEditItemState}
  //   //     deleteItem={deleteItem}
  //   //   />
  //   // ));
  // };

  return (
    <div>
      <header className="mt-3 d-flex container-fluid align-items-center justify-content-between">
        <Link to="/" className="custom-link">
          Home
        </Link>
        <h4>
          {" "}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            className="bi bi-bag-heart"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
            />
          </svg>
          Thanks in Advance
        </h4>
      </header>

      <h2
        id="wl-head"
        className=" fw-bold p-3 my-4 bg-white rounded text-center"
      >
        {activeWishlist.title}
      </h2>

      <div className="item-container  shadow p-3 mb-5 bg-white rounded">
        <form id="form">
          <input
            className="form-control mt-1"
            id="search-item"
            type="text"
            name="search"
            placeholder="Search item..."
            onChange={searchWishList}
          />
        </form>
        <button className="btn btn-warning my-3" onClick={setAddItemState}>
          + Item
        </button>

        <ul className="list-group list-group-flush">
          <ItemsList
            itemsList={itemsList}
            filteredList={filteredList}
            detailViewItem={detailViewItem}
            setEditItemState={setEditItemState}
            deleteItem={deleteItem}
            isFriendViewing={isFriendViewing}
          />

          {/* {itemsList ? itemsList.map((item) => <p>{item.item_name}</p>) : null} */}
          {/* {itemsList.length > 0
            ? renderItems()
            : `No Items: ${itemsList.length}`} */}
        </ul>
      </div>

      {modal ? (
        isViewing ? (
          <ViewItemModal activeItem={activeItem} toggle={toggle} />
        ) : (
          <ItemModal
            activeItem={activeItem}
            handleFieldChange={handleModalFieldChange}
            toggle={toggle}
            onSave={handleModalSubmit}
            isEditing={isEditing}
          />
        )
      ) : null}
    </div>
  );
}

export default WishlistViewer;
