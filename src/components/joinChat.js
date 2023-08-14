import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/joinChat.css";
function JoinChat({ socket }) {
  let navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomid, setRoomid] = useState("");
  const [color, setColor] = useState("#000000");
  const handleJoinRoom = () => {
    if (username !== "" && roomid !== "" && color !== "") {
      socket.emit("joinRoom", {
        id: localStorage.getItem("key"),
        link: roomid,
        username: username,
        color: color,
      });
      // joinRoom();
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
            <form action="">
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
                  placeholder="Enter Room ID"
                  onChange={(e) => {
                    setRoomid(e.target.value);
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
                <button className="bttn" onClick={handleJoinRoom}>
                  Join Chat
                </button>
              </div>
              <div className="copyright-div input-div">
                <p>&copy; BoTing Chat App</p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default JoinChat;
