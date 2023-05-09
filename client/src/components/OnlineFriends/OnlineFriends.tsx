import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { makeRequest } from "../../axiosRequest";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";

type FriendType = {
  id: number;
  name: string;
  surname: string;
  profilePhoto: string;
};

const OnlineFriends = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, isError, data } = useQuery(["friends"], () =>
    makeRequest.get(`/relationships?userId=${user.id}`).then((res) => res.data)
  );
  return (
    <div className="section">
      <span>Friends online</span>
      {data?.slice(0, 5).map((friend: FriendType) => (
        <Link
          key={friend.id}
          to={`/profile/${friend.id}`}
          style={{ color: "black", textDecoration: "none" }}
        >
          <div className="event">
            <div className="active-users">
              <img src={friend.profilePhoto} alt="" />
              <span>{`${friend.name} ${friend.surname}`}</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default OnlineFriends;
