import React from "react";
import "./CSS/style.css";
import { Link } from "react-router-dom";

function Navbar(props) {
  return (
    <>
      <div className="page-div">
        <header className="header">
          <div className="logo-name-div">
            <div className="logo">
              <img src={props.logo} alt="" />
            </div>
            <div className="site-name">
              <h2>BoTing Chat App</h2>
            </div>
          </div>
          <div className="header-button">
            <Link to="/joinchat">
              <button className="bttn">Join Chat</button>
            </Link>
          </div>
        </header>
      </div>
    </>
  );
}

export default Navbar;
