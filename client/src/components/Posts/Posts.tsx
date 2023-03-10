import "./posts.scss";
import { Post } from "../Post/Post";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
import { PostType } from "../Post/Post";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";
import { useLocation } from "react-router-dom";

type NewPostType = {
  postContent: string;
  postPhoto: string | null;
};

type IProps = {
  userId: number;
};

export const Posts = ({ userId }: IProps) => {
  const { user } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [postError, setPostError] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const path = useLocation().pathname;
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest
      .get<PostType["post"][]>("/posts?userId=" + userId)
      .then((res) => {
        return res.data;
      })
  );
  const postChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setDesc(target.value);
  };

  const postMutation = useMutation(
    (newPost: NewPostType) => makeRequest.post("/posts", newPost),
    {
      onError: () => setPostError(true),
      onSuccess: () => {
        setDesc("");
        setPostError(false);
        return queryClient.invalidateQueries(["posts"]);
      },
    }
  );

  const createPost = (e: React.FormEvent) => {
    e.preventDefault();
    postMutation.mutate({ postContent: desc, postPhoto: photo });
  };
  return (
    <div className="posts">
      {!path.includes("profile") && (
        <div className="new-post">
          <section className="post-top">
            <div className="user">
              <img src={user.profilePhoto} alt="" />
            </div>
            <input
              type="text"
              placeholder={`What's on your mind ${user.name}`}
              name="status"
              onChange={postChange}
              value={desc}
            />
          </section>
          <div className="action-section">
            <button className="share" onClick={createPost}>
              Share
            </button>
            {postError && <div style={{ color: "red" }}>Smth went wrong..</div>}
          </div>
        </div>
      )}
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        "Loading"
      ) : data ? (
        data.map((item: PostType["post"]) => <Post post={item} key={item.id} />)
      ) : (
        <div>C'mon add smth</div>
      )}
    </div>
  );
};
