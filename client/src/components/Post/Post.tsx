import "./post.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useState } from "react";
import { CommentsSection } from "../../components/CommentsSection/CommentSection";
type PostType = {
  post: {
    user: string;
    postContent: string;
    date: string;
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

export const Post = ({ post }: PostType) => {
  const [openComments, setOpenComments] = useState<boolean>();
  return (
    <div className="post">
      <section className="post-top">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <div className="details">
            <span className="name">Jane Doe</span>
            <span className="date">{post.date}</span>
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
          <ThumbUpOutlinedIcon /> Like
        </button>
        <button
          className="comments"
          onClick={() => setOpenComments(!openComments)}
        >
          <ModeCommentOutlinedIcon /> Comments
        </button>
        <button className="share">
          <ShareOutlinedIcon /> Share
        </button>
      </div>
      {openComments && <CommentsSection comments={post.comments} />}
    </div>
  );
};