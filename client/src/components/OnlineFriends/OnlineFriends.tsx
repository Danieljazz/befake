import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { makeRequest } from "../../axiosRequest";
import { AuthContext } from "../../context/authContext";

const OnlineFriends = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, isError, data } = useQuery(["friends"], () =>
    makeRequest.get(`/relationships?userId=${user.id}`).then((res) => res.data)
  );
  console.log(data);
  return (
    <div className="section">
      <span>Friends online</span>
      <div className="event">
        <div className="active-users">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
      </div>
      <div className="event">
        <div className="active-users">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
      </div>
      <div className="event">
        <div className="active-users">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
      </div>
      <div className="event">
        <div className="active-users">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
      </div>
      <div className="event">
        <div className="active-users">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
      </div>
    </div>
  );
};

export default OnlineFriends;
