import { Link } from "react-router-dom";
import "./comment.scss";
import moment from "moment";
export type CommentProp = {
  id: number;
  commentPostId: number;
  commentUserId: number;
  commentContent: string;
  commentLikes?: unknown; //TODO: Change to likes type
  createdAt: Date;
  name: string;
  surname: string;
  profilePhoto: string;
};

export const Comment = ({
  id,
  commentPostId,
  commentUserId,
  commentContent,
  commentLikes,
  createdAt,
  name,
  surname,
  profilePhoto,
}: CommentProp) => {
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="user">
          <Link to={`/profile/${commentUserId}`}>
            <img
              src={`${
                profilePhoto
                  ? profilePhoto
                  : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              }`}
              alt=""
            />
          </Link>
        </div>
        <div>
          <b>
            <span>{`${name} ${surname}`} </span>
          </b>
          <p>{commentContent}</p>
        </div>
      </div>
      <span>{moment(createdAt).fromNow()}</span>
    </div>
  );
};
