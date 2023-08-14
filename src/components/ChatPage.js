import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CSS/chat.css";
import LeftChat from "./LeftChat";
import RightChat from "./RightChat";

function ChatPage({ logo, socket }) {
  let navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [userid, setUserid] = useState("");
  const [roomid, setRoomid] = useState("");
  const [roomname, setRoomname] = useState("");
  const [link, setlink] = useState("");
  const [createat, setcreateat] = useState("");
  const [color, setcolor] = useState("");
  useEffect(() => {
    // Attach the event listener once
    const receiveMessageListener = (obj) => {
      if (obj.success === false) {
        navigate("/joinchat");
      } else {
        setRoomid(obj.roomid);
        setUserid(obj.userid);
        setUsername(obj.username);
        setRoomname(obj.roomname);
        setlink(obj.link);
        setcreateat(obj.createat);
        setcolor(obj.color);
      }
    };

    socket.on("RoomDetail", receiveMessageListener);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("RoomDetail", receiveMessageListener);
    };
  }, [socket]);

  useEffect(() => {
    let timeout;

    if (roomid === "") {
      timeout = setTimeout(() => {
        navigate("/");
      }, 3000); // Navigate after 3 seconds of the field being empty
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [roomid, navigate]);

  return (
    <>
      <div className="maincontainer">
        <LeftChat
          roomid={link}
          userid={userid}
          roomname={roomname}
          username={username}
          createat={createat}
          socket={socket}
          roomid2={roomid}
        />
        {/* socket={props.socket} */}
        <RightChat
          logo={logo}
          socket={socket}
          userid={userid}
          username={username}
          room={roomid}
          color={color}
        />
      </div>
    </>
  );
}

export default ChatPage;
