import { useQuery } from "@tanstack/react-query";
import UserChat from "../../components/UserChat/UserChat";
import "./chats.scss";
import { makeRequest } from "../../axiosRequest";

const Chats = () => {
  const { data, isLoading, error } = useQuery(["recentChats"], () =>
    makeRequest.get("/chats").then((res) => res.data)
  );
  console.log(data);
  return (
    <div className="chats">
      <h1>Chats</h1>
      <ul className="latest-chats">
        {data &&
          data?.map((user) => (
            <UserChat
              profilePhoto={user.profilePhoto}
              name={user.name}
              surname={user.surname}
              message={user.message}
              createdAt={user.createdAt}
            />
          ))}
      </ul>
    </div>
  );
};

export default Chats;
