import React, { useState } from "react";
import axios from "axios";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { updateUser, logoutUser } from "../redux/userReducer";

const Header = (props) => {
  const [dropView, setDropView] = useState(false);

  const toggleDropdown = () => {
    setDropView(!dropView);
  };

  const logoutUser = () => {
    axios
      .post("/api/logout")
      .then((_) => props.logoutUser())
      .catch((err) => console.log(err));
  };

  return (
    props.location.pathname !== "/" && (
      <header className="header">
        <Link to="/home" style={{ textDecoration: "none" }}>
          <h1 style={{ color: "white" }}>Ecuadorian Cuisine</h1>
        </Link>

        <nav className="nav-bar">
          <Link to="/home" style={{ textDecoration: "none" }}>
            <span>Home</span>{" "}
          </Link>

          <Link to="/cart" style={{ textDecoration: "none" }}>
            <span>Cart</span>{" "}
          </Link>

          <Link
            to="/"
            style={{ textDecoration: "none" }}
            onClick={logoutUser()}
          >
            <span>Logout</span>
          </Link>
        </nav>
        <div
          className="dropdown-btn"
          onClick={toggleDropdown}
        >
          <div className="lines-1"></div>
          <div className="lines-2"></div>
          <div className="lines-3"></div>
        </div>

        {dropView ? (
          <nav className="mobile-menu">
            <Link to="/home" style={{ textDecoration: "none" }}>
              <span><h1>Home</h1></span>
            </Link> <Link to="/cart" style={{ textDecoration: "none" }}>
              <span><h1>Cart</h1></span>
            </Link>
            <Link to="/" style={{ textDecoration: "none" }}>
              <span onClick={logoutUser}><h1>Logout</h1></span>
            </Link>
          </nav>
        ) : null}
      </header>
    )
  );
};
const mapStateToProps = (reduxState) => reduxState.userReducer;

export default withRouter(
  connect(mapStateToProps, { updateUser, logoutUser })(Header)
);
