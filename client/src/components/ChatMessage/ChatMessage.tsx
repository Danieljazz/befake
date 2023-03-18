import { useContext } from "react";
import "./chatmessage.scss";
import { AuthContext } from "../../context/authContext";

type Message = {
  profilePhoto: string;
  userId: number;
  message: string;
};

const ChatMessage = ({ profilePhoto, userId, message }: Message) => {
  const { user } = useContext(AuthContext);

  return (
    <div
      className="msg"
      style={{ justifyContent: user.id === userId ? "flex-end" : "flex-start" }}
    >
      {user.id !== userId && (
        <img src={profilePhoto} alt="" className="profile-photo" />
      )}
      <div className="msg-content">{message}</div>
    </div>
  );
};

export default ChatMessage;
