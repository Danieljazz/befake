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
const Navbar = () => {
  const { toggle } = useContext(DarkModeContext);
  const { user } = useContext(AuthContext);
  return (
    <div className="navbar">
      <div className="left">
        <HomeOutlinedIcon sx={{ fontSize: "2rem" }} />
        <DarkModeOutlinedIcon sx={{ fontSize: "2rem" }} onClick={toggle} />
        <WidgetsOutlinedIcon sx={{ fontSize: "2rem" }} />
      </div>
      <div className="middle">
        <span>BeFake</span>
      </div>
      <div className="right">
        <NotificationsActiveOutlinedIcon sx={{ fontSize: "2rem" }} />
        <EmailOutlinedIcon sx={{ fontSize: "2rem" }} />
        <div className="user">
          <AccountCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
          <span>{`${user.name} ${user.surname}`}</span>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
