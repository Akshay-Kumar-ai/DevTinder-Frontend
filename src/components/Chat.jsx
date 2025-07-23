import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Base_Url } from "../utils/constants";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((appStore) => appStore.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  const lastName = user?.lastName;
  console.log(messages);

  const fetchChatMessages = async () => {
    const chat = await axios.get(Base_Url + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessages = chat?.data?.messages.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
      };
    });
    setMessages(chatMessages);
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + ":" + text);
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col w-3/5 mx-auto h-[70vh] border border-gray-300">
      <h1 className="text-xl font-semibold p-2 border">Chat</h1>
      <div className="flex-1 overflow-scroll  p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              <div
                key={index}
                className={
                  "chat " +
                  (firstName === msg.firstName ? "chat-end" : "chat-start")
                }
              >
                <div className="chat-header">
                  {msg.firstName + " " + msg.lastName}
                </div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="p-2 border flex justify-between">
        <input
          type="text"
          placeholder="Type here"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className=" border border-gray-200 w-full px-2 "
        />
        <button onClick={sendMessage} className="btn bg-green-700 mx-2">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
