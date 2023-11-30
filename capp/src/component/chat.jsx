import React, { useEffect, useState, useRef } from "react";
import { username } from "./join";
import socketIO from "socket.io-client";
// import "./chat.css";
import Message from "./Message";
import Reactscroll from "react-scroll-to-bottom";
let socket;
const ENDPOINT = "http://localhost:4500/";
const Chat = () => {
  const [id, setid] = useState("");
  const [usermessage, setusermessage] = useState([]);
  const [name, setname] = useState("");
  const send = () => {
    const message = document.getElementById("chat-inbox").value;
    socket.emit("message", { message, id });
    document.getElementById("chat-inbox").value = "";
  };
  useEffect(() => {
    socket = socketIO(ENDPOINT, { transports: ["websocket"] });
    socket.on("connect", () => {
      alert("connected");
      setid(socket.id);
    });
    // console.log(socket);
    socket.emit("joined", { username });
    socket.on("welcome", (data) => {
      setusermessage([...usermessage, data]);
      console.log(data.user, data.message);
      // console.log(data);
    });
    socket.on("userJoined", (data) => {
      setusermessage([...usermessage, data]);
      console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setusermessage([...usermessage, data]);
      console.log(data.user, data.message);
      // console.log(data);
    });
    return () => {
      socket.emit("userDisconnect");
      socket.off();
    };
  }, []);
  useEffect(() => {
    socket.on("userJoined", (data) => {
      setusermessage([...usermessage, data]);
      // console.log(data.user, data.message);
    });
    socket.on("leave", (data) => {
      setusermessage([...usermessage, data]);
      // console.log(data.user, data.message);
      // console.log(data);
    });
    socket.on("sendMessage", (data) => {
      setusermessage([...usermessage, data]);
      // console.log(data.user, data.message, data.id);
      // console.log(data);
      setname(data.user);
    });

    return () => {
      socket.off();
    };
  }, [usermessage]);

  const chatContainerRef = useRef();

  useEffect(() => {
    // Scroll to the bottom when usermessage changes
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
  }, [usermessage]);


  return (
    <div className="bg-gray-800 text-white h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto" ref={chatContainerRef} >
        <Reactscroll className="chat">
          <div className="chat-head bg-gray-700 p-4"></div>
          <div className="chat-text p-4">
            {usermessage?.map((item, i) => (
              <Message
                message={item.message}
                classs={item.id === id ? "right" : "left"}
                user={item.id === id ? "You" : item.user}
                key={i}
              />
            ))}
          </div>
        </Reactscroll>
        <div className="chat-input bg-gray-700 p-4 flex items-center sticky bottom-0 right-0 left-0">
          <input
            id="chat-inbox"
            type="text"
            className="flex-1 bg-gray-900 text-white px-4 py-2 rounded-md focus:outline-none focus:ring focus:border-blue-300"
            placeholder="Enter your message"
            onKeyUp={(e) => (e.code === "Enter" ? send() : null)}
          />
          <button
            className="ml-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
            onClick={send}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
