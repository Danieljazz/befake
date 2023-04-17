import moment from "moment";
import "./recentChatTile.scss";
type Chat = {
  profilePhoto: string;
  name: string;
  surname: string;
  message: string;
  createdAt: Date;
  available: boolean;
};
const RecentChatTile = ({
  profilePhoto,
  name,
  surname,
  message,
  createdAt,
  available,
}: Chat) => {
  return (
    <li className="latest-chat">
      <div>
        <img src={profilePhoto} alt="" className="profile-photo" />
        {available && <div className="available"></div>}
      </div>
      <div className="message-content">
        <h4>{`${name} ${surname}`}</h4>
        <span>{message}</span>
      </div>

      <span className="last-msg-date">{moment(createdAt).fromNow()}</span>
    </li>
  );
};
export default RecentChatTile;
