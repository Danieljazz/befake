import "./chat.scss";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import RecentChats from "../../components/RecentChats/RecentChats";
import { useParams } from "react-router-dom";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
import { useContext, useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { AuthContext } from "../../context/authContext";
import LoadingIndicator from "../../components/LoadingIndicator/LoadingIndicator";

type ChatMessage = {
  message: string;
  id: number;
  senderId: number;
  profilePhoto: string;
  newMessage?: string;
};

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [userFriends, setUserFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [activeChat, setActiveChat] = useState(null);
  const { receiverId } = useParams();
  useEffect(() => {
    const ENDPOINT = "https://befake-api.onrender.com";
    const socket = socketIOClient(ENDPOINT);
    socket.emit("addActiveUser", user.id);
    makeRequest
      .get(`/relationships?userId=${user.id}`)
      .then((res) => setUserFriends(res.data));
    getOnlineFriends(socket);
  }, []);

  const getOnlineFriends = (socket) => {
    socket.emit("areMyFriendsOnline", userFriends);
    socket.on("areMyFriendsOnlineResponse", (activeUsers) => {
      setOnlineFriends(activeUsers);
    });
  };
  useEffect(() => {
    if (receiverId !== null) setActiveChat(receiverId);
  }, [receiverId]);

  // useEffect(() => {
  //   getOnlineFriends();
  // }, [socket, userFriends]);

  // useEffect(() => {
  //   const interval = setInterval(() => getOnlineFriends(), 60000);

  //   return () => clearInterval(interval);
  // }, []);

  //const { receiverId } = useParams();
  const queryClient = useQueryClient();
  const [newMessage, setNewMessage] = useState<ChatMessage["message"]>("");
  const {
    data,
    error: RecentChatMessagesError,
    isLoading: RecentMessagesLoading,
    refetch,
  } = useQuery(["chat"], () =>
    makeRequest.get(`/chats/${activeChat}`).then((res) => res.data)
  );
  const { data: receiverProfile, refetch: refetchProfile } = useQuery(
    ["user"],
    () =>
      activeChat !== null &&
      makeRequest
        .get(`/users/find?userId=${activeChat}`)
        .then((res) => res.data)
  );

  const chatMutate = useMutation(
    (message) => makeRequest.post(`/chats/${activeChat}`, message),
    {
      onSuccess: () => {
        setNewMessage("");
        return queryClient.invalidateQueries(["chat"]);
      },
    }
  );

  useEffect(() => {
    if (activeChat !== null) {
      refetch();
      refetchProfile();
    }
  }, [activeChat]);

  const newMsgHanlder = (e) => {
    const msg = e.target.value;
    setNewMessage(msg);
    e.target.style.height = "inherit";
    const height = e.target.scrollHeight;
    if (height < 140) {
      e.target.style.height = `${height}px`;
    } else {
      e.target.style.height = `140px`;
    }
  };
  return (
    <div className="chat-page">
      <div>
        <RecentChats
          setActiveChat={setActiveChat}
          onlineFriends={onlineFriends}
        />
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
              <h4>
                {receiverProfile
                  ? `${receiverProfile?.name} ${receiverProfile?.surname}`
                  : "Befake user"}
              </h4>
              <span>
                {"Available" && onlineFriends.includes(receiverProfile?.id)}
              </span>
            </div>
          </div>
        </div>
        <div className="msg-container-content">
          {RecentMessagesLoading ? (
            <LoadingIndicator />
          ) : !RecentChatMessagesError ? (
            data &&
            data?.map((message: ChatMessage) => (
              <ChatMessage
                key={message.id}
                profilePhoto={message.profilePhoto}
                senderId={message.senderId}
                message={message.message}
              />
            ))
          ) : (
            <span style={{ color: "red" }}>
              {` Cannot fetch messages smth went wrong :( ${
                RecentChatMessagesError ? RecentChatMessagesError : ""
              }`}
            </span>
          )}
        </div>
        <div className="new-msg">
          <textarea value={newMessage} onChange={newMsgHanlder}></textarea>
          <button
            onClick={() => {
              chatMutate.mutate({ message: newMessage });
              setNewMessage("");
            }}
          >
            <SendOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
