import "./chat.scss";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import ChatMessage from "../../components/ChatMessage/ChatMessage";
import Chats from "../../components/Chats/Chats";
import { useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "../../axiosRequest";
const Chat = () => {
  const receiverId = useLocation().pathname.split("/")[2];
  console.log(receiverId);

  const { data, error, isLoading } = useQuery(["chat"], () =>
    makeRequest.get("/chats/1").then((res) => res.data)
  );

  return (
    <div className="chat-page">
      <Chats />
      <div className="messages">
        <div className="msg-container-header">
          <div className="msg-receiver">
            <img
              src={!isLoading && data[0]?.profilePhoto}
              alt=""
              className="profile-photo"
            />
            <div className="receiver-info">
              <h4>{data && `${data[0]?.name} ${data[0]?.surname}`}</h4>
              <span>Available</span>
            </div>
          </div>
        </div>
        <div className="msg-container-content">
          {data &&
            data?.map((message) => (
              <ChatMessage
                key={message.id}
                profilePhoto={message.profilePhoto}
                senderId={message.senderId}
                message={message.message}
              />
            ))}
          {/* <ChatMessage profilePhoto="" userId={8} message={"Hi from Jane"} />
          <ChatMessage
            profilePhoto="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            userId={2}
            message={"Hi from Joe"} 
          />*/}
          {/* <div className="msg" style={{ justifyContent: "flex-end" }}>
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg" style={{ justifyContent: "flex-end" }}>
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg" style={{ justifyContent: "flex-end" }}>
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg">
            <img
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="profile-photo"
            />
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg">
            <img
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="profile-photo"
            />
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg" style={{ justifyContent: "flex-end" }}>
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg">
            <img
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="profile-photo"
            />
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg">
            <img
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="profile-photo"
            />
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg">
            <img
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="profile-photo"
            />
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div>
          <div className="msg">
            <img
              src="https://images.pexels.com/photos/2690323/pexels-photo-2690323.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              alt=""
              className="profile-photo"
            />
            <div className="msg-content">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam
              facilis dolore nemo doloremque blanditiis sapiente, unde sit
              accusantium voluptatum consectetur beatae vero. Et.
            </div>
          </div> */}
        </div>
        <div className="new-msg">
          <input />
          <button>
            <SendOutlinedIcon />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
