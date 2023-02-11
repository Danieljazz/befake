import "./post.scss";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import { useContext, useState } from "react";
import { CommentsSection } from "../../components/CommentsSection/CommentSection";
import { makeRequest } from "../../axiosRequest";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { AuthContext } from "../../context/authContext";
import moment from "moment";
import DeleteDropdown from "../DeleteModal/DeleteDropdown";
export type PostType = {
  post: {
    id: number;
    userId: number;
    name: string;
    surname: string;
    postContent: string;
    createdAt: Date;
    postPhoto?: string;
    profilePhoto?: string;
  };
};

type PostLikesType = {
  id: number;
  likedPostId: number;
  likedUserId: number;
  name: string;
  surname: string;
};

export const Post = ({ post }: PostType) => {
  const { user } = useContext(AuthContext);
  const [openComments, setOpenComments] = useState<boolean>(false);
  const [openOptions, setOpenOptions] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const changeCommentsView = () => {
    setOpenComments(!openComments);
  };
  const { isLoading, error, data } = useQuery(["postlikes", post.id], () =>
    makeRequest.get(`/postlikes?postId=${post.id}`).then((res) => {
      return res.data;
    })
  );
  const likeMutation = useMutation(
    (liked: boolean) => {
      if (liked) return makeRequest.delete(`/postlikes?postId=${post.id}`);
      return makeRequest.post("/postlikes", { postId: post.id });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["postlikes"]);
      },
    }
  );
  const likeHandle = () => {
    likeMutation.mutate(
      data?.some((e: PostLikesType) => e.likedUserId === user.id)
    );
  };
  return (
    <div className="post">
      <section className="post-top">
        <div className="user">
          <img src={post.profilePhoto} alt="" />
          <div className="details">
            <span className="name">{`${post.name} ${post.surname}`}</span>
            <span className="date">{moment(post.createdAt).fromNow()}</span>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignContent: "flex-start",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {user.id === post.userId && (
            <button onClick={() => setOpenOptions((prev) => !prev)}>
              <MoreHorizOutlinedIcon />
            </button>
          )}
          {openOptions && <DeleteDropdown postId={post.id} />}
        </div>
      </section>
      <div className="post-content">
        <span>{post.postContent}</span>
        {post.postPhoto && <img src={post.postPhoto} alt="" />}
      </div>
      <div className="action-section">
        <button>
          {data?.some((e: PostLikesType) => e.likedUserId === user.id) ? (
            <FavoriteIcon
              name="true"
              style={{ color: "red", cursor: "pointer" }}
              onClick={likeHandle}
            />
          ) : (
            <FavoriteBorderIcon
              style={{ cursor: "pointer" }}
              name="false"
              onClick={likeHandle}
            />
          )}
          "Like" {data?.length}
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
