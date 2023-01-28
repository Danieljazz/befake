import "./posts.scss";
import { Post } from "../Post/Post";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
import { PostType } from "../Post/Post";
import { FormEvent, useContext, useState } from "react";
import { AuthContext } from "../../context/authContext";

export const Posts = () => {
  const { user } = useContext(AuthContext);
  const [desc, setDesc] = useState("");
  const [photo, setPhoto] = useState(null);
  const [createError, setCreateError] = useState(null);
  const { isLoading, error, data } = useQuery(["posts"], () =>
    makeRequest.get<PostType["post"][]>("/posts").then((res) => {
      return res.data;
    })
  );
  //console.log(data); // TODO: Remove
  const postChange = (e: FormEvent) => {
    const target = e.target as HTMLInputElement;
    setDesc(target.value);
  };
  const createPost = () => {
    makeRequest
      .post("/posts", { postContent: desc, postPhoto: photo })
      .then((res) => setCreateError(null))
      .catch((err) => setCreateError(err));
  };
  return (
    <div className="posts">
      <div className="new-post">
        <section className="post-top">
          <div className="user">
            <img src={user.profilePhoto} alt="" />
          </div>
          <input type="text" placeholder="Type smth" onChange={postChange} />
        </section>
        <div className="action-section">
          <button className="share" onClick={createPost}>
            Share
          </button>
          {createError && <div style={{ color: "red" }}>Smth went wrong..</div>}
        </div>
      </div>
      {error ? (
        "Something went wrong"
      ) : isLoading ? (
        "Loading"
      ) : data ? (
        data.map((item: PostType["post"]) => <Post post={item} key={item.id} />)
      ) : (
        <div>Nothing is here</div>
      )}
    </div>
  );
};
