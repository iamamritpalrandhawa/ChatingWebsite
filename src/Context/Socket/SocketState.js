import { useEffect } from "react";
import SocketContext from "./SocketContext";

import { io } from "socket.io-client";

const SocketState = (props) => {
  const socket = io("http://localhost:5000");

  socket.on("USERID", (id) => {
    if (localStorage.getItem("key") === null) {
      localStorage.setItem("key", id);
      socket.emit("ID", localStorage.getItem("key"));
    }
  });

  const check = () => {
    if (localStorage.getItem("key") !== null) {
      socket.emit("ID", localStorage.getItem("key"));
    }
  };
  check();

  return (
    <SocketContext.Provider value={{}}>{props.children}</SocketContext.Provider>
  );
};

export default SocketState;
