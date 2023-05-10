import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "axiosRequest";

const UserSuggestions = () => {
  const { isError, isLoading, data } = useQuery(["recomendedUsers"], () =>
    makeRequest.get("")
  );
  return (
    <div className="section">
      <span>Suggestions for you</span>
      <div className="event">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
        <div className="buttons">
          <button style={{ backgroundColor: "#00ff75" }}>Accept</button>
          <button style={{ backgroundColor: "#ff5d5d" }}>Dismiss</button>
        </div>
      </div>
      <div className="event">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
        <div className="buttons">
          <button style={{ backgroundColor: "#00ff75" }}>Accept</button>
          <button style={{ backgroundColor: "#ff5d5d" }}>Dismiss</button>
        </div>
      </div>
      <div className="event">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
        <div className="buttons">
          <button style={{ backgroundColor: "#00ff75" }}>Accept</button>
          <button style={{ backgroundColor: "#ff5d5d" }}>Dismiss</button>
        </div>
      </div>
      <div className="event">
        <div className="user">
          <img
            src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            alt=""
          />
          <span>Jane Doe</span>
        </div>
        <div className="buttons">
          <button style={{ backgroundColor: "#00ff75" }}>Accept</button>
          <button style={{ backgroundColor: "#ff5d5d" }}>Dismiss</button>
        </div>
      </div>
    </div>
  );
};
export default UserSuggestions;
