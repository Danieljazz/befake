import "./navbar.scss";
import Badge from "@mui/material/Badge";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import { useContext, useEffect, useState } from "react";
import { DarkModeContext } from "../../context/DarkModeContext";
import { Link } from "react-router-dom";
import UserActionsModal from "../../components/UserActionsModal/UserActionsModal";
import { useQuery } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid";
import UserSearchInput from "../../components/UserSearchInput/UserSearchInput";
import { makeRequest } from "../../axiosRequest";
import AllNotificationsPanel, {
  NotifType,
} from "../../components/AllNotificationsPanel/AllNotificationsPanel";
const Navbar = () => {
  const { toggle } = useContext(DarkModeContext);
  const [openUserModal, setOpenUserModal] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const { isLoading, error, data } = useQuery(["notificationsNavbar"], () =>
    makeRequest.get("/notifications").then((res) => {
      return res.data;
    })
  );

  return (
    <div className="navbar">
      <div className="left">
        <DarkModeOutlinedIcon
          sx={{ fontSize: "2rem" }}
          onClick={toggle}
          style={{ cursor: "pointer" }}
        />
        <UserSearchInput
          placeholder="Find new friends"
          linkTo={`/profile/`}
          key={uuidv4()}
        />
      </div>
      <div className="middle">
        <Link to={"/"} style={{ textDecoration: "none" }}>
          <span>BeFake</span>
        </Link>
      </div>
      <div className="right">
        <div
          style={{ cursor: "pointer", position: "relative" }}
          onClick={() => setOpenNotifications(!openNotifications)}
        >
          <Badge
            badgeContent={
              data?.filter((notif: NotifType) => notif.notif_read == 0).length
            }
            color="error"
            max={9}
          >
            <NotificationsActiveOutlinedIcon sx={{ fontSize: "2rem" }} />
          </Badge>
        </div>
        {openNotifications && <AllNotificationsPanel notifications={data} />}
        <Link to={"/chat"}>
          <Badge color="error" variant="dot">
            <EmailOutlinedIcon sx={{ fontSize: "2rem" }} />
          </Badge>
        </Link>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => setOpenUserModal((prev) => !prev)}
        >
          <AccountCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
        </div>
        {/* <span>{`${user.name} ${user.surname}`}</span> */}
        {openUserModal && <UserActionsModal />}
        {/* <Link to={`/profile/${user.id}`} style={{ textDecoration: "none" }}>
          <div className="user">
            <AccountCircleOutlinedIcon sx={{ fontSize: "2rem" }} />
            <span>{`${user.name} ${user.surname}`}</span>
          </div>
        </Link> */}
      </div>
    </div>
  );
};
export default Navbar;
