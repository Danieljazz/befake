import { useQuery } from "@tanstack/react-query";
import RecentChatTile from "../RecentChatTile/RecentChatTile";
import "./recentChats.scss";
import { makeRequest } from "../../axiosRequest";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NewChatModal from "../../components/NewChatModal/NewChatModal";
import UserSearchInput from "../../components/UserSearchInput/UserSearchInput";
import { v4 as uuidv4 } from "uuid";

type RecentChat = {
  receiverId: number;
  profilePhoto: string;
  name: string;
  surname: string;
  message: string;
  createdAt: Date;
};

const RecentChats = ({ onlineFriends, setActiveChat }) => {
  const { data, isLoading, error } = useQuery(["recentChats"], () =>
    makeRequest.get("/chats").then((res) => res.data)
  );
  const [openNewMessageModal, setOpenNewMessageModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (data) {
      setActiveChat(data[0]?.receiverId);
      navigate(`/chat/${data[0]?.receiverId}`);
    }
  }, [data]);

  return (
    <div className="chats">
      {openNewMessageModal && (
        <NewChatModal setOpenNewMessageModal={setOpenNewMessageModal} />
      )}
      <div className="header">
        <h1>Chats</h1>
        <BorderColorIcon
          style={{ cursor: "pointer" }}
          onClick={() => setOpenNewMessageModal((prev) => !prev)}
        />
      </div>
      <ul className="latest-chats">
        {data &&
          data?.map((recentChat: RecentChat) => (
            <Link
              to={`/chat/${recentChat.receiverId}`}
              style={{ textDecoration: "none" }}
              onClick={() => setActiveChat(recentChat.receiverId)}
            >
              <RecentChatTile
                key={recentChat.receiverId}
                profilePhoto={recentChat.profilePhoto}
                name={recentChat.name}
                surname={recentChat.surname}
                message={recentChat.message}
                createdAt={recentChat.createdAt}
                available={onlineFriends.includes(recentChat.receiverId)}
              />
            </Link>
          ))}
      </ul>
    </div>
  );
};

export default RecentChats;
