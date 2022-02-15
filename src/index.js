import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import WishlistViewer from "./components/WishlistViewer";
import Login from "./components/Login";
import "bootstrap/dist/css/bootstrap.min.css";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UserForm from "./components/UserForm";
import "bootstrap/dist/css/bootstrap.min.css";

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      {/* <Header /> */}
      <div className="container">
        <Routes>
          <Route path="/" element={<App />} />
          <Route path="/login" element={<Login />} />
          <Route path="/wishlist" element={<WishlistViewer />} />
          <Route path="/userform" element={<UserForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
