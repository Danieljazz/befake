import "./commentsSection.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Comment } from "../../components/Comment/Comment";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { makeRequest } from "../../axiosRequest";
import { useQuery } from "@tanstack/react-query";
type CommentsProps = {
  comments?: [
    {
      user: {
        id: string;
        profilePhoto?: string;
        name: string;
      };
      commentContent: string;
      date: string;
    }
  ];
};

export const CommentsSection = ({ postId }: string) => {
  const { user } = useContext(AuthContext);
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?postId=${postId}`).then((res) => {
      return res.data;
    })
  );
  return (
    <div className="comments-section">
      <div className="new-comment">
        <div className="user">
          <img src={user.profilePhoto} alt="" />
        </div>
        <input type="text" placeholder="Type comment" />
        <button>Send</button>
      </div>
      {data &&
        data.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
};
