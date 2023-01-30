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
          <img
            src={`${
              comment.profilePhoto
                ? comment.profilePhoto
                : "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
            }`}
            alt=""
          />
        </div>
        <div>
          <b>
            <span>{`${comment.name} ${comment.surname}`} </span>
          </b>
          <p>{comment.commentContent}</p>
        </div>
      </div>
      <span>{comment.createdAt}</span>
    </div>
  );
};
