import React from "react";
import WishlistManager from "./WishlistManager";
import { Link } from "react-router-dom";
import User from "./User";
import { Button } from "reactstrap";

const Main = (props) => {
  return (
    <div>
      <h1 className="text-center fw-bolder">My Dashboard</h1>
      <h5 className="text-center">Signed in as {props.user.username}</h5>
      <details className="shadow p-2 mb-3 bg-white rounded">
        <summary>
          <h3 className="d-inline-block">See User Profile</h3>
        </summary>
        <User user={props.user} />
      </details>

      {/* // display cards of wishlists */}
      <WishlistManager userId={props.user.id} />
    </div>
  );
};

export default Main;
