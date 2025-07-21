import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((appStore) => appStore.user);
  const userId = user?._id;
  const firstName = user?.firstName;
  console.log(targetUserId);

  useEffect(() => {
    if (!userId) return;
    const socket = createSocketConnection();
    socket.emit("joinChat", { firstName, userId, targetUserId });

    socket.on("messageReceived", ({ firstName, text }) => {
      console.log(firstName + ":" + text);
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-[70vh] border border-gray-300">
      <h1>Chat</h1>
      <div className="flex-1 overflow-scroll  p-5">
        {messages.map((msg, index) => {
          return (
            <div key={index}>
              {/* <div className="chat chat-start">
                <div className="chat-bubble">{msg.text}</div>
              </div> */}
              <div key={index} className="chat chat-start">
                <div className="chat-header">{msg.firstName}</div>
                <div className="chat-bubble">{msg.text}</div>
              </div>
            </div>
          );
        })}
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
    </div>
  );
};

export default Chat;
