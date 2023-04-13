import { useQuery } from "@tanstack/react-query";
import RecentChatTile from "../RecentChatTile/RecentChatTile";
import "./recentChats.scss";
import { makeRequest } from "../../axiosRequest";
import { Link } from "react-router-dom";
import { UserContextType } from "../../context/authContext";

type RecentChat = {
  receiverId: number;
  profilePhoto: string;
  name: string;
  surname: string;
  message: string;
  createdAt: Date;
};

const RecentChats = () => {
  const { data, isLoading, error } = useQuery(["recentChats"], () =>
    makeRequest.get("/chats").then((res) => res.data)
  );
  return (
    <div className="chats">
      <h1>Chats</h1>
      <ul className="latest-chats">
        {data &&
          data?.map((recentChat: RecentChat) => (
            <Link
              to={`/chat/${recentChat.receiverId}`}
              style={{ textDecoration: "none" }}
            >
              <RecentChatTile
                profilePhoto={recentChat.profilePhoto}
                name={recentChat.name}
                surname={recentChat.surname}
                message={recentChat.message}
                createdAt={recentChat.createdAt}
              />
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default RecentChats;
