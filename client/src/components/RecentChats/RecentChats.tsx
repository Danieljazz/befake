import { useQuery } from "@tanstack/react-query";
import RecentChatTile from "../RecentChatTile/RecentChatTile";
import "./recentChats.scss";
import { makeRequest } from "../../axiosRequest";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import NewChatModal from "../../components/NewChatModal/NewChatModal";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

type RecentChat = {
  receiverId: number;
  profilePhoto: string;
  name: string;
  surname: string;
  message: string;
  createdAt: Date;
};

type RecentChatsType = {
  onlineFriends: Number[];
  setActiveChat: React.Dispatch<React.SetStateAction<Number | null>>;
};

const RecentChats = ({ onlineFriends, setActiveChat }: RecentChatsType) => {
  const { data, isLoading, error } = useQuery(["recentChats"], () =>
    makeRequest.get("/chats").then((res) => res.data)
  );
  const { receiverId } = useParams();
  const [openNewMessageModal, setOpenNewMessageModal] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (data && receiverId == null) {
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
      {isLoading ? (
        <LoadingIndicator />
      ) : (
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
      )}
    </div>
  );
};

export default RecentChats;
