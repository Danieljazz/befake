import { useQuery } from "@tanstack/react-query";
import RecentChatTile from "../RecentChatTile/RecentChatTile";
import "./recentChats.scss";
import { makeRequest } from "../../axiosRequest";
import { Link } from "react-router-dom";

const RecentChats = () => {
  const { data, isLoading, error } = useQuery(["recentChats"], () =>
    makeRequest.get("/chats").then((res) => res.data)
  );
  return (
    <div className="chats">
      <h1>Chats</h1>
      <ul className="latest-chats">
        {data &&
          data?.map((user) => (
            <Link
              to={`/chat/${user.receiverId}`}
              style={{ textDecoration: "none" }}
            >
              <RecentChatTile
                profilePhoto={user.profilePhoto}
                name={user.name}
                surname={user.surname}
                message={user.message}
                createdAt={user.createdAt}
              />
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default RecentChats;
