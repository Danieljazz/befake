import "./navbar.scss";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import WidgetsOutlinedIcon from "@mui/icons-material/WidgetsOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
const Navbar = () => {
  const { toggle } = useContext(DarkModeContext);
  return (
    <div className="navbar">
      <div className="left">
        <HomeOutlinedIcon fontSize="medium" />
        <DarkModeOutlinedIcon fontSize="medium" onClick={toggle} />
        <WidgetsOutlinedIcon fontSize="medium" />
      </div>
      <div className="middle">
        <span>BeFake</span>
      </div>
      <div className="right">
        <NotificationsActiveOutlinedIcon fontSize="medium" />
        <EmailOutlinedIcon fontSize="medium" />
        <div className="user">
          <AccountCircleOutlinedIcon fontSize="medium" />
          <span>John Doe</span>
        </div>
      </div>
    </div>
  );
};
export default Navbar;
