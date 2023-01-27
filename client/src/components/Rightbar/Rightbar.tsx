import { AuthContext } from "../../context/authContext";
import { FC, useContext } from "react";
import "./rightbar.scss";
const Rightbar: FC = () => {
  const { user } = useContext(AuthContext);
  return (
    <div className="rightbar">
      <div className="container">
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
        <div className="section">
          <span>Latest activities</span>
          <div className="event">
            <div className="user">
              <img src={user.profilePhoto} alt="" />
              <span>{user.name}</span>
              <span>posted photo</span>
            </div>
            <span style={{ fontWeight: "100", color: "grey" }}> 1 min ago</span>
          </div>
          <div className="event">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Jane Doe</span>
              <span>changed status</span>
            </div>
            <span style={{ fontWeight: "100", color: "grey" }}>
              {" "}
              9+ min ago
            </span>
          </div>
          <div className="event">
            <div className="user">
              <img
                src="https://images.pexels.com/photos/3394658/pexels-photo-3394658.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                alt=""
              />
              <span>Jane Doe</span>
              <span>added post</span>
            </div>
            <span style={{ fontWeight: "100", color: "grey" }}>
              {" "}
              9+ min ago
            </span>
          </div>
        </div>
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
      </div>
    </div>
  );
};
export default Rightbar;
