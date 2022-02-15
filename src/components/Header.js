import React from "react";

const Header = (props) => {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-gradient-info">
        <div className="container-fluid d-flex">
          <div className="d-flex flex-row">
            <a
              className="nav-link active custom-link"
              aria-current="page"
              href="/"
            >
              Home
            </a>
            <p className="nav-link active custom-link" onClick={props.logout}>
              Logout
            </p>
          </div>

          <h3 className="ml-auto p-2 align-self-end fw-bold">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="28"
              fill="currentColor"
              class="bi bi-bag-heart"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5Zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0ZM14 14V5H2v9a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1ZM8 7.993c1.664-1.711 5.825 1.283 0 5.132-5.825-3.85-1.664-6.843 0-5.132Z"
              />
            </svg>
            Thanks in Advance
          </h3>
        </div>
      </nav>
    </div>
  );
};

export default Header;
