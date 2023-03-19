import moment from "moment";
import "./recentChatTile.scss";
type Chat = {
  profilePhoto: string;
  name: string;
  surname: string;
  message: string;
  createdAt: Date;
};
const RecentChatTile = ({
  profilePhoto,
  name,
  surname,
  message,
  createdAt,
}: Chat) => {
  return (
    <li className="latest-chat">
      <img src={profilePhoto} alt="" className="profile-photo" />
      <div className="message-content">
        <h4>{`${name} ${surname}`}</h4>
        <span>{message}</span>
      </div>
      <span className="last-msg-date">{moment(createdAt).fromNow()}</span>
    </li>
  );
};
export default RecentChatTile;
