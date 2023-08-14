import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const moment = require("moment");

function LeftChat({
  roomid,
  userid,
  roomname,
  username,
  createat,
  socket,
  roomid2,
}) {
  const [members, setmembers] = useState([]);
  let navigate = useNavigate();
  const timeString = moment(createat).format("h:mm A");
  const handleleave = () => {
    socket.emit("leaveroom", roomid2, userid);
    navigate("/");
  };

  useEffect(() => {
    // Attach the event listener once
    const receiveMessageListener = (data) => {
      setmembers([...data]);
    };
    socket.on("SendUSERS", receiveMessageListener);
  }, [socket]);
  function copyToClipboard(text) {
    const tempInput = document.createElement("input");
    tempInput.value = text;
    document.body.appendChild(tempInput);
    tempInput.select();
    document.execCommand("copy");
    document.body.removeChild(tempInput);
  }

  return (
    <>
      <div className="leftcontainer">
        <div className="lefttopcontainer">
          <h2>Room Details</h2>

          <div className="room-info">
            <p>
              <strong>
                <i className="fas fa-hashtag"></i> Room ID:
              </strong>{" "}
              <span id="room-id">{roomid}</span>
              <span id="copy">
                <i
                  class="fa fa-copy"
                  onClick={() => copyToClipboard(roomid)}></i>
              </span>
            </p>

            <p>
              <strong>
                <i className="fas fa-home"></i> Room Name:
              </strong>{" "}
              <span id="room-name">{roomname}</span>
            </p>
            <p>
              <strong className="ds-items">
                <i className="fas fa-info-circle"></i> Created By :
              </strong>{" "}
              <span id="room-description">{username}</span>
            </p>
            <p>
              <strong>
                <i className="far fa-calendar-alt"></i> Created at:
              </strong>{" "}
              <span id="room-created">{timeString}</span>
            </p>
          </div>

          <button id="leave-room-btn" onClick={handleleave}>
            Leave Room
          </button>
        </div>

        <div className="leftbottomcontainer">
          <h2>
            <i className="fa-solid fa-users"></i> User
          </h2>
          {members.length > 0 &&
            members.map((item) => {
              return (
                <div className="user-info" key={item.id}>
                  <div className="user-pic">
                    <div
                      className="profile-picture"
                      style={{ backgroundColor: item.color }}>
                      {" "}
                      <i className="fa-solid fa-user-secret"></i>
                    </div>
                    <h3>{item.username}</h3>
                  </div>
                  <p>JOINED</p>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default LeftChat;
