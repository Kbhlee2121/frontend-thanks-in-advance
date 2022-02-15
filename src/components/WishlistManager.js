import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  CardGroup,
  Card,
  CardBody,
  CardTitle,
  CardSubtitle,
  CardText,
  Button,
} from "reactstrap";
import WishlistModal from "./WishlistModal";
import FriendWishlist from "./FriendWishlist";

//handles CRUD for wishlists. activeWishlist to be set by GET wishlist
// class WishlistManager extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       activeWishlist: null,
//       wishlists: [],
//       editingWL: false,
//     };
//   }

function WishlistManager(props) {
  const navigate = useNavigate();
  const [activeWishlist, setActiveWishlist] = useState({});
  const [wishlists, setWishlists] = useState([]);
  const [isEditingWL, setEditingWL] = useState(false);
  const [modalWL, setModalWL] = useState(false);
  // to perform operations that need to be executed when DOM is updated
  //called only when component gets updated or when the props passed to it change in App.js
  // componentDidUpdate() {
  //   this.getWishlists();
  // }

  // componentDidMount() {
  //   this.getWishlists();
  // }

  //view WL cards GET
  const getWishlists = () => {
    axios
      .get(`http://localhost:8000/api/user/wishlists/${props.userId}/`)
      .then((response) => {
        // use map here?
        setWishlists(response.data);
        // this.setState({ wishlists: response.data });
      })
      .catch((error) => console.log(error));
  };

  useEffect(getWishlists, []);

  const toggleWL = () => {
    if (modalWL) {
      resetActiveWishlist();
    }
    setModalWL(!modalWL);
  };

  const addInputHandler = (e) => {
    let { name, value } = e.target;
    const updatedWishlist = { ...activeWishlist, [name]: value };
    setActiveWishlist(updatedWishlist);
  };

  const handleSubmit = () => {
    // this.state.editingWL ? this.updateWishlist() : this.addWishlist();
    isEditingWL ? updateWishlist() : addWishlist();
  };

  const setAddWishlistState = () => {
    // this.setState({ editing: false });
    setEditingWL(false);
    toggleWL();
  };

  const setEditWishlistState = (wishlist) => {
    setEditingWL(true);
    setActiveWishlist(wishlist);
    toggleWL();
  };
  //create WL button - extends at bottom of pg instead of Modal
  const addWishlist = () => {
    const wishlist = activeWishlist;
    wishlist.user = props.userId;
    console.log(wishlist);
    axios
      .post("http://localhost:8000/api/wishlist-create/", wishlist)
      .then((response) => {
        //add wishlist to end of list
        const newWishlist = response.data;
        console.log(newWishlist);
        newWishlists = wishlists.concat(newWishlist);
        setWishlists(newWishlists);
        toggleWL();
        // this.setState({ wishlists: this.state.wishlists.concat(wishlist) });
        //not sure if it'll be responsive and show new WL added
      })
      .catch((error) => console.log(error.response.data));
  };

  //edit WL Info button
  const updateWishlist = () => {
    const wishlist = activeWishlist;
    const foundIndex = wishlists.findIndex(
      (listItem) => listItem.id === wishlist.id
    );
    if (foundIndex !== -1) {
      axios
        .put(
          `http://localhost:8000/api/wishlist-update/${wishlist.id}/`,
          wishlist
        )
        .then((response) => {
          const wishlistCopy = [...wishlists];
          wishlistCopy[foundIndex] = wishlist;
          // this.resetActiveItem();
          setEditingWL(false);
          setWishlists(wishlistCopy);
          // this.setState({ editing: false, itemsList: listCopy });
          toggleWL();
          // renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  //Edit Items button: set activeWishlist on card click -> whole wishlist object
  const editItem = (wishlist) => {
    setActiveWishlist(wishlist);
    // this.setState({ activeWishlist: wishlist })
    // const navigate = useNavigate();
    navigate("/wishlist", { state: { wishlist: wishlist } });
  };

  //delete WL button
  const deleteWishlist = (wishlist) => {
    const foundWishlist = wishlists.find(
      (listItem) => wishlist.id === listItem.id
    );
    if (foundWishlist) {
      axios
        .delete(`http://localhost:8000/api/wishlist-delete/${wishlist.id}/`)
        .then((response) => {
          const filteredWishlist = wishlists.filter(
            (listItem) => listItem.id !== foundWishlist.id
          );
          setWishlists(filteredWishlist);
          // this.setState({ itemsList: filteredList });
          // renderItems();
        })
        .catch((error) => console.log(error));
    } else {
      console.log("Item not found");
    }
  };

  //WishlistViewer?

  const resetActiveWishlist = () => {
    const date = new Date();
    const emptyWishlist = {
      // setting defaults to fields
      id: undefined,
      user: undefined,
      title: "",
      description: "",
      created: date,
    };
    setActiveWishlist(emptyWishlist);
  };

  let newWishlists = wishlists;
  return (
    //cards for user's wishlists
    <div>
      <div className="">
        <h3 className="fw-bold text-center my-3">
          - My Wishlists -
          {/* <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="currentColor"
            class="bi bi-person-heart"
            viewBox="0 0 16 16"
          >
            <path d="M9 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm-9 8c0 1 1 1 1 1h10s1 0 1-1-1-4-6-4-6 3-6 4Zm13.5-8.09c1.387-1.425 4.855 1.07 0 4.277-4.854-3.207-1.387-5.702 0-4.276Z" />
          </svg> */}
        </h3>
        <div className="d-flex justify-content-center">
          <Button
            color="warning bg-opacity-25"
            className="mx-3 my-1"
            onClick={setAddWishlistState}
          >
            + Wishlist
          </Button>
        </div>

        <div className="">
          <CardGroup className="">
            {newWishlists.map((wishlist) => {
              const date = new Date(wishlist.created);
              return (
                <Card
                  key={wishlist.id}
                  className="shadow p-3 mb-5 bg-white rounded mx-2 my-2 col card-min-sizing"
                >
                  <CardBody>
                    <CardTitle tag="h5">{wishlist.title}</CardTitle>
                    <CardSubtitle className="mb-2 text-muted" tag="h6">
                      {`Created: ${
                        date.getMonth() + 1
                      }/${date.getDate()}/${date.getFullYear()}`}
                    </CardSubtitle>
                    <CardText>{wishlist.description}</CardText>
                  </CardBody>
                  <div className="d-flex flex-row justify-content-around">
                    <CardText
                      // color="info"
                      className="custom-link" // className="col mx-1"
                      onClick={(e) => setEditWishlistState(wishlist)}
                    >
                      Edit Info
                    </CardText>
                    {/* set active wishlist and navigate  */}
                    <CardText
                      // color="primary"
                      className="custom-link" // className="col mx-1"
                      onClick={() => editItem(wishlist)}
                    >
                      Edit Items
                    </CardText>
                    <CardText
                      // color="danger"
                      className="custom-link" // className="col mx-1"
                      onClick={(e) => deleteWishlist(wishlist)}
                    >
                      Delete
                    </CardText>
                  </div>
                </Card>
              );
            })}
          </CardGroup>
        </div>
      </div>
      <div>
        {modalWL ? (
          <WishlistModal
            toggle={toggleWL}
            open={modalWL}
            addInputHandler={addInputHandler}
            activeWishlist={activeWishlist}
            onSave={handleSubmit}
            isEditing={isEditingWL}
          />
        ) : null}
        <FriendWishlist userId={props.userId} />

        {/* //next page when wishlist is selected/clicked. Displays list of items of specific wishlist */}
        {/* <WishlistViewer activeWishlist={this.state.activeWishlist} /> */}
      </div>
    </div>
  );
}

export default WishlistManager;
