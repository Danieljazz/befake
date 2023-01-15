import "./commentsSection.scss";
import { AuthContext } from "../../context/authContex";
import { useContext } from "react";
import { Comment } from "../../components/Comment/Comment";
export const CommentsSection = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="comments-section">
      <div className="new-comment">
        <div className="user">
          <img src={user.profilePhoto} alt="" />
        </div>
        <input type="text" placeholder="Type comment" />
        <button>Send</button>
      </div>
      <Comment />
    </div>
  );
};
