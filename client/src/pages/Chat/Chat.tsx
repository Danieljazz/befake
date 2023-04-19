import "./chat.scss";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import RecentChats from "../../components/RecentChats/RecentChats";
import { useLocation, useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
import { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { AuthContext } from "../../context/authContext";
import { useRef } from "react";

type ChatMessage = {
  message: string;
  id: number;
  senderId: number;
  profilePhoto: string;
  newMessage?: string;
};

const Chat = () => {
  const ENDPOINT = "https://befake.danielsprojects.com.pl";
  const socket = useRef(socketIOClient(ENDPOINT));
  const { user } = useContext(AuthContext);
  const [userFriends, setUserFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  useEffect(() => {
    socket.current.emit("addActiveUser", user.id);
    makeRequest
      .get(`/relationships?userId=${user.id}`)
      .then((res) => setUserFriends(res.data));
  }, []);

  const getOnlineFriends = () => {
    socket.current.emit("areMyFriendsOnline", userFriends);
    socket.current.on("areMyFriendsOnlineResponse", (activeUsers) => {
      setOnlineFriends(activeUsers);
    });
  };

  useEffect(() => {
    getOnlineFriends();
  }, [socket, userFriends]);

  useEffect(() => {
    const interval = setInterval(() => getOnlineFriends(), 60000);

    return () => clearInterval(interval);
  }, []);

  const { receiverId } = useParams();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState<ChatMessage["message"]>("");
  const { data, error, isLoading, refetch } = useQuery(["chat"], () =>
    makeRequest.get(`/chats/${receiverId}`).then((res) => res.data)
  );
  const { data: receiverProfile, refetch: refetchProfile } = useQuery(
    ["user"],
    () =>
      makeRequest
        .get(`/users/find?userId=${receiverId}`)
        .then((res) => res.data)
  );

  const chatMutate = useMutation(
    (message) => makeRequest.post(`/chats/${receiverId}`, message),
    {
      onSuccess: () => {
        setNewMessage("");
        return queryClient.invalidateQueries(["chat"]);
      },
    }
  );
  useEffect(() => {
    refetch();
    refetchProfile();
  }, [receiverId]);
  return (
    <div className="chat-page">
      <div>
        <RecentChats onlineFriends={onlineFriends} />
      </div>
      <div className="messages">
        <div className="msg-container-header">
          <div className="msg-receiver">
            <img
              src={receiverProfile?.profilePhoto}
              alt=""
              className="profile-photo"
            />
            <div className="receiver-info">
              <h4>{`${receiverProfile?.name} ${receiverProfile?.surname}`}</h4>
              <span>
                {"Available" && onlineFriends.includes(receiverProfile?.id)}
              </span>
            </div>
          </div>
        </div>
        <div className="msg-container-content">
          {data &&
            data?.map((message: ChatMessage) => (
              <ChatMessage
                key={message.id}
                profilePhoto={message.profilePhoto}
                senderId={message.senderId}
                message={message.message}
              />
            ))}
        </div>
        <div className="new-msg">
          <input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={() => chatMutate.mutate({ message: newMessage })}>
            <SendOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
