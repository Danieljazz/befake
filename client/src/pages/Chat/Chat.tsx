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
import { Socket } from "socket.io";
import { DefaultEventsMap } from "socket.io/dist/typed-events";

type ChatMessage = {
  message: string;
  id: number;
  senderId: number;
  profilePhoto: string;
  newMessage?: string;
};

type ReceiverType = {
  id: number;
  profilePhoto: string;
  name: string;
  surname: string;
};

const Chat = () => {
  const { user } = useContext(AuthContext);
  const [userFriends, setUserFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState<Number[]>([]);
  const [activeChat, setActiveChat] = useState<Number | null>(null);
  const { receiverId } = useParams();
  useEffect(() => {
    const ENDPOINT = "https://befake-api.onrender.com";
    const socket = socketIOClient(ENDPOINT);
    socket.emit("addActiveUser", user.id);
    makeRequest
      .get(`/relationships?userId=${user.id}`)
      .then((res) => setUserFriends(res.data));
    socket.emit("areMyFriendsOnline", userFriends);
    socket.on("areMyFriendsOnlineResponse", (activeUsers) => {
      setOnlineFriends(activeUsers);
    });
  }, []);

  useEffect(() => {
    if (receiverId !== null) setActiveChat(Number(receiverId));
  }, [receiverId]);

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
  const { data: receiverProfile, refetch: refetchProfile } = useQuery<
    unknown,
    unknown,
    ReceiverType
  >(
    ["user"],
    () =>
      activeChat !== null &&
      makeRequest
        .get(`/users/find?userId=${activeChat}`)
        .then((res) => res.data)
  );

  const chatMutate = useMutation(
    (message: string) =>
      makeRequest.post(`/chats/${activeChat}`, { message: newMessage }),
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

  const newMsgHanlder = (e: React.FormEvent) => {
    const target = e.target as HTMLInputElement;
    const msg = target.value;
    setNewMessage(msg);
    target.style.height = "inherit";
    const height = target.scrollHeight;
    if (height < 140) {
      target.style.height = `${height}px`;
    } else {
      target.style.height = `140px`;
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
                {receiverProfile
                  ? "Available" && onlineFriends.includes(receiverProfile.id)
                  : ""}
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
              chatMutate.mutate(newMessage);
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
