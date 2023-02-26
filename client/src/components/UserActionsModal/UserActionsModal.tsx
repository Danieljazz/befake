import { makeRequest } from "../../axiosRequest";
import { AuthContext } from "../../context/authContext";
import "./userActionsModal.scss";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
const UserActionsModal = () => {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = () => {
    setUser(null);
    makeRequest
      .post("/auth/logout")
      .then(() => navigate("/login"))
      .catch((err) => console.log(err));
  };

  return (
    <div className="user-actions-modal">
      <ul>
        <li>
          <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
            <div className="user">
              <span>{`${user.name} ${user.surname}`}</span>
            </div>
          </Link>
        </li>
        <hr />
        <li className="logout" onClick={logout}>
          Logout
        </li>
        <li>Hi</li>
        <li>Hi</li>
        <li>Hi</li>
      </ul>
    </div>
  );
};

export default UserActionsModal;
