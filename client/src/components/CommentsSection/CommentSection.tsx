import "./commentsSection.scss";
import { AuthContext } from "../../context/authContext";
import { useContext } from "react";
import { Comment } from "../../components/Comment/Comment";
import indicator from "../../assets/indicator.gif";
import { makeRequest } from "../../axiosRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { CommentProp } from "../Comment/Comment";

type CommentSectionType = {
  postId: number;
};

type newCommentType = {
  commentPostId: number;
  commentContent: string;
};
export const CommentsSection = ({ postId }: CommentSectionType) => {
  const { user } = useContext(AuthContext);
  const [commentDesc, setCommentDesc] = useState("");
  const queryClient = useQueryClient();
  const { isLoading, error, data } = useQuery(["comments"], () =>
    makeRequest.get(`/comments?postId=${postId}`).then((res) => {
      return res.data;
    })
  );
  const commentMutation = useMutation(
    ({ commentPostId, commentContent }: newCommentType) =>
      makeRequest.post("/comments", {
        commentPostId: commentPostId,
        commentContent: commentContent,
      }),
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
      {error ? (
        <div style={{ color: "red" }}>"Something went wrong"</div>
      ) : isLoading ? (
        <img src={indicator} width={40} style={{ margin: "10px 20px" }} />
      ) : (
        data &&
        data.map((comment: CommentProp) => (
          <Comment key={comment.id} {...comment} />
        ))
      )}
    </div>
  );
};
