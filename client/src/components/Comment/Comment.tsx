import "./comment.scss";

type CommentProp = {
  comment: {
    user: {
      id: string;
      profilePhoto: string;
      name: string;
    };
    commentContent: string;
    date: string;
  };
};

export const Comment = ({ comment }: CommentProp) => {
  return (
    <div className="comment">
      <div className="comment-content">
        <div className="user">
          <img src={`${comment.user.profilePhoto}`} alt="" />
        </div>
        <div>
          <b>
            <span>{comment.user.name}</span>
          </b>
          <p>{comment.commentContent}</p>
        </div>
      </div>
      <span>{comment.date}</span>
    </div>
  );
};
