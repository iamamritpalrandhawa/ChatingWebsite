import React from "react";
import "./CSS/style.css";

function ContainerB() {
  return (
    <div className="container-b">
      <div className="container-b-content">
        <h2>Free Online Chat Rooms: Talk with friends anonymously</h2>
        <p>
          Hey there! 👋 Looking for a fun and casual way to chat with friends?
          We got your back with free
          <br />
          chat rooms where you can talk to people anonymously without
          registration.
        </p>
      </div>
      <div className="card-container">
        <div className="card">
          <div className="card-body">
            <div className="card-logo">
              <i className="fa-solid fa-jet-fighter-up"></i>
            </div>
            <div className="card-content">
              <h2 className="card-heading">Quick and Easy</h2>
              <p>
                Choose a username and start chatting right away. No need to sign
                up and no email required.
              </p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            <div className="card-logo">
              <i className="fa-solid fa-bullhorn"></i>
            </div>
            <div className="card-content">
              <h2 className="card-heading">Free Chat Rooms</h2>
              <p>
                Boting is free to use for everyone and will always be free,
                without any hidden costs or fees.
              </p>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="card-logo">
              <i className="fa-solid fa-square-check"></i>
            </div>
            <div className="card-content">
              <h2 className="card-heading">Anonymous Chat</h2>
              <p>
                Chats are completely anonymous. No personal info is collected
                and all messages are encrypted.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContainerB;
