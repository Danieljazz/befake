import { useContext } from "react";
import "./chatmessage.scss";
import { AuthContext } from "../../context/authContext";

type Message = {
  profilePhoto: string;
  senderId: number;
  message: string;
};

const ChatMessage = ({ profilePhoto, senderId, message }: Message) => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="msg"
      style={{
        justifyContent: user.id === senderId ? "flex-end" : "flex-start",
      }}
    >
      {user.id !== senderId && (
        <img src={profilePhoto} alt="" className="profile-photo" />
      )}
      <div className="msg-content">{message}</div>
    </div>
  );
};

export default ChatMessage;
