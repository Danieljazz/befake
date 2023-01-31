import "./commentsSection.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Comment } from "../../components/Comment/Comment";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import { makeRequest } from "../../axiosRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
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
  const [commentDesc, setCommentDesc] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?postId=${postId}`).then((res) => {
      return res.data;
    })
  );
  const commentMutation = useMutation(
    (newComment) => {
      makeRequest.post("/comments", newComment);
    },
    {
      onSuccess: () => {
        setCommentDesc("");
        return queryClient.invalidateQueries(["comments"]);
      },
    }
  );
  const createComment = () => {
    commentMutation.mutate({
      commentPostId: postId,
      commentContent: commentDesc,
    });
  };
  return (
    <div className="comments-section">
      <div className="new-comment">
        <div className="user">
          <img src={user.profilePhoto} alt="" />
        </div>
        <input
          type="text"
          placeholder="Type comment"
          onChange={(e) => setCommentDesc(e.target.value)}
          value={commentDesc}
        />
        <button style={{ cursor: "pointer" }} onClick={createComment}>
          Send
        </button>
      </div>
      {data &&
        data.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </div>
  );
};
