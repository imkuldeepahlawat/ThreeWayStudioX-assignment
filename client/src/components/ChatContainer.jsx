import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";
const socket = io.connect("http://localhost:8082");

const ChatContainer = () => {
  const mainRoom = useSelector((state) => state.orderId);
  //Room State
  const [room, setRoom] = useState(mainRoom);

  // Messages States
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const joinRoom = () => {
    if (room !== "") {
      socket.emit("join_room", room);
    }
  };
  const sendMessage = () => {
    socket.emit("send_message", { message, room });
    setMessage('')
  };
  useEffect(() => {
    joinRoom();
  }, []);
  useEffect(() => {}, [mainRoom]);
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
    });
  }, [socket]);
  return (
    <div className="w-[80vw] h-[90vh]">
      {/* show chat */}
      <div className="  h-[90%] bg-slate-400">
        <h1> Message:</h1>
        {messageReceived}
      </div>
      {/* chatfooter */}
      <div className="h-[10%] flex">
        <input
          type="text"
          value={message}
          onChange={(e) => {
            setMessage(e.target.value);
          }}
        />
        <button onClick={sendMessage}>send</button>
      </div>
    </div>
  );
};

export default ChatContainer;
