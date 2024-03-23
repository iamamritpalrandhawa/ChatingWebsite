import React, { useEffect, useState, useRef } from "react";
import SongSearchResult from "./SongSearchResult";
import Picker from 'emoji-picker-react';

function RightChat({ logo, socket, username, userid, room, color }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const chatContainerRef = useRef(null);

  const sendMessage = async () => {
    const dateTime = new Date();

    const year = dateTime.getFullYear();
    const month = String(dateTime.getMonth() + 1).padStart(2, "0");
    const day = String(dateTime.getDate()).padStart(2, "0");
    const hours = String(dateTime.getHours()).padStart(2, "0");
    const minutes = String(dateTime.getMinutes()).padStart(2, "0");
    const seconds = String(dateTime.getSeconds()).padStart(2, "0");
    const milliseconds = String(dateTime.getMilliseconds()).padStart(3, "0");

    const formattedTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
    if (currentMessage !== "") {
      const messageData = {
        userid: localStorage.getItem("key"),
        // userid: userid,
        room: room,
        author: username,
        message: currentMessage,
        color: color,
        // time:
        //   new Date(Date.now()).getHours() +
        //   ":" +
        //   new Date(Date.now()).getMinutes(),
        time: formattedTime,
      };

      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    // Attach the event listener once
    const receiveMessageListener = (data) => {
      setMessageList((list) => [...list, data]);
    };

    socket.on("receive_message", receiveMessageListener);

    // Clean up the event listener when the component unmounts
    return () => {
      socket.off("receive_message", receiveMessageListener);
    };
  }, [socket]);

  useEffect(() => {
    // Scroll to the bottom of the chat container when messageList changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  const handleUser = () => {
    if (document.getElementsByClassName("leftbottomcontainer")[0].style.display === "block") {
      document.getElementsByClassName("leftbottomcontainer")[0].style.display = "none"
    }
    else {
      document.getElementsByClassName("lefttopcontainer")[0].style.display = "none"
      document.getElementsByClassName("leftbottomcontainer")[0].style.display = "block"
    }
  }
  const handleInfo = () => {
    if (document.getElementsByClassName("lefttopcontainer")[0].style.display === "block") {
      document.getElementsByClassName("lefttopcontainer")[0].style.display = "none"
    }
    else {
      document.getElementsByClassName("leftbottomcontainer")[0].style.display = "none"
      document.getElementsByClassName("lefttopcontainer")[0].style.display = "block"
    }
  }
  const [chosenEmoji, setChosenEmoji] = useState(null);

  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);
    setCurrentMessage(currentMessage + event.emoji)
  };
  const [showemoji, setShowemoji] = useState(false)
  const handleEmoji = () => {
    setShowemoji(!showemoji)
  }

  return (
    <>
      <div className="rightcontainer">
        <div className="righttopcontainer">
          <div className="containera">
            <div className="logo-name-div" id="logo">
              <div className="logo">
                <img src={logo} alt="" />
              </div>
              <div className="site-name">
                <h2>BoTing Chat App</h2>
              </div>
            </div>
            <div className="user-pic">
              <div
                className="profile-picture"
                style={{ backgroundColor: color }}>
                {" "}
                <i className="fa-solid fa-user-secret"></i>
              </div>
              <h3>{username}</h3>
            </div>
            <div className="" id="info">
              <span onClick={handleUser}>
                <i className="fa-solid fa-users"></i>
              </span>
              <span onClick={handleInfo}>
                <i className="fas fa-info-circle"></i>
              </span>
            </div>

          </div>
        </div>
        <div className="rightcentercontainer">
          <div className="message-container" ref={chatContainerRef}>
            {messageList.map((messageContent) => {
              return (
                <div
                  key={messageContent.id}
                  className={`message-${
                    // userid === messageContent.userid
                    localStorage.getItem("key") === messageContent.userid
                      ? "right"
                      : "left"
                    }`}>
                  <div className="user-profile">
                    <div
                      className={`profile-pic-${
                        // userid === messageContent.userid
                        localStorage.getItem("key") === messageContent.userid
                          ? "right"
                          : "left"
                        }`}
                      style={{ backgroundColor: messageContent.color }}>
                      {" "}
                      <i className="fa-solid fa-user-secret"></i>
                    </div>
                    <div className="message-con">
                      <h3>{messageContent.author}</h3>
                      {messageContent.message.startsWith("#song") ? (
                        <p>
                          <SongSearchResult
                            songName={messageContent.message.slice(6)}
                          />
                        </p>
                      ) : (
                        <p>{messageContent.message}</p>
                      )}
                      {(() => {
                        const messageTime = new Date(messageContent.time);
                        const hours = messageTime.getHours();
                        const minutes = messageTime.getMinutes();
                        const amOrPm = hours >= 12 ? "PM" : "AM";
                        const formattedHours =
                          hours % 12 === 0 ? 12 : hours % 12;

                        return (
                          <p className="message-time-left">
                            <b>
                              {formattedHours}:
                              {minutes.toString().padStart(2, "0")} {amOrPm}
                            </b>
                          </p>
                        );
                      })()}
                      {/* <p className="message-time-left">{messageContent.time}</p> */}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rightbottomcontainer">
          <div className="message-input">
            <input
              type="text"
              placeholder="Write your message"
              value={currentMessage}
              onChange={(event) => {
                setCurrentMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                event.key === "Enter" && sendMessage();
              }}
            />
            <i className="fa fa-smile" id="emoji" onClick={handleEmoji} ></i>

            <button onClick={sendMessage}>
              <i className="fa fa-paper-plane"></i> Send
            </button>
          </div>
        </div>
        {showemoji && <div style={{ width: "100%", height: "50%" }}>
          <Picker style={{ width: "100%" }} onEmojiClick={onEmojiClick} />
        </div>}
      </div>
    </>
  );
}

export default RightChat;
