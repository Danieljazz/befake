import "./post.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useState } from "react";
import { CommentsSection } from "../../components/CommentsSection/CommentSection";
import { makeRequest } from "../../axiosRequest";
import { useQuery } from "@tanstack/react-query";
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
  const [openComments, setOpenComments] = useState<boolean>();
  const changeCommentsView = () => {
    setOpenComments(!openComments);
  };
  const { isLoading, error, data } = useQuery(["postikes", post.id], () =>
    makeRequest.get(`/likes/posts?postId=${post.id}`).then((res) => {
      return res.data;
    })
  );
  console.log(data);
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
        <button className="like" style={{}}>
          <ThumbUpOutlinedIcon /> Like {data ? data?.length : "ih"}
        </button>
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
