import React, { useState } from "react";
import "./CSS/joinChat.css";
import { useNavigate } from "react-router-dom";
import "./CSS/createChat.css";

const Createchat = ({ socket }) => {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [room, setRoomname] = useState("");
  const [color, setColor] = useState("#000000");
  // const [showModal, setShowModal] = useState(false);
  // const openModal = () => {};

  const handleCreateRoom = () => {
    if (username !== "" && room !== "" && color !== "") {
      socket.emit("CreateRoom", {
        id: localStorage.getItem("key"),
        username: username,
        color: color,
        roomname: room,
      });
      navigate("/chat");
    }
  };
  return (
    <>
      <div className="main-contianer">
        <div className="contianer">
          <div className="sub-contianer">
            <div className="content">
              <h4>BoTing Chat App</h4>
              <p>Anonymous text chat without registration</p>
            </div>
          </div>
          <div className="form-content">
            {/* <form action=""> */}
            <div className="input-div">
              <input
                type="text"
                name="usernmae"
                id="username"
                placeholder="Username"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </div>
            <div className="input-div">
              <input
                type="text"
                name="chat-id"
                id="chat-id"
                placeholder="Enter Roomname "
                onChange={(e) => {
                  setRoomname(e.target.value);
                }}
              />
            </div>
            <div className="input-div color-div">
              <p className="text">Choose Color</p>
              <label className="color-cls" htmlFor="color">
                <div className="logo">
                  <i className="fa-solid fa-user-secret"></i>
                </div>
                <input
                  type="color"
                  name="color"
                  id="color"
                  onChange={(e) => {
                    setColor(e.target.value);
                  }}
                />
              </label>
            </div>

            {/* <div className="input-div switch-bttn-cotainer">
                                <p className="text">I am over 18</p>
                                <label className="switch">
                                    <input type="checkbox" checked />
                                    <span className="slider round"></span>
                                </label>
                            </div> */}

            <div className="join-button input-div">
              <button
                className="bttn"
                type="button"
                //   onclick="openModal()"
                onClick={handleCreateRoom}>
                Create Chat
              </button>
            </div>

            {/* {showModal && (
              <div id="modal" className="modal show">
                <div className="modal-content">
                  <span className="close" onClick={() => setShowModal(false)}>
                    &times;
                  </span>
                  <h2>
                    Room ID:
                    <p id="room-id">123456</p>
                  </h2>
                </div>
              </div>
            )} */}

            <div className="copyright-div input-div">
              <p>&copy; BoTing Chat App</p>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Createchat;
