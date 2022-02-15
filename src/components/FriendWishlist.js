import React, { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
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

const FriendWishlist = (props) => {
  const navigate = useNavigate();
  const [friendWishlists, setFriendWishlists] = useState([]);
  const [activeFriend, setActiveFriend] = useState({});

  const getFriendWishlists = () => {
    axios
      .get(`http://localhost:8000/api/friend-wishlists/${props.userId}/`)
      .then((response) => {
        // use map here?
        setFriendWishlists(response.data);
        // this.setState({ wishlists: response.data });
      })
      .catch((error) => console.log(error));
  };

  const viewWishlistHandler = (wishlist) => {
    setActiveFriend(wishlist);
    console.log(wishlist, activeFriend);
    navigate("/wishlist", {
      state: { wishlist: wishlist, friendViewing: true },
    });
  };

  useEffect(getFriendWishlists, []);

  return (
    //cards for friend wishlists
    <div>
      <h3 className="text-center fw-bold mx-2 my-2">
        - My Friends' Wishlists -
        {/* <svg
          xmlns="http://www.w3.org/2000/svg"
          width="25"
          height="25"
          fill="currentColor"
          className="bi bi-people-fill"
          viewBox="0 0 16 16"
        >
          <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
          <path
            fill-rule="evenodd"
            d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"
          />
          <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z" />
        </svg> */}
      </h3>

      <CardGroup>
        {friendWishlists.map((wishlist) => {
          const date = new Date(wishlist.created);
          return (
            <Card
              className="shadow p-3 mb-5 bg-white rounded mx-2 my-2 card-min-sizing"
              key={wishlist.id}
              onClick={() => viewWishlistHandler(wishlist)}
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
            </Card>
          );
        })}
      </CardGroup>
    </div>
  );
};

export default FriendWishlist;
