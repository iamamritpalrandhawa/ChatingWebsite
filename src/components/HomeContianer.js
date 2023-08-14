import React from "react";
import { Link } from "react-router-dom";
function HomeContianer() {
  return (
    <>
      <div className="containerh">
        <div className="sub-container">
          <div className="sub-cont-item">
            <h1 className="sub-container-heading">BoTing Chat App</h1>
          </div>
          <div className="sub-cont-item">
            <h3>The chat site you've always been looking for</h3>
          </div>
          <div className="sub-container-buttons sub-cont-item">
            <Link to="/joinchat">
              <button className="bttn">Join Chat</button>
            </Link>
            <Link to="/createchat">
              <button className="bttn">Create Chat</button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeContianer;
