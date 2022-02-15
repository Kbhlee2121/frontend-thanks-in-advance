import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";
import Login from "./components/Login";
import Main from "./components/Main";
import Header from "./components/Header";

function App() {
  const navigate = useNavigate();
  const date = new Date();
  //user is an object
  const [user, setUser] = useState(null);
  const checkUser = () => {
    console.log("checking user..");
    if (user === null) {
      // Get the last user data from localStorage
      const savedUser = localStorage.getItem("loggedUser");
      if (savedUser !== null) {
        // If it is null, we're doing a fresh login
        setUser(JSON.parse(savedUser));
      }
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("loggedUser");
    setUser(null);
    navigate("/");
  };

  // const currentUser = JSON.parse(localStorage.getItem("logged_user"))(
  //   currentUser !== null
  // )
  //   ? setUser(currentUser)
  //   : setUser(null);
  return (
    <div>
      <Header logout={logout} />
      <div className="container">
        {user != null ? (
          <Main user={user} logout={logout} />
        ) : (
          <Login setUser={setUser} />
        )}
        <footer className="my-5 mb-2 text-center">
          Copyright {date.getFullYear()} &copy; All Rights Reserved{" "}
        </footer>
      </div>
    </div>
  );
}

export default App;
