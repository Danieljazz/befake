import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { AuthContext } from "../../context/authContext";
import { Link } from "react-router-dom";
const Navbar = () => {
  const { toggle } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="left">
        <Link to={"/"}>
          <HomeOutlinedIcon
            sx={{ fontSize: "2rem" }}
            style={{ cursor: "pointer" }}
          />
        </Link>
        <DarkModeOutlinedIcon
          sx={{ fontSize: "2rem" }}
          onClick={toggle}
          style={{ cursor: "pointer" }}
        />
        <WidgetsOutlinedIcon sx={{ fontSize: "2rem" }} />
      </div>
      <div className="middle">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>BeFake</span>
        </Link>
      </div>
      <div className="right">
        {/* TODO: Add dropdown */}
        <NotificationsActiveOutlinedIcon sx={{ fontSize: "2rem" }} />
        <EmailOutlinedIcon sx={{ fontSize: "2rem" }} />
        <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
          <div className="user">
            <AccountCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
            <span>{`${user.name} ${user.surname}`}</span>
          </div>
        </Link>
      </div>
    </div>
  );
};
export default Navbar;
