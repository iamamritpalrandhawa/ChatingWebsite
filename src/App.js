import "./components/Navbar";
import Navbar from "./components/Navbar";
import logo from "./components/CSS/fire.png";
import ContainerB from "./components/ContainerB";
import Footer from "./components/Footer";
import JoinChat from "./components/joinChat";
import Createchat from "./components/Createchat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeContianer from "./components/HomeContianer";
import ChatPage from "./components/ChatPage";

import io from "socket.io-client";
import { useEffect } from "react";

// import SocketState from "./Context/Socket/SocketState";

// const socket = io.connect("http://localhost:5000");
const socket = io.connect("https://boting-chat-4bac28e35f1f.herokuapp.com/");

function App() {
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
  useEffect(() => {
    check();
  }, []);

  return (
    <>
      {/* <SocketState> */}
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Navbar logo={logo} />
                <HomeContianer />
                <ContainerB />
                <Footer />
              </>
            }></Route>
          <Route
            path="/joinchat"
            element={
              <>
                <JoinChat
                  socket={socket}
                  // setRoom={setRoom}
                  // joinRoom={joinRoom}
                  // setUsername={setUsername}
                />
              </>
            }></Route>
          <Route
            path="/createchat"
            element={
              <>
                <Createchat socket={socket} />
              </>
            }></Route>
          <Route
            path="/chat"
            element={
              // socket={socket}
              <>
                <ChatPage
                  logo={logo}
                  socket={socket}
                  // username={username}
                  // room={room}
                />
              </>
            }></Route>
        </Routes>
      </BrowserRouter>
      {/* </SocketState> */}
    </>
  );
}

export default App;
