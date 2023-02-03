import "./post.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useContext, useState } from "react";
import { CommentsSection } from "../../components/CommentsSection/CommentSection";
import { makeRequest } from "../../axiosRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
export type PostType = {
  post: {
    id: string;
    name: string;
    surname: string;
    postContent: string;
    createdAt: string;
    postPhoto?: string;
    comments?: [
      {
        user: {
          id: string;
          profilePhoto: string;
          name: string;
        };
        commentContent: string;
        date: string;
      }
    ];
  };
};

type likesRes = {
  isLoading: boolean;
  error: unknown;
  data: string[];
};

export const Post = ({ post }: PostType) => {
  const { user } = useContext(AuthContext);
  const [openComments, setOpenComments] = useState<boolean>();
  const queryClient = useQueryClient();
  const changeCommentsView = () => {
    setOpenComments(!openComments);
  };
  const { isLoading, error, data } = useQuery(["postikes", post.id], () =>
    makeRequest.get(`/likes/posts?postId=${post.id}`).then((res) => {
      return res.data;
    })
  );
  console.log(data);
  const likeMutation = useMutation(
    (liked) => {
      if (liked) return makeRequest.post("/likes/posts", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["/likes/posts"]);
      },
    }
  );
  const likeHandle = () => {
    likeMutation.mutate(data?.some((e) => e.likedUserId === user.id));
  };

  return (
    <div className="post">
      <section className="post-top">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="details">
            <span className="name">{`${post.name} ${post.surname}`}</span>
            <span className="date">{post.createdAt}</span>
          </div>
        </div>
        <MoreHorizOutlinedIcon />
      </section>
      <div className="post-content">
        <span>{post.postContent}</span>
        {post.postPhoto && <img src={post.postPhoto} alt="" />}
      </div>
      <div className="action-section">
        {data?.some((e) => e.likedUserId === user.id) ? (
          <ThumbUpOutlinedIcon
            name="true"
            style={{ color: "red", cursor: "pointer" }}
            onClick={likeHandle}
          />
        ) : (
          <ThumbUpOutlinedIcon
            style={{ cursor: "pointer" }}
            name="false"
            onClick={likeHandle}
          />
        )}
        "Like" {data?.length}
        <button className="comments" onClick={changeCommentsView}>
          <ModeCommentOutlinedIcon /> Comments
        </button>
        <button className="share">
          <ShareOutlinedIcon /> Share
        </button>
      </div>
      {openComments && <CommentsSection postId={post.id} />}
    </div>
  );
};
